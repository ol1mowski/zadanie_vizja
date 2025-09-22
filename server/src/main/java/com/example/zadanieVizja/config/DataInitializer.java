package com.example.zadanieVizja.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedUsers(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            if (users.findByUsername("student1@example.edu").isEmpty()) {
                users.save(User.builder()
                        .username("student1@example.edu")
                        .passwordHash(encoder.encode("Qwerty123!@#"))
                        .role(UserRole.STUDENT)
                        .studentAlbumNumber("A0001")
                        .email("student1@example.edu")
                        .build());
            }
            if (users.findByUsername("admin1@example.edu").isEmpty()) {
                users.save(User.builder()
                        .username("admin1@example.edu")
                        .passwordHash(encoder.encode("Qwerty123!@#"))
                        .role(UserRole.ADMIN)
                        .email("admin1@example.edu")
                        .build());
            }
        };
    }
}


