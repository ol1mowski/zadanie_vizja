package com.example.zadanieVizja.security;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class InMemoryTokenBlacklist {

    private final Map<String, Long> tokenToExpiryEpochMs = new ConcurrentHashMap<>();

    public void blacklist(String token, long expiryEpochMs) {
        tokenToExpiryEpochMs.put(token, expiryEpochMs);
    }

    public boolean isBlacklisted(String token) {
        if (token == null) return false;
        Long expiry = tokenToExpiryEpochMs.get(token);
        if (expiry == null) return false;
        if (expiry <= Instant.now().toEpochMilli()) {
            tokenToExpiryEpochMs.remove(token);
            return false;
        }
        return true;
    }
}


