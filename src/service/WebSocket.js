import io from "socket.io-client";

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

const socket = io(URL);

export class WebSocketService {
  constructor() {
    this.signalCallbacks = {};
  }

  init() {
    socket.on("connect", () => console.log("Connected"));
  }

  disconnect() {
    socket.on("disconnect", () => console.log("Disconnect"));
  }

  subscribeSignal(code, callback) {
    socket.on(code, data => callback(data));
  }
}

export const WebSocket = new WebSocketService();
