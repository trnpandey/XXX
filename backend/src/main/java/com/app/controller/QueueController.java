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