package com.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "sessions")
public class Session {
    @Id
    private String sessionId;
    private String venterId;
    private String listenerId;
    private Instant startedAt;
    private Instant endedAt;
    // getters/setters/constructors omitted for brevity
}
