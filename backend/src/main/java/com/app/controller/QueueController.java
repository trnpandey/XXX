package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

import com.app.service.MatchmakingService;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    @Autowired private MatchmakingService matchmakingService;

    @PostMapping("/join")
    public ResponseEntity<?> joinQueue(@RequestBody Map<String, String> body, @RequestHeader("Authorization") String token) {
        String role = body.get("role");
        String userId = getUserIdFromToken(token);
        matchmakingService.addToQueue(userId, role);
        return ResponseEntity.ok().build();
    }

    // Helper method to extract user ID from token
    private String getUserIdFromToken(String token) {
        // Use Firebase Admin SDK to verify and extract uid/email
        return "user@example.com";
    }
}
