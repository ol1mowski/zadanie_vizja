package com.example.zadanieVizja.service;

import java.util.List;

import com.example.zadanieVizja.dto.NotificationResponse;
import com.example.zadanieVizja.entity.Reservation;

public interface NotificationService {
    void createCancellationNotification(Reservation reservation);
    List<NotificationResponse> getUserNotifications(String username);
    List<NotificationResponse> getUnreadNotifications(String username);
    long getUnreadCount(String username);
    void markAsRead(String username, Long notificationId);
    void markAllAsRead(String username);
}
