package com.singed.sindesk.service.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class TokenUtils {

    // Method to generate a random token
    public static String generateVerificationToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[20]; // 160 bits token
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes); // Encode to URL-safe base64
    }
}
