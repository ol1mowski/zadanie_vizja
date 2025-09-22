package com.example.zadanieVizja.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<ReservationResponse> createByStudent(@RequestHeader("X-Username") String username,
                                                               @Valid @RequestBody ReservationRequest request) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @PostMapping("/candidate")
    public ResponseEntity<ReservationResponse> createByCandidate(@Valid @RequestBody ReservationRequest request) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @GetMapping("/student")
    public ResponseEntity<List<ReservationResponse>> listOwnForStudent(@RequestHeader("X-Username") String username) {
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<ReservationResponse>> listUnassigned() {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<ReservationResponse> assign(@RequestHeader("X-Username") String username,
                                                      @PathVariable("id") Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(@RequestHeader("X-Username") String username,
                       @PathVariable("id") Long id) {
    }
}


