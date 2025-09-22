package com.example.zadanieVizja.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
import com.example.zadanieVizja.dto.ReservationResponse;
    import com.example.zadanieVizja.entity.CandidateData;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.service.NotificationService;

@ExtendWith(MockitoExtension.class)
class ReservationServiceImplTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private ReservationServiceImpl reservationService;

    private User studentUser;
    private User adminUser;
    private Reservation sampleReservation;
    private ReservationRequest validRequest;


    @Test
    void createByStudent_WithValidData_ShouldCreateReservation() {
        // Given
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();

        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(studentUser)
                .assignedEmployee(null)
                .build();

        validRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15),
                LocalTime.of(10, 0),
                "Konsultacja",
                "Opis wizyty",
                null, null, null, null, null
        );
        
        when(userRepository.findByUsername("student")).thenReturn(Optional.of(studentUser));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(sampleReservation);

        // When
        ReservationResponse response = reservationService.createByStudent("student", validRequest);

        // Then
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.date()).isEqualTo("2024-01-15");
        assertThat(response.time()).isEqualTo("10:00");
        assertThat(response.topic()).isEqualTo("Konsultacja");
        assertThat(response.status()).isEqualTo(ReservationStatus.PENDING);
        assertThat(response.userType()).isEqualTo("STUDENT");
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void createByStudent_WithNonStudentUser_ShouldThrowException() {
        // Given
        validRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15),
                LocalTime.of(10, 0),
                "Konsultacja",
                "Opis wizyty",
                null, null, null, null, null
        );
        
        User adminUserForTest = User.builder().username("admin").role(UserRole.ADMIN).build();
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(adminUserForTest));

        // When & Then
        assertThatThrownBy(() -> reservationService.createByStudent("admin", validRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Only student can create student reservation");
    }

    @Test
    void createByStudent_WithNonExistentUser_ShouldThrowException() {
        // Given
        validRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15),
                LocalTime.of(10, 0),
                "Konsultacja",
                "Opis wizyty",
                null, null, null, null, null
        );
        
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> reservationService.createByStudent("nonexistent", validRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Student not found: nonexistent");
    }

    @Test
    void createByCandidate_WithValidData_ShouldCreateReservation() {
        // Given
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis")
                .status(ReservationStatus.PENDING)
                .candidateData(CandidateData.builder()
                        .firstName("Jan")
                        .lastName("Kowalski")
                        .pesel("12345678901")
                        .email("jan@example.com")
                        .phone("123456789")
                        .build())
                .assignedEmployee(null)
                .build();
                
        ReservationRequest candidateRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(10, 0), 
                "Konsultacja", 
                "Opis",
                "Jan", "Kowalski", "12345678901", "jan@example.com", "123456789"
        );
        when(reservationRepository.save(any(Reservation.class))).thenReturn(sampleReservation);

        // When
        ReservationResponse response = reservationService.createByCandidate(candidateRequest);

        // Then
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.userType()).isEqualTo("CANDIDATE");
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void createByCandidate_WithMissingData_ShouldThrowException() {
        // Given
        ReservationRequest invalidRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(10, 0), 
                "Konsultacja", 
                "Opis",
                null, null, null, null, null
        );

        // When & Then
        assertThatThrownBy(() -> reservationService.createByCandidate(invalidRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Candidate data is required");
    }

    @Test
    void listOwnForStudent_ShouldReturnStudentReservations() {
        // Given
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(studentUser)
                .assignedEmployee(null)
                .build();
                
        List<Reservation> reservations = Arrays.asList(sampleReservation);
        when(userRepository.findByUsername("student")).thenReturn(Optional.of(studentUser));
        when(reservationRepository.findByStudent(studentUser)).thenReturn(reservations);

        // When
        List<ReservationResponse> response = reservationService.listOwnForStudent("student");

        // Then
        assertThat(response).hasSize(1);
        assertThat(response.get(0).id()).isEqualTo(1L);
        verify(reservationRepository).findByStudent(studentUser);
    }

    @Test
    void listUnassigned_ShouldReturnUnassignedReservations() {
        // Given
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(null)
                .assignedEmployee(null)
                .build();
                
        List<Reservation> reservations = Arrays.asList(sampleReservation);
        when(reservationRepository.findByStatus(ReservationStatus.PENDING)).thenReturn(reservations);

        // When
        List<ReservationResponse> response = reservationService.listUnassigned();

        // Then
        assertThat(response).hasSize(1);
        assertThat(response.get(0).id()).isEqualTo(1L);
        verify(reservationRepository).findByStatus(ReservationStatus.PENDING);
    }

    @Test
    void assignToEmployee_WithValidData_ShouldAssignReservation() {
        // Given
        adminUser = User.builder()
                .username("admin")
                .role(UserRole.ADMIN)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(null)
                .assignedEmployee(null)
                .build();
                
        Long reservationId = 1L;
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(adminUser));
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.existsByAssignedEmployeeAndDateAndTime(any(), any(LocalDate.class), any(LocalTime.class)))
                .thenReturn(false);
        when(reservationRepository.save(any(Reservation.class))).thenReturn(sampleReservation);

        // When
        ReservationResponse response = reservationService.assignToEmployee("admin", reservationId);

        // Then
        assertThat(response.id()).isEqualTo(1L);
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void assignToEmployee_WithNonAdminUser_ShouldThrowException() {
        // Given
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();
                
        Long reservationId = 1L;
        when(userRepository.findByUsername("student")).thenReturn(Optional.of(studentUser));

        // When & Then
        assertThatThrownBy(() -> reservationService.assignToEmployee("student", reservationId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Only admin can assign reservations");
    }

    @Test
    void assignToEmployee_WithAlreadyAssignedReservation_ShouldThrowException() {
        // Given
        adminUser = User.builder()
                .username("admin")
                .role(UserRole.ADMIN)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(null)
                .assignedEmployee(adminUser)
                .build();
                
        Long reservationId = 1L;
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(adminUser));
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));

        // When & Then
        assertThatThrownBy(() -> reservationService.assignToEmployee("admin", reservationId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Reservation already assigned");
    }

    @Test
    void assignToEmployee_WithTimeConflict_ShouldThrowException() {
        // Given
        adminUser = User.builder()
                .username("admin")
                .role(UserRole.ADMIN)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(null)
                .assignedEmployee(null)
                .build();
                
        Long reservationId = 1L;
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(adminUser));
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.existsByAssignedEmployeeAndDateAndTime(any(), any(LocalDate.class), any(LocalTime.class)))
                .thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> reservationService.assignToEmployee("admin", reservationId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Employee already has reservation at this time");
    }

    @Test
    void cancelByOwner_WithStudentOwner_ShouldCancelReservation() {
        // Given
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(studentUser)
                .assignedEmployee(null)
                .build();
                
        Long reservationId = 1L;
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(sampleReservation);

        // When
        reservationService.cancelByOwner("student", reservationId);

        // Then
        verify(reservationRepository).save(any(Reservation.class));
        verify(notificationService, never()).createCancellationNotification(any());
    }

    @Test
    void cancelByOwner_WithAssignedReservation_ShouldCreateNotification() {
        // Given
        adminUser = User.builder()
                .username("admin")
                .role(UserRole.ADMIN)
                .build();
                
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(studentUser)
                .assignedEmployee(adminUser)
                .build();
                
        Long reservationId = 1L;
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(sampleReservation);

        // When
        reservationService.cancelByOwner("student", reservationId);

        // Then
        verify(reservationRepository).save(any(Reservation.class));
        verify(notificationService).createCancellationNotification(sampleReservation);
    }

    @Test
    void cancelByOwner_WithNonOwner_ShouldThrowException() {
        // Given
        studentUser = User.builder()
                .username("student")
                .role(UserRole.STUDENT)
                .build();
                
        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(studentUser)
                .assignedEmployee(null)
                .build();
                
        Long reservationId = 1L;
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));

        // When & Then
        assertThatThrownBy(() -> reservationService.cancelByOwner("otheruser", reservationId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Only owner can cancel reservation");
    }

    @Test
    void cancelByOwner_WithNonExistentReservation_ShouldThrowException() {
        // Given
        Long reservationId = 999L;
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> reservationService.cancelByOwner("student", reservationId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Reservation not found: 999");
    }
}
