package com.example.zadanieVizja.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.service.ReservationService;

@ExtendWith(MockitoExtension.class)
class ReservationControllerTest {

    @Mock
    private ReservationService reservationService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private ReservationController reservationController;

    private ReservationRequest validRequest;
    private ReservationResponse sampleResponse;


    @Test
    void createByStudent_ShouldReturnCreatedResponse() {
        // Given
        validRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15),
                LocalTime.of(10, 0),
                "Konsultacja",
                "Opis wizyty",
                null, null, null, null, null
        );

        sampleResponse = new ReservationResponse(
                1L,
                LocalDate.of(2024, 1, 15),
                LocalTime.of(10, 0),
                "Konsultacja",
                "Opis wizyty",
                ReservationStatus.PENDING,
                null,
                List.of(),
                "STUDENT"
        );
        
        when(authentication.getName()).thenReturn("testuser");
        when(reservationService.createByStudent(anyString(), any(ReservationRequest.class)))
                .thenReturn(sampleResponse);

        // When
        ResponseEntity<ReservationResponse> response = reservationController.createByStudent(validRequest, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(sampleResponse);
        verify(reservationService).createByStudent("testuser", validRequest);
    }

    @Test
    void createByCandidate_ShouldReturnCreatedResponse() {
        // Given
        ReservationRequest candidateRequest = new ReservationRequest(
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(10, 0), 
                "Konsultacja", 
                "Opis",
                "Jan", "Kowalski", "12345678901", "jan@example.com", "123456789"
        );
        when(reservationService.createByCandidate(any(ReservationRequest.class)))
                .thenReturn(sampleResponse);

        // When
        ResponseEntity<ReservationResponse> response = reservationController.createByCandidate(candidateRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(sampleResponse);
        verify(reservationService).createByCandidate(candidateRequest);
    }

    @Test
    void listOwnForStudent_ShouldReturnStudentReservations() {
        // Given
        List<ReservationResponse> reservations = Arrays.asList(sampleResponse);
        when(authentication.getName()).thenReturn("testuser");
        when(reservationService.listOwnForStudent(anyString())).thenReturn(reservations);

        // When
        ResponseEntity<List<ReservationResponse>> response = reservationController.listOwnForStudent(authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(reservations);
        verify(reservationService).listOwnForStudent("testuser");
    }

    @Test
    void listUnassigned_ShouldReturnUnassignedReservations() {
        // Given
        List<ReservationResponse> reservations = Arrays.asList(sampleResponse);
        when(reservationService.listUnassigned()).thenReturn(reservations);

        // When
        ResponseEntity<List<ReservationResponse>> response = reservationController.listUnassigned();

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(reservations);
        verify(reservationService).listUnassigned();
    }

    @Test
    void assign_ShouldReturnAssignedReservation() {
        // Given
        Long reservationId = 1L;
        ReservationResponse assignedResponse = new ReservationResponse(
                1L, 
                LocalDate.of(2024, 1, 15), 
                LocalTime.of(10, 0), 
                "Konsultacja", 
                "Opis",
                ReservationStatus.ASSIGNED, 
                "admin", 
                List.of(), 
                "STUDENT"
        );
        when(authentication.getName()).thenReturn("admin");
        when(reservationService.assignToEmployee(anyString(), any(Long.class)))
                .thenReturn(assignedResponse);

        // When
        ResponseEntity<ReservationResponse> response = reservationController.assign(reservationId, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(assignedResponse);
        verify(reservationService).assignToEmployee("admin", reservationId);
    }

    @Test
    void listMyAssignedReservations_ShouldReturnAssignedReservations() {
        // Given
        List<ReservationResponse> reservations = Arrays.asList(sampleResponse);
        when(authentication.getName()).thenReturn("admin");
        when(reservationService.listAssignedToEmployee(anyString())).thenReturn(reservations);

        // When
        ResponseEntity<List<ReservationResponse>> response = reservationController.listMyAssignedReservations(authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(reservations);
        verify(reservationService).listAssignedToEmployee("admin");
    }

    @Test
    void cancel_ShouldCallServiceAndReturnNoContent() {
        // Given
        Long reservationId = 1L;
        when(authentication.getName()).thenReturn("testuser");
        doNothing().when(reservationService).cancelByOwner(anyString(), any(Long.class));

        // When
        reservationController.cancel(reservationId, authentication);

        // Then
        verify(reservationService).cancelByOwner("testuser", reservationId);
    }
}
