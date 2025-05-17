package com.app.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    private String sessionId;
    private String venterId;
    private String listenerId;
    private Instant startedAt;
    private Instant endedAt;
}
