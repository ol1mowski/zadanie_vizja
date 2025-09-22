package com.example.zadanieVizja.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.example.zadanieVizja.dto.NotificationResponse;
import com.example.zadanieVizja.entity.NotificationType;
import com.example.zadanieVizja.service.NotificationService;

@ExtendWith(MockitoExtension.class)
class NotificationControllerTest {

    @Mock
    private NotificationService notificationService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private NotificationController notificationController;

    private NotificationResponse sampleResponse;


    @Test
    void getAllNotifications_WithValidUsername_ShouldReturnNotifications() {
        // Given
        sampleResponse = new NotificationResponse(
                1L,
                NotificationType.RESERVATION_CANCELLED,
                "Test Notification",
                "This is a test notification",
                1L,
                false,
                LocalDateTime.now()
        );
        
        when(authentication.getName()).thenReturn("testuser");
        List<NotificationResponse> notifications = Arrays.asList(sampleResponse);
        when(notificationService.getUserNotifications("testuser")).thenReturn(notifications);

        // When
        ResponseEntity<List<NotificationResponse>> response = notificationController.getAllNotifications(authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(notifications);
        verify(notificationService).getUserNotifications("testuser");
    }

    @Test
    void getAllNotifications_WithEmptyUsername_ShouldReturnEmptyList() {
        // Given
        when(authentication.getName()).thenReturn("");
        when(notificationService.getUserNotifications("")).thenReturn(Arrays.asList());

        // When
        ResponseEntity<List<NotificationResponse>> response = notificationController.getAllNotifications(authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEmpty();
        verify(notificationService).getUserNotifications("");
    }

    @Test
    void getAllNotifications_WithMultipleNotifications_ShouldReturnAll() {
        // Given
        when(authentication.getName()).thenReturn("testuser");
        NotificationResponse response1 = new NotificationResponse(1L, NotificationType.RESERVATION_CANCELLED, 
                "Title 1", "Message 1", 1L, false, LocalDateTime.now());
        NotificationResponse response2 = new NotificationResponse(2L, NotificationType.RESERVATION_ASSIGNED, 
                "Title 2", "Message 2", 2L, true, LocalDateTime.now());
        List<NotificationResponse> notifications = Arrays.asList(response1, response2);
        when(notificationService.getUserNotifications("testuser")).thenReturn(notifications);

        // When
        ResponseEntity<List<NotificationResponse>> response = notificationController.getAllNotifications(authentication);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(2);
        assertThat(response.getBody()).containsExactly(response1, response2);
        verify(notificationService).getUserNotifications("testuser");
    }

    @Test
    void getAllNotifications_WithServiceException_ShouldPropagateException() {
        // Given
        when(authentication.getName()).thenReturn("testuser");
        when(notificationService.getUserNotifications("testuser"))
                .thenThrow(new RuntimeException("Service error"));

        // When & Then
        try {
            notificationController.getAllNotifications(authentication);
        } catch (RuntimeException e) {
            assertThat(e.getMessage()).isEqualTo("Service error");
        }
        verify(notificationService).getUserNotifications("testuser");
    }
}
