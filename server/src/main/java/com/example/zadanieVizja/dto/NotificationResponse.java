package com.example.zadanieVizja.dto;

import java.time.LocalDateTime;

import com.example.zadanieVizja.entity.NotificationType;

public record NotificationResponse(
    Long id,
    NotificationType type,
    String title,
    String message,
    Long relatedReservationId,
    Boolean isRead,
    LocalDateTime createdAt
) {}
