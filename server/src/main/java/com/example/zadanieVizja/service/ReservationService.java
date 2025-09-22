package com.example.zadanieVizja.service;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;

import java.util.List;

public interface ReservationService {
    ReservationResponse createByStudent(String username, ReservationRequest request);
    ReservationResponse createByCandidate(ReservationRequest request);
    List<ReservationResponse> listOwnForStudent(String username);
    List<ReservationResponse> listUnassigned();
    ReservationResponse assignToEmployee(String username, Long reservationId);
    void cancelByOwner(String username, Long reservationId);
}


