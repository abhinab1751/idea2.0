import { WS_URL } from "@/utils/constants";

type AlertHandler = (data: unknown) => void;

let socket: WebSocket | null = null;
let handlers: AlertHandler[] = [];

export function connectLiveAlertsSocket(onAlert: AlertHandler): () => void {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    try {
      socket = new WebSocket(`${WS_URL}/live-alerts`);
    } catch {
      socket = null;
      handlers.push(onAlert);
      return () => {
        handlers = handlers.filter((h) => h !== onAlert);
      };
    }

    socket.onopen = () => {
      console.log("[GARUDA] WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handlers.forEach((h) => h(data));
      } catch {
        console.error("[GARUDA] WS parse error");
      }
    };

    socket.onerror = () => {
      socket?.close();
      socket = null;
    };

    socket.onclose = () => {
      console.log("[GARUDA] WS disconnected");
      socket = null;
    };
  }

  handlers.push(onAlert);

  return () => {
    handlers = handlers.filter((h) => h !== onAlert);
    if (handlers.length === 0 && socket) {
      socket.close();
      socket = null;
    }
  };
}
