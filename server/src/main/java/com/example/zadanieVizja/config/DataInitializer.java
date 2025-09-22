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
        ensureStudent("student_123456", "password", "jan.kowalski@student.pl");
        ensureStudent("student_789012", "password", "anna.nowak@student.pl");
        ensureUser("admin@uczelnia.pl", "password", UserRole.ADMIN);
        ensureUser("pracownik@uczelnia.pl", "password", UserRole.ADMIN);

        // Uzupełnij brakujące pola dla już istniejących studentów (np. email, numer albumu)
        backfillExistingStudents();

        System.out.println("=== DANE TESTOWE ===");
        System.out.println("Student: 123456 / password (email: jan.kowalski@student.pl)");
        System.out.println("Student: 789012 / password (email: anna.nowak@student.pl)");
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

    private void ensureStudent(String username, String rawPassword, String email) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = User.builder()
                    .username(username)
                    .passwordHash(passwordEncoder.encode(rawPassword))
                    .role(UserRole.STUDENT)
                    .email(email)
                    .studentAlbumNumber(username.substring("student_".length())) // Wyciągnij numer albumu
                    .build();
            userRepository.save(user);
            System.out.println("Utworzono studenta: " + username + " (email: " + email + ")");
        }
    }

    private void backfillExistingStudents() {
        for (User user : userRepository.findAll()) {
            if (user.getRole() == UserRole.STUDENT) {
                boolean changed = false;

                // Ustaw numer albumu, jeśli brak
                if (user.getStudentAlbumNumber() == null || user.getStudentAlbumNumber().isBlank()) {
                    String username = user.getUsername();
                    if (username != null && username.startsWith("student_")) {
                        user.setStudentAlbumNumber(username.substring("student_".length()));
                        changed = true;
                    }
                }

                // Ustaw email, jeśli brak (prosty wzorzec na podstawie numeru albumu)
                if (user.getEmail() == null || user.getEmail().isBlank()) {
                    String album = user.getStudentAlbumNumber();
                    if (album != null && !album.isBlank()) {
                        user.setEmail(album + "@student.pl");
                        changed = true;
                    }
                }

                if (changed) {
                    userRepository.save(user);
                    System.out.println("Zaktualizowano studenta: " + user.getUsername() +
                            " (album: " + user.getStudentAlbumNumber() + ", email: " + user.getEmail() + ")");
                }
            }
        }
    }
}