package com.example.zadanieVizja.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ReservationRequest(
        @NotNull LocalDate date,
        @NotNull LocalTime time,
        @NotBlank @Size(max = 500) String topic,
        @Size(max = 2000) String description,

        @Size(max = 100) String candidateFirstName,
        @Size(max = 100) String candidateLastName,
        @Pattern(regexp = "^[0-9]{11}$") String candidatePesel,
        @Email String candidateEmail,
        @Pattern(regexp = "^[+]?[0-9\\s\\-()]{9,15}$") String candidatePhone
) {}


