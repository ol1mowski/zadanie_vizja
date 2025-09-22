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
            User.UserBuilder userBuilder = User.builder()
                    .username(username)
                    .passwordHash(passwordEncoder.encode(rawPassword))
                    .role(role);
            
            // Dodaj dane personalne dla adminów
            if (role == UserRole.ADMIN) {
                if ("admin@uczelnia.pl".equals(username)) {
                    userBuilder.firstName("Jan").lastName("Kowalski").email(username);
                } else if ("pracownik@uczelnia.pl".equals(username)) {
                    userBuilder.firstName("Anna").lastName("Nowak").email(username);
                }
            }
            
            User user = userBuilder.build();
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
            boolean changed = false;
            
            if (user.getRole() == UserRole.STUDENT) {
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
            } else if (user.getRole() == UserRole.ADMIN) {
                // Backfill dla adminów
                if (user.getEmail() == null || user.getEmail().isBlank()) {
                    user.setEmail(user.getUsername());
                    changed = true;
                }
                
                if (user.getFirstName() == null || user.getFirstName().isBlank()) {
                    if ("admin@uczelnia.pl".equals(user.getUsername())) {
                        user.setFirstName("Jan");
                        user.setLastName("Kowalski");
                    } else if ("pracownik@uczelnia.pl".equals(user.getUsername())) {
                        user.setFirstName("Anna");
                        user.setLastName("Nowak");
                    } else {
                        user.setFirstName("Administrator");
                        user.setLastName("System");
                    }
                    changed = true;
                }
            }

            if (changed) {
                userRepository.save(user);
                System.out.println("Zaktualizowano użytkownika: " + user.getUsername() + 
                        " (email: " + user.getEmail() + ", imię: " + user.getFirstName() + ")");
            }
        }
    }
}