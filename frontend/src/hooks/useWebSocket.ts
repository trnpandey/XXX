import { useRef, useEffect } from "react";

const useWebSocket = (sessionId: string, token: string, onMessage: (msg: any) => void) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://your-backend-url/ws/chat/${sessionId}?token=${token}`);
    ws.current.onmessage = (event) => onMessage(JSON.parse(event.data));
    ws.current.onerror = () => {
      // fallback to polling or retry logic here
    };
    return () => {
      ws.current?.close();
    };
  }, [sessionId, token, onMessage]);

  return {
    send: (data: string) => ws.current?.send(data),
    onclose: (ws.current && ws.current.onclose) || (() => {}),
  };
};

export default useWebSocket;