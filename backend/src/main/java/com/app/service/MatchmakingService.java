@Service
public class MatchmakingService {
    @Autowired private RedissonClient redissonClient;
    @Autowired private SessionRepository sessionRepo;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    private static final String VENTER_QUEUE = "venterQueue";
    private static final String LISTENER_QUEUE = "listenerQueue";

    public void addToQueue(String userId, String role) {
        RQueue<String> queue = redissonClient.getQueue(role.equals("venter") ? VENTER_QUEUE : LISTENER_QUEUE);
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