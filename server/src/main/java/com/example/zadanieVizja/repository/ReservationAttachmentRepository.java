package com.example.zadanieVizja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.zadanieVizja.entity.ReservationAttachment;

@Repository
public interface ReservationAttachmentRepository extends JpaRepository<ReservationAttachment, Long> {
    List<ReservationAttachment> findByReservationId(Long reservationId);
}
