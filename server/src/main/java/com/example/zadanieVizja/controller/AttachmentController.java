package com.example.zadanieVizja.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.zadanieVizja.dto.AttachmentResponse;
import com.example.zadanieVizja.entity.Reservation;
import com.example.zadanieVizja.entity.ReservationAttachment;
import com.example.zadanieVizja.repository.ReservationAttachmentRepository;
import com.example.zadanieVizja.repository.ReservationRepository;
import com.example.zadanieVizja.service.FileStorageService;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {

    private final FileStorageService fileStorageService;
    private final ReservationAttachmentRepository attachmentRepository;
    private final ReservationRepository reservationRepository;

    public AttachmentController(FileStorageService fileStorageService,
                              ReservationAttachmentRepository attachmentRepository,
                              ReservationRepository reservationRepository) {
        this.fileStorageService = fileStorageService;
        this.attachmentRepository = attachmentRepository;
        this.reservationRepository = reservationRepository;
    }

    @PostMapping("/reservation/{reservationId}")
    public ResponseEntity<AttachmentResponse> uploadFile(@PathVariable Long reservationId,
                                                       @RequestParam("file") MultipartFile file,
                                                       Authentication auth) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        
        String username = auth.getName();
        boolean hasAccess = (reservation.getStudent() != null && reservation.getStudent().getUsername().equals(username)) ||
                           (reservation.getAssignedEmployee() != null && reservation.getAssignedEmployee().getUsername().equals(username));
        
        if (!hasAccess) {
            return ResponseEntity.status(403).build();
        }

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }
        
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("File size cannot exceed 10MB");
        }

        String storedFileName = fileStorageService.storeFile(file, reservationId);
        
        ReservationAttachment attachment = ReservationAttachment.builder()
                .reservation(reservation)
                .originalFileName(file.getOriginalFilename())
                .storedFileName(storedFileName)
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .uploadTimestamp(LocalDateTime.now())
                .build();
        
        attachment = attachmentRepository.save(attachment);
        
        AttachmentResponse response = new AttachmentResponse(
                attachment.getId(),
                attachment.getOriginalFileName(),
                attachment.getContentType(),
                attachment.getFileSize(),
                "/api/attachments/" + attachment.getId() + "/download"
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{attachmentId}/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long attachmentId,
                                                        Authentication auth) {
        ReservationAttachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new IllegalArgumentException("Attachment not found"));
        
        Reservation reservation = attachment.getReservation();
        String username = auth.getName();
        boolean hasAccess = (reservation.getStudent() != null && reservation.getStudent().getUsername().equals(username)) ||
                           (reservation.getAssignedEmployee() != null && reservation.getAssignedEmployee().getUsername().equals(username));
        
        if (!hasAccess) {
            return ResponseEntity.status(403).build();
        }

        byte[] fileContent = fileStorageService.loadFile(attachment.getStoredFileName());
        ByteArrayResource resource = new ByteArrayResource(fileContent);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename=\"" + attachment.getOriginalFileName() + "\"")
                .body(resource);
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<AttachmentResponse>> getAttachments(@PathVariable Long reservationId,
                                                                 Authentication auth) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        
        String username = auth.getName();
        boolean hasAccess = (reservation.getStudent() != null && reservation.getStudent().getUsername().equals(username)) ||
                           (reservation.getAssignedEmployee() != null && reservation.getAssignedEmployee().getUsername().equals(username));
        
        if (!hasAccess) {
            return ResponseEntity.status(403).build();
        }

        List<AttachmentResponse> attachments = attachmentRepository.findByReservationId(reservationId)
                .stream()
                .map(att -> new AttachmentResponse(
                        att.getId(),
                        att.getOriginalFileName(),
                        att.getContentType(),
                        att.getFileSize(),
                        "/api/attachments/" + att.getId() + "/download"
                ))
                .toList();
        
        return ResponseEntity.ok(attachments);
    }

    @DeleteMapping("/{attachmentId}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Long attachmentId,
                                                Authentication auth) {
        ReservationAttachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new IllegalArgumentException("Attachment not found"));
        
        Reservation reservation = attachment.getReservation();
        String username = auth.getName();
        boolean hasAccess = (reservation.getStudent() != null && reservation.getStudent().getUsername().equals(username));
        
        if (!hasAccess) {
            return ResponseEntity.status(403).build();
        }

        fileStorageService.deleteFile(attachment.getStoredFileName());
        
        attachmentRepository.delete(attachment);
        
        return ResponseEntity.noContent().build();
    }
}
