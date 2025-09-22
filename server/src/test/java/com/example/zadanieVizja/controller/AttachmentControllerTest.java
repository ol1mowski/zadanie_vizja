package com.example.zadanieVizja.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import com.example.zadanieVizja.dto.AttachmentResponse;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationAttachment;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.ReservationAttachmentRepository;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.service.FileStorageService;

@ExtendWith(MockitoExtension.class)
class AttachmentControllerTest {

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private ReservationAttachmentRepository attachmentRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private MultipartFile multipartFile;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AttachmentController attachmentController;

    private Reservation sampleReservation;
    private User sampleUser;


    @Test
    void uploadFile_WithValidFile_ShouldReturnCreatedResponse() throws Exception {
        // Given
        sampleUser = User.builder()
                .username("testuser")
                .role(UserRole.STUDENT)
                .build();

        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .student(sampleUser)
                .build();
        
        Long reservationId = 1L;
        when(authentication.getName()).thenReturn("testuser");
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(multipartFile.getOriginalFilename()).thenReturn("test-file.pdf");
        when(multipartFile.getContentType()).thenReturn("application/pdf");
        when(multipartFile.getSize()).thenReturn(1024L);
        when(multipartFile.isEmpty()).thenReturn(false);
        when(fileStorageService.storeFile(any(MultipartFile.class), anyLong()))
                .thenReturn("stored-file-name.pdf");
        when(attachmentRepository.save(any(ReservationAttachment.class))).thenReturn(
                ReservationAttachment.builder()
                        .id(1L)
                        .originalFileName("test-file.pdf")
                        .storedFileName("stored-file-name.pdf")
                        .contentType("application/pdf")
                        .fileSize(1024L)
                        .uploadTimestamp(LocalDateTime.now())
                        .build()
        );

        // When
        ResponseEntity<AttachmentResponse> response = attachmentController.uploadFile(reservationId, multipartFile, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        verify(fileStorageService).storeFile(multipartFile, reservationId);
    }

    @Test
    void downloadFile_WithValidId_ShouldReturnFileResource() {
        // Given
        sampleUser = User.builder()
                .username("testuser")
                .role(UserRole.STUDENT)
                .build();

        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(sampleUser)
                .assignedEmployee(null)
                .build();
                
        Long attachmentId = 1L;
        ReservationAttachment attachment = ReservationAttachment.builder()
                .id(attachmentId)
                .originalFileName("test-file.pdf")
                .storedFileName("stored-file.pdf")
                .contentType("application/pdf")
                .fileSize(1024L)
                .reservation(sampleReservation)
                .build();
        
        when(authentication.getName()).thenReturn("testuser");
        when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.of(attachment));
        when(fileStorageService.loadFile("stored-file.pdf")).thenReturn("file content".getBytes());

        // When
        ResponseEntity<ByteArrayResource> response = attachmentController.downloadFile(attachmentId, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        verify(fileStorageService).loadFile("stored-file.pdf");
    }

    @Test
    void deleteAttachment_WithValidId_ShouldReturnNoContent() {
        // Given
        sampleUser = User.builder()
                .username("testuser")
                .role(UserRole.STUDENT)
                .build();

        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(sampleUser)
                .assignedEmployee(null)
                .build();
                
        Long attachmentId = 1L;
        ReservationAttachment attachment = ReservationAttachment.builder()
                .id(attachmentId)
                .originalFileName("test-file.pdf")
                .storedFileName("stored-file.pdf")
                .reservation(sampleReservation)
                .build();
        
        when(authentication.getName()).thenReturn("testuser");
        when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.of(attachment));
        doNothing().when(fileStorageService).deleteFile("stored-file.pdf");

        // When
        ResponseEntity<Void> response = attachmentController.deleteAttachment(attachmentId, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        verify(fileStorageService).deleteFile("stored-file.pdf");
        verify(attachmentRepository).delete(attachment);
    }

    @Test
    void getAttachments_WithValidReservationId_ShouldReturnAttachments() {
        // Given
        sampleUser = User.builder()
                .username("testuser")
                .role(UserRole.STUDENT)
                .build();

        sampleReservation = Reservation.builder()
                .id(1L)
                .date(LocalDate.of(2024, 1, 15))
                .time(LocalTime.of(10, 0))
                .topic("Konsultacja")
                .description("Opis wizyty")
                .status(ReservationStatus.PENDING)
                .student(sampleUser)
                .assignedEmployee(null)
                .build();
                
        Long reservationId = 1L;
        ReservationAttachment attachment = ReservationAttachment.builder()
                .id(1L)
                .originalFileName("test-file.pdf")
                .storedFileName("stored-file.pdf")
                .contentType("application/pdf")
                .fileSize(1024L)
                .reservation(sampleReservation)
                .build();
        
        when(authentication.getName()).thenReturn("testuser");
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(sampleReservation));
        when(attachmentRepository.findByReservationId(reservationId)).thenReturn(Arrays.asList(attachment));

        // When
        ResponseEntity<List<AttachmentResponse>> response = attachmentController.getAttachments(reservationId, authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        verify(attachmentRepository).findByReservationId(reservationId);
    }
}