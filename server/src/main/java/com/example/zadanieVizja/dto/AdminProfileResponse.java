package com.example.zadanieVizja.dto;

import com.example.zadanieVizja.entity.UserRole;

public record AdminProfileResponse(
    String username,
    String email,
    UserRole role
) {}


