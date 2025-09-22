package com.example.zadanieVizja.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.entity.User;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStudent(User student);
    List<Reservation> findByAssignedEmployee(User employee);
    boolean existsByAssignedEmployeeAndDateAndTime(User employee, LocalDate date, LocalTime time);
    List<Reservation> findByStatus(ReservationStatus status);
}


