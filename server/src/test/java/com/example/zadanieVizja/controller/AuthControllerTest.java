package com.example.zadanieVizja.controller;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.security.JwtService;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;


    @Mock
    private Authentication authentication;

    @InjectMocks
    private AuthController authController;

    private User sampleUser;
    private String sampleToken;

    private void setFieldValue(String fieldName, Object value) throws Exception {
        Field field = AuthController.class.getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(authController, value);
    }


    @Test
    void login_WithValidCredentials_ShouldReturnSuccessResponse() throws Exception {
        // Given
        setFieldValue("cookieName", "JWT");
        setFieldValue("cookieSecure", false);
        setFieldValue("cookieMaxAge", 3600);
        setFieldValue("cookieSameSite", "Lax");
        
        sampleUser = User.builder()
                .username("admin@uczelnia.pl")
                .role(UserRole.ADMIN)
                .build();
        sampleToken = "sample.jwt.token";
        
        LoginRequest loginRequest = new LoginRequest("admin@uczelnia.pl", "password", "admin");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(userRepository.findByUsername("admin@uczelnia.pl")).thenReturn(Optional.of(sampleUser));
        when(jwtService.generateToken(anyString(), any(Map.class))).thenReturn(sampleToken);

        // When
        ResponseEntity<Map<String, String>> response = authController.login(loginRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsEntry("username", "admin@uczelnia.pl");
        assertThat(response.getBody()).containsEntry("role", "ADMIN");
        // ustaw nazwę cookie aby nie rzucało IllegalArgumentException
        assertThat(response.getHeaders().getFirst("Set-Cookie")).isNotNull();
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByUsername("admin@uczelnia.pl");
        verify(jwtService).generateToken("admin@uczelnia.pl", Map.of("role", "ADMIN"));
    }

    @Test
    void login_WithStudentAlbumNumber_ShouldReturnSuccessResponse() {
        // Given
        try {
            setFieldValue("cookieName", "JWT");
            setFieldValue("cookieSecure", false);
            setFieldValue("cookieMaxAge", 3600);
            setFieldValue("cookieSameSite", "Lax");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        sampleUser = User.builder()
                .username("student_123456")
                .role(UserRole.STUDENT)
                .build();
        sampleToken = "sample.jwt.token";
        
        LoginRequest loginRequest = new LoginRequest("123456", "password", "student");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(userRepository.findByUsername("student_123456")).thenReturn(Optional.of(sampleUser));
        when(jwtService.generateToken(anyString(), any(Map.class))).thenReturn(sampleToken);

        // When
        ResponseEntity<Map<String, String>> response = authController.login(loginRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsEntry("username", "student_123456");
        assertThat(response.getBody()).containsEntry("role", "STUDENT");
        assertThat(response.getHeaders().getFirst("Set-Cookie")).isNotNull();
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByUsername("student_123456");
        verify(jwtService).generateToken("student_123456", Map.of("role", "STUDENT"));
    }

    @Test
    void login_WithInvalidCredentials_ShouldReturnUnauthorized() {
        // Given
        LoginRequest loginRequest = new LoginRequest("admin@uczelnia.pl", "wrongpassword", "admin");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        // When
        ResponseEntity<Map<String, String>> response = authController.login(loginRequest);  

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findByUsername(anyString());
        verify(jwtService, never()).generateToken(anyString(), any(Map.class));
    }

    @Test
    void logout_ShouldReturnNoContentWithEmptyCookie() throws Exception {
        // Given
        setFieldValue("cookieName", "JWT");
        setFieldValue("cookieSecure", false);
        setFieldValue("cookieMaxAge", 3600);
        setFieldValue("cookieSameSite", "Lax");
        
        // When
        ResponseEntity<Void> response = authController.logout(); 

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        assertThat(response.getHeaders().getFirst("Set-Cookie")).isNotNull();
        assertThat(response.getHeaders().getFirst("Set-Cookie")).contains("Max-Age=0");
    }


    @Test
    void getCurrentUser_WithUnauthenticatedUser_ShouldReturnUnauthorized() {
        // Given
        when(authentication.isAuthenticated()).thenReturn(false);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // When
        ResponseEntity<Map<String, String>> response = authController.getCurrentUser();

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void getCurrentUser_WithAnonymousUser_ShouldReturnUnauthorized() {
        // Given
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getPrincipal()).thenReturn("anonymousUser");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // When
        ResponseEntity<Map<String, String>> response = authController.getCurrentUser();

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void getCurrentUser_WithNullAuthentication_ShouldReturnUnauthorized() {
        // Given
        SecurityContextHolder.clearContext();

        // When
        ResponseEntity<Map<String, String>> response = authController.getCurrentUser();

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
