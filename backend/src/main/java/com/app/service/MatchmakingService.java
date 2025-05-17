package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.app.repository.SessionRepository;

@Service
public class MatchmakingService {

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final String VENTER_QUEUE = "venterQueue";
    private static final String LISTENER_QUEUE = "listenerQueue";

    public MatchmakingService() {
        // Dummy constructor — actual RedissonClient setup removed
    }

    public void addToQueue(String userId, String role) {
        // Dummy method — no actual queuing logic
        System.out.println("Pretending to add user to queue: " + userId + " with role: " + role);
    }

    public void matchUsers() {
        // Dummy method — no actual matchmaking logic
        System.out.println("Pretending to match users...");
    }
}
