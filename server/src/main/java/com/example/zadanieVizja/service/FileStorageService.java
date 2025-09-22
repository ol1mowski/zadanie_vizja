package com.example.zadanieVizja.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String storeFile(MultipartFile file, Long reservationId);
    byte[] loadFile(String storedFileName);
    void deleteFile(String storedFileName);
}
