package com.example.zadanieVizja.controller;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zadanieVizja.dto.AdminProfileResponse;
import com.example.zadanieVizja.dto.StudentProfileResponse;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.security.InMemoryTokenBlacklist;
import com.example.zadanieVizja.security.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;

record LoginRequest(@NotBlank String username, @NotBlank String password, String userType) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InMemoryTokenBlacklist tokenBlacklist;

    @Value("${jwt.cookie.name:JWT}")
    private String cookieName;
    @Value("${jwt.cookie.secure:false}")
    private boolean cookieSecure;
    @Value("${jwt.cookie.max-age:3600}")
    private int cookieMaxAge;
    @Value("${jwt.cookie.same-site:Lax}")
    private String cookieSameSite;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder, InMemoryTokenBlacklist tokenBlacklist) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlacklist = tokenBlacklist;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest req) {
        try {
            if (req.userType() == null) {
                return ResponseEntity.status(400).body(Map.of("error", "Typ użytkownika jest wymagany"));
            }

            String loginIdentifier;
            if ("student".equals(req.userType())) { 
                if (!req.username().matches("\\d{6,8}")) {
                    System.out.println("Błąd walidacji: numer albumu '" + req.username() + "' nie pasuje do wzorca");
                    return ResponseEntity.status(400).body(Map.of("error", "Numer albumu musi mieć 6-8 cyfr"));
                }
                loginIdentifier = "student_" + req.username();
                System.out.println("Student login: '" + req.username() + "' -> szukam w bazie: '" + loginIdentifier + "'");
            } else if ("admin".equals(req.userType())) {
                if (!req.username().matches("^[^@]+@uczelnia\\.[^@]+$")) {
                    System.out.println("Błąd walidacji: email '" + req.username() + "' nie pasuje do wzorca uczelnia.*");
                    return ResponseEntity.status(400).body(Map.of("error", "E-mail pracownika musi mieć domenę uczelnia.*"));
                }
                loginIdentifier = req.username();
                System.out.println("Admin login: '" + req.username() + "' -> szukam w bazie: '" + loginIdentifier + "'");
            } else {
                return ResponseEntity.status(400).body(Map.of("error", "Nieprawidłowy typ użytkownika"));
            }

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginIdentifier, req.password())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body(Map.of("error", "Nieprawidłowe dane logowania"));
        }

        String loginIdentifier = "student".equals(req.userType()) ? "student_" + req.username() : req.username();
        User user = userRepository.findByUsername(loginIdentifier).orElseThrow();
        String token = jwtService.generateToken(user.getUsername(), Map.of("role", user.getRole().name()));

        ResponseCookie cookie = ResponseCookie.from(cookieName, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ofSeconds(cookieMaxAge))
                .sameSite(cookieSameSite)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(Map.of(
                        "username", user.getUsername(),
                        "role", user.getRole().name()
                ));
    }

    // Endpoint HTTP
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = null;
        if (request != null && request.getCookies() != null) {
            for (var c : request.getCookies()) {
                if (cookieName.equals(c.getName())) {
                    token = c.getValue();
                    break;
                }
            }
        }
        if (token != null && !token.isBlank()) {
            try {
                var claims = jwtService.parse(token);
                long expMs = claims.getExpiration().toInstant().toEpochMilli();
                tokenBlacklist.blacklist(token, expMs);
            } catch (Exception ignored) {}
        }

        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(Duration.ZERO)
                .sameSite(cookieSameSite)
                .build();
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().header("Set-Cookie", cookie.toString()).build();
    }

    // Zgodność wsteczna dla testów bez parametru
    public ResponseEntity<Void> logout() {
        return logout(null);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(401).build();
        }
        String username = auth.getName();
        String role = auth.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                .orElse("UNKNOWN");
        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", role
        ));
    }

    @GetMapping("/student/profile")
    public ResponseEntity<StudentProfileResponse> getStudentProfile() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(401).build();
        }
        
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));
        
        String albumNumber = username.startsWith("student_") ? 
                username.substring("student_".length()) : username;
        
        StudentProfileResponse profile = new StudentProfileResponse(
                username,
                albumNumber,
                user.getEmail(),
                user.getRole()
        );
        
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/admin/profile")
    public ResponseEntity<AdminProfileResponse> getAdminProfile() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(401).build();
        }

        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        AdminProfileResponse profile = new AdminProfileResponse(
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );

        return ResponseEntity.ok(profile);
    }
}


