package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.redisson.api.RQueue;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

import com.app.model.Session;
import com.app.repository.SessionRepository;

@Service
public class MatchmakingService {

    private final RedissonClient redissonClient;
    @Autowired private SessionRepository sessionRepo;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    private static final String VENTER_QUEUE = "venterQueue";
    private static final String LISTENER_QUEUE = "listenerQueue";

    public MatchmakingService() {
        Config config = new Config();
        config.useSingleServer()
                .setAddress("rediss://patient-turtle-32013.upstash.io:6379")
                .setPassword("AX0NAAIjcDFhOWQ0OGFhYjk3MWU0ZjZkOGFjYzVmMzQ4NjIwMzY0MHAxMA")
                .setDnsMonitoringInterval(5000) // Check every 5 seconds instead of too frequently
                .setTimeout(30000)              // Increase connection timeout
                .setRetryAttempts(10)           // Increase retries
                .setRetryInterval(3000);        // Interval between retries
        this.redissonClient = Redisson.create(config);
    }

    public void addToQueue(String userId, String role) {
        RQueue<String> queue = redissonClient.getQueue(role.equalsIgnoreCase("venter") ? VENTER_QUEUE : LISTENER_QUEUE);
        queue.add(userId);
        matchUsers();
    }

    @Transactional
    public void matchUsers() {
        RLock lock = redissonClient.getLock("queueLock");
        lock.lock();
        try {
            RQueue<String> venterQueue = redissonClient.getQueue(VENTER_QUEUE);
            RQueue<String> listenerQueue = redissonClient.getQueue(LISTENER_QUEUE);
            while (!venterQueue.isEmpty() && !listenerQueue.isEmpty()) {
                String venterId = venterQueue.poll();
                String listenerId = listenerQueue.poll();
                if (venterId != null && listenerId != null) {
                    Session session = new Session(UUID.randomUUID().toString(), venterId, listenerId, Instant.now(), null);
                    sessionRepo.save(session);
                    messagingTemplate.convertAndSendToUser(venterId, "/queue/match", session);
                    messagingTemplate.convertAndSendToUser(listenerId, "/queue/match", session);
                }
            }
        } finally {
            lock.unlock();
        }
    }
}
