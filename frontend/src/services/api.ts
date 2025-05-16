const API = "https://your-backend-url/api";

export async function joinQueue(role: "venter" | "listener", token: string) {
  return fetch(`${API}/queue/join`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  }).then(res => res.json());
}

export async function checkSessionStatus(token: string) {
  return fetch(`${API}/session/status`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.json());
}

export async function submitFeedback(token: string, sessionId: string, rating: number) {
  return fetch(`${API}/feedback/submit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, rating }),
  }).then(res => res.json());
}