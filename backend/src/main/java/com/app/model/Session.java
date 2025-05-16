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