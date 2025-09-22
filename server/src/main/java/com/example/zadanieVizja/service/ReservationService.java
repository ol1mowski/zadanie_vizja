package com.example.zadanieVizja.service;

import java.util.List;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;

public interface ReservationService {
    ReservationResponse createByStudent(String username, ReservationRequest request);
    ReservationResponse createByCandidate(ReservationRequest request);
    List<ReservationResponse> listOwnForStudent(String username);
    List<ReservationResponse> listUnassigned();
    ReservationResponse assignToEmployee(String username, Long reservationId);
    void cancelByOwner(String username, Long reservationId);
}


