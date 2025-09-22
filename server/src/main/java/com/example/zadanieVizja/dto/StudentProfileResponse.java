package com.example.zadanieVizja.dto;

import com.example.zadanieVizja.entity.UserRole;

public record StudentProfileResponse(
    String username,
    String studentAlbumNumber,
    String email,
    UserRole role
) {}
