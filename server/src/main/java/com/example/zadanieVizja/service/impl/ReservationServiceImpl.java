package com.example.zadanieVizja.service.impl;

import com.example.zadanieVizja.domain.*;
import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.service.ReservationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ReservationResponse createByStudent(String username, ReservationRequest request) {
        return notImplemented();
    }

    @Override
    public ReservationResponse createByCandidate(ReservationRequest request) {
        return notImplemented();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> listOwnForStudent(String username) {
        return List.of();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> listUnassigned() {
        return List.of();
    }

    @Override
    public ReservationResponse assignToEmployee(String username, Long reservationId) {
        return notImplemented();
    }

    @Override
    public void cancelByOwner(String username, Long reservationId) {
    }

    private ReservationResponse notImplemented() {
        throw new UnsupportedOperationException("Not implemented yet");
    }
}


