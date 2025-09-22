package com.example.zadanieVizja.dto;

public record AttachmentResponse(
    Long id,
    String originalFileName,
    String contentType,
    Long fileSize,
    String downloadUrl
) {}
