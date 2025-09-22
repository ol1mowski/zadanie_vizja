package com.example.zadanieVizja.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.service.impl.NotificationServiceImpl;
import com.example.zadanieVizja.service.impl.ReservationServiceImpl;

@ExtendWith(MockitoExtension.class)
class ReservationServiceConflictTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationServiceImpl notificationService;

    @InjectMocks
    private ReservationServiceImpl reservationService;

    private User admin;
    private User student;
    private Reservation existingReservation;
    private ReservationRequest newReservationRequest;

    @BeforeEach
    void setUp() {
        // Setup admin user
        admin = User.builder()
                .id(1L)
                .username("admin@uczelnia.pl")
                .role(UserRole.ADMIN)
                .build();

        // Setup student user
        student = User.builder()
                .id(2L)
                .username("student_123456")
                .role(UserRole.STUDENT)
                .build();

        // Setup existing reservation assigned to admin
        existingReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Existing Topic")
                .description("Existing Description")
                .status(ReservationStatus.ASSIGNED)
                .student(student)
                .assignedEmployee(admin)
                .build();

        // Setup new reservation request for same time
        newReservationRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15), // Same date
                LocalTime.of(10, 0),       // Same time
                "New Topic",
                "New Description",
                null, // candidateFirstName
                null, // candidateLastName
                null, // candidatePesel
                null, // candidateEmail
                null  // candidatePhone
        );
    }

    @Test
    void shouldPreventDoubleAssignmentToSameTime() {
        // Given
        when(userRepository.findByUsername("admin@uczelnia.pl"))
                .thenReturn(Optional.of(admin));
        
        when(reservationRepository.findById(2L))
                .thenReturn(Optional.of(Reservation.builder()
                        .id(2L)
                        .date(LocalDate.of(2024, 1, 15))
                        .time(LocalTime.of(10, 0))
                        .topic("New Topic")
                        .description("New Description")
                        .status(ReservationStatus.PENDING)
                        .student(student)
                        .assignedEmployee(null)
                        .build()));

        // Mock that admin already has a reservation at this time
        when(reservationRepository.existsByAssignedEmployeeAndDateAndTime(
                admin, 
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(10, 0)))
                .thenReturn(true);

        // When & Then
        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> reservationService.assignToEmployee("admin@uczelnia.pl", 2L)
        );

        assertEquals("Employee already has reservation at this time", exception.getMessage());
        
        // Verify that the reservation was not saved
        verify(reservationRepository, never()).save(any(Reservation.class));
    }

    @Test
    void shouldAllowAssignmentToDifferentTime() {
        // Given
        when(userRepository.findByUsername("admin@uczelnia.pl"))
                .thenReturn(Optional.of(admin));
        
        when(reservationRepository.findById(2L))
                .thenReturn(Optional.of(Reservation.builder()
                        .id(2L)
                        .date(LocalDate.of(2024, 1, 15))
                        .time(LocalTime.of(11, 0)) // Different time
                        .topic("New Topic")
                        .description("New Description")
                        .status(ReservationStatus.PENDING)
                        .student(student)
                        .assignedEmployee(null)
                        .build()));

        // Mock that admin has no reservation at this time
        when(reservationRepository.existsByAssignedEmployeeAndDateAndTime(
                admin, 
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(11, 0)))
                .thenReturn(false);

        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(invocation -> {
                    Reservation saved = invocation.getArgument(0);
                    saved.setId(2L);
                    saved.setStatus(ReservationStatus.ASSIGNED);
                    saved.setAssignedEmployee(admin);
                    return saved;
                });

        // When
        var result = reservationService.assignToEmployee("admin@uczelnia.pl", 2L);

        // Then
        assertNotNull(result);
        assertEquals(ReservationStatus.ASSIGNED, result.status());
        assertEquals("admin@uczelnia.pl", result.assignedEmployeeUsername());
        
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void shouldAllowAssignmentToDifferentDate() {
        // Given
        when(userRepository.findByUsername("admin@uczelnia.pl"))
                .thenReturn(Optional.of(admin));
        
        when(reservationRepository.findById(2L))
                .thenReturn(Optional.of(Reservation.builder()
                        .id(2L)
                        .date(LocalDate.of(2024, 1, 16)) // Different date
                        .time(LocalTime.of(10, 0))
                        .topic("New Topic")
                        .description("New Description")
                        .status(ReservationStatus.PENDING)
                        .student(student)
                        .assignedEmployee(null)
                        .build()));

        // Mock that admin has no reservation at this time
        when(reservationRepository.existsByAssignedEmployeeAndDateAndTime(
                admin, 
                LocalDate.of(2024, 1, 16), 
                LocalTime.of(10, 0)))
                .thenReturn(false);

        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(invocation -> {
                    Reservation saved = invocation.getArgument(0);
                    saved.setId(2L);
                    saved.setStatus(ReservationStatus.ASSIGNED);
                    saved.setAssignedEmployee(admin);
                    return saved;
                });

        // When
        var result = reservationService.assignToEmployee("admin@uczelnia.pl", 2L);

        // Then
        assertNotNull(result);
        assertEquals(ReservationStatus.ASSIGNED, result.status());
        assertEquals("admin@uczelnia.pl", result.assignedEmployeeUsername());
        
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void shouldPreventAssignmentToAlreadyAssignedReservation() {
        // Given
        when(userRepository.findByUsername("admin@uczelnia.pl"))
                .thenReturn(Optional.of(admin));
        
        when(reservationRepository.findById(2L))
                .thenReturn(Optional.of(Reservation.builder()
                        .id(2L)
                        .date(LocalDate.of(2024, 1, 15))
                        .time(LocalTime.of(10, 0))
                        .topic("New Topic")
                        .description("New Description")
                        .status(ReservationStatus.ASSIGNED) // Already assigned
                        .student(student)
                        .assignedEmployee(admin) // Already assigned to admin
                        .build()));

        // When & Then
        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> reservationService.assignToEmployee("admin@uczelnia.pl", 2L)
        );

        assertEquals("Reservation already assigned", exception.getMessage());
        
        // Verify that the reservation was not saved
        verify(reservationRepository, never()).save(any(Reservation.class));
    }
}
