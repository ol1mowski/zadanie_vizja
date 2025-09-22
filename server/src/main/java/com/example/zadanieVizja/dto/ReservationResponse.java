package com.example.zadanieVizja.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.zadanieVizja.entity.ReservationStatus;

public record ReservationResponse(
        Long id,
        LocalDate date,
        LocalTime time,
        String topic,
        String description,
        ReservationStatus status,
        String assignedEmployeeUsername
) {}


