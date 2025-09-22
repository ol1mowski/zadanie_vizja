package com.example.zadanieVizja.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeTestData();
    }

    private void initializeTestData() {
        ensureUser("student_123456", "password", UserRole.STUDENT);
        ensureUser("student_789012", "password", UserRole.STUDENT);
        ensureUser("admin@uczelnia.pl", "password", UserRole.ADMIN);
        ensureUser("pracownik@uczelnia.pl", "password", UserRole.ADMIN);

        System.out.println("=== DANE TESTOWE ===");
        System.out.println("Student: 123456 / password");
        System.out.println("Student: 789012 / password");
        System.out.println("Admin: admin@uczelnia.pl / password");
        System.out.println("Admin: pracownik@uczelnia.pl / password");
        System.out.println("Liczba użytkowników w bazie: " + userRepository.count());
    }

    private void ensureUser(String username, String rawPassword, UserRole role) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = User.builder()
                    .username(username)
                    .passwordHash(passwordEncoder.encode(rawPassword))
                    .role(role)
                    .build();
            userRepository.save(user);
            System.out.println("Utworzono użytkownika: " + username + " (role: " + role + ")");
        }
    }
}