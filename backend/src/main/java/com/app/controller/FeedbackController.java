package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

import com.app.repository.SessionRepository;
import com.app.repository.UserRepository;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired private SessionRepository sessionRepo;
    @Autowired private UserRepository userRepo;

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, Object> body) {
        String sessionId = (String) body.get("sessionId");
        int rating = (int) body.get("rating");
        // Find session, update user ratings, award karma to listener
        // Save feedback
        return ResponseEntity.ok().build();
    }
}
