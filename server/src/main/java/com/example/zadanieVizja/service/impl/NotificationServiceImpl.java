package com.example.zadanieVizja.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.zadanieVizja.dto.NotificationResponse;
import com.example.zadanieVizja.entity.Notification;
import com.example.zadanieVizja.entity.NotificationType;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.repository.NotificationRepository;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.service.NotificationService;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, 
                                 UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void createCancellationNotification(Reservation reservation) {
        if (reservation.getAssignedEmployee() == null) {
            return; 
        }

        String studentInfo = reservation.getStudent() != null 
            ? reservation.getStudent().getEmail() 
            : "Kandydat";

        String title = "Wizyta została anulowana";
        String message = String.format(
            "Wizyta '%s' zaplanowana na %s o %s została anulowana przez %s. %s",
            reservation.getTopic(),
            reservation.getDate(),
            reservation.getTime(),
            studentInfo,
            reservation.getDescription() != null && !reservation.getDescription().isEmpty() 
                ? "Opis: " + reservation.getDescription() 
                : ""
        );

        Notification notification = Notification.builder()
            .recipient(reservation.getAssignedEmployee())
            .type(NotificationType.RESERVATION_CANCELLED)
            .title(title)
            .message(message)
            .relatedReservation(reservation)
            .isRead(false)
            .createdAt(LocalDateTime.now())
            .build();

        notificationRepository.save(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUserNotifications(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(user)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadNotifications(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        return notificationRepository.findByRecipientAndIsReadFalseOrderByCreatedAtDesc(user)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        return notificationRepository.countByRecipientAndIsReadFalse(user);
    }

    @Override
    public void markAsRead(String username, Long notificationId) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new IllegalArgumentException("Notification not found: " + notificationId));
        
        if (!notification.getRecipient().equals(user)) {
            throw new IllegalStateException("User can only mark their own notifications as read");
        }
        
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
        
        List<Notification> unreadNotifications = notificationRepository
            .findByRecipientAndIsReadFalseOrderByCreatedAtDesc(user);
        
        unreadNotifications.forEach(notification -> notification.setIsRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }

    private NotificationResponse toResponse(Notification notification) {
        return new NotificationResponse(
            notification.getId(),
            notification.getType(),
            notification.getTitle(),
            notification.getMessage(),
            notification.getRelatedReservation() != null 
                ? notification.getRelatedReservation().getId() 
                : null,
            notification.getIsRead(),
            notification.getCreatedAt()
        );
    }
}
