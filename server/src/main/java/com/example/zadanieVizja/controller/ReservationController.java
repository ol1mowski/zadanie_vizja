package com.example.zadanieVizja.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.zadanieVizja.dto.ReservationRequest;
import com.example.zadanieVizja.dto.ReservationResponse;
import com.example.zadanieVizja.service.ReservationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/student")
    public ResponseEntity<ReservationResponse> createByStudent(@Valid @RequestBody ReservationRequest request,
                                                               Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.status(HttpStatus.CREATED).body(
                reservationService.createByStudent(username, request)
        );
    }

    @PostMapping("/candidate")
    public ResponseEntity<ReservationResponse> createByCandidate(@Valid @RequestBody ReservationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                reservationService.createByCandidate(request)
        );
    }

    @GetMapping("/student")
    public ResponseEntity<List<ReservationResponse>> listOwnForStudent(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(reservationService.listOwnForStudent(username));
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<ReservationResponse>> listUnassigned() {
        return ResponseEntity.ok(reservationService.listUnassigned());
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<ReservationResponse> assign(@RequestHeader("X-Username") String username,
                                                      @PathVariable("id") Long id) {
        return ResponseEntity.ok(reservationService.assignToEmployee(username, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(@PathVariable("id") Long id, Authentication auth) {
        String username = auth.getName();
        reservationService.cancelByOwner(username, id);
    }
}


