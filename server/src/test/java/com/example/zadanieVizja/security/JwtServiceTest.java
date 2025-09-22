package com.example.zadanieVizja.security;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    private JwtService jwtService;
    private final String secret = "mySecretKeyThatIsAtLeast32CharactersLongForHS256Algorithm";
    private final String issuer = "test-issuer";
    private final int expirationMinutes = 60;


    @Test
    void generateToken_WithValidData_ShouldReturnValidToken() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of("role", "STUDENT", "userId", 123);

        // When
        String token = jwtService.generateToken(subject, claims);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(token.split("\\.")).hasSize(3); // JWT has 3 parts separated by dots
    }

    @Test
    void parse_WithValidToken_ShouldReturnClaims() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of("role", "STUDENT", "userId", 123);
        String token = jwtService.generateToken(subject, claims);

        // When
        Claims parsedClaims = jwtService.parse(token);

        // Then
        assertThat(parsedClaims.getSubject()).isEqualTo(subject);
        assertThat(parsedClaims.getIssuer()).isEqualTo(issuer);
        assertThat(parsedClaims.get("role")).isEqualTo("STUDENT");
        assertThat(parsedClaims.get("userId")).isEqualTo(123);
        assertThat(parsedClaims.getIssuedAt()).isNotNull();
        assertThat(parsedClaims.getExpiration()).isNotNull();
    }

    @Test
    void parse_WithInvalidToken_ShouldThrowException() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String invalidToken = "invalid.token.here";

        // When & Then
        assertThatThrownBy(() -> jwtService.parse(invalidToken))
                .isInstanceOf(MalformedJwtException.class);
    }

    @Test
    void parse_WithEmptyToken_ShouldThrowException() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String emptyToken = "";

        // When & Then
        assertThatThrownBy(() -> jwtService.parse(emptyToken))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void parse_WithNullToken_ShouldThrowException() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String nullToken = null;

        // When & Then
        assertThatThrownBy(() -> jwtService.parse(nullToken))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void generateToken_WithEmptySubject_ShouldReturnToken() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "";
        Map<String, Object> claims = Map.of("role", "STUDENT");

        // When
        String token = jwtService.generateToken(subject, claims);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
    }

    @Test
    void generateToken_WithNullClaims_ShouldThrowException() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = null;

        // When & Then
        assertThatThrownBy(() -> jwtService.generateToken(subject, claims))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void generateToken_WithComplexClaims_ShouldReturnValidToken() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of(
                "role", "ADMIN",
                "permissions", new String[]{"READ", "WRITE", "DELETE"},
                "metadata", Map.of("department", "IT", "level", 5)
        );

        // When
        String token = jwtService.generateToken(subject, claims);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();

        // Parse and verify
        Claims parsedClaims = jwtService.parse(token);
        assertThat(parsedClaims.getSubject()).isEqualTo(subject);
        assertThat(parsedClaims.get("role")).isEqualTo("ADMIN");
        assertThat(parsedClaims.get("permissions")).isNotNull();
        assertThat(parsedClaims.get("metadata")).isNotNull();
    }

    @Test
    void tokenExpiration_ShouldBeSetCorrectly() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of("role", "STUDENT");

        // When
        String token = jwtService.generateToken(subject, claims);
        Claims parsedClaims = jwtService.parse(token);

        // Then
        long expirationTime = parsedClaims.getExpiration().getTime();
        long now = System.currentTimeMillis();
        long expectedMinExpiration = now + (expirationMinutes * 60 * 1000) - 1000; // -1s tolerance
        long expectedMaxExpiration = now + (expirationMinutes * 60 * 1000) + 1000; // +1s tolerance

        assertThat(expirationTime).isBetween(expectedMinExpiration, expectedMaxExpiration);
    }

    @Test
    void tokenIssuer_ShouldBeSetCorrectly() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of("role", "STUDENT");

        // When
        String token = jwtService.generateToken(subject, claims);
        Claims parsedClaims = jwtService.parse(token);

        // Then
        assertThat(parsedClaims.getIssuer()).isEqualTo(issuer);
    }

    @Test
    void tokenSubject_ShouldBeSetCorrectly() {
        // Given
        jwtService = new JwtService(secret, issuer, expirationMinutes);
        String subject = "testuser";
        Map<String, Object> claims = Map.of("role", "STUDENT");

        // When
        String token = jwtService.generateToken(subject, claims);
        Claims parsedClaims = jwtService.parse(token);

        // Then
        assertThat(parsedClaims.getSubject()).isEqualTo(subject);
    }
}
