package com.example.zadanieVizja.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;
import com.example.zadanieVizja.entity.CandidateData;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationStatus;
import com.example.zadanieVizja.entity.User;
import com.example.zadanieVizja.entity.UserRole;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.repository.UserRepository;
import com.example.zadanieVizja.service.ReservationService;

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
        User student = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Student not found: " + username));
        if (student.getRole() != UserRole.STUDENT) {
            throw new IllegalStateException("Only student can create student reservation");
        }

        Reservation reservation = Reservation.builder()
                .date(request.date())
                .time(request.time())
                .topic(request.topic())
                .description(request.description())
                .status(ReservationStatus.PENDING)
                .student(student)
                .assignedEmployee(null)
                .build();

        reservation = reservationRepository.save(reservation);
        return toResponse(reservation);
    }

    @Override
    public ReservationResponse createByCandidate(ReservationRequest request) {
        if (Objects.isNull(request.candidateFirstName()) || Objects.isNull(request.candidateLastName())
                || Objects.isNull(request.candidatePesel()) || Objects.isNull(request.candidateEmail())) {
            throw new IllegalArgumentException("Candidate data is required");
        }

        CandidateData cd = CandidateData.builder()
                .firstName(request.candidateFirstName())
                .lastName(request.candidateLastName())
                .pesel(request.candidatePesel())
                .email(request.candidateEmail())
                .build();

        Reservation reservation = Reservation.builder()
                .date(request.date())
                .time(request.time())
                .topic(request.topic())
                .description(request.description())
                .status(ReservationStatus.PENDING)
                .candidateData(cd)
                .assignedEmployee(null)
                .build();

        reservation = reservationRepository.save(reservation);
        return toResponse(reservation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> listOwnForStudent(String username) {
        User student = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Student not found: " + username));
        return reservationRepository.findByStudent(student).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> listUnassigned() {
        return reservationRepository.findByStatus(ReservationStatus.PENDING).stream()
                .filter(r -> r.getAssignedEmployee() == null)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationResponse assignToEmployee(String username, Long reservationId) {
        User employee = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + username));
        if (employee.getRole() != UserRole.ADMIN) {
            throw new IllegalStateException("Only admin can assign reservations");
        }

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found: " + reservationId));
        if (reservation.getAssignedEmployee() != null) {
            throw new IllegalStateException("Reservation already assigned");
        }
        boolean conflict = reservationRepository.existsByAssignedEmployeeAndDateAndTime(
                employee, reservation.getDate(), reservation.getTime());
        if (conflict) {
            throw new IllegalStateException("Employee already has reservation at this time");
        }

        reservation.setAssignedEmployee(employee);
        reservation.setStatus(ReservationStatus.ASSIGNED);
        reservation = reservationRepository.save(reservation);
        return toResponse(reservation);
    }

    @Override
    public void cancelByOwner(String username, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found: " + reservationId));
        boolean isStudentOwner = reservation.getStudent() != null
                && reservation.getStudent().getUsername().equals(username);
        boolean isCandidate = reservation.getCandidateData() != null; // no auth for candidate yet
        if (!isStudentOwner && !isCandidate) {
            throw new IllegalStateException("Only owner can cancel reservation");
        }
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    private ReservationResponse toResponse(Reservation reservation) {
        String assigned = reservation.getAssignedEmployee() != null
                ? reservation.getAssignedEmployee().getUsername()
                : null;
        return new ReservationResponse(
                reservation.getId(),
                reservation.getDate(),
                reservation.getTime(),
                reservation.getTopic(),
                reservation.getDescription(),
                reservation.getStatus(),
                assigned
        );
    }
}


