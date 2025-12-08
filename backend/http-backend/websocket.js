import { WebSocketServer, WebSocket } from "ws";
import { verifyToken } from "./utils/authUtills.js";
import { addMeassage } from "../prisma/services/chatServices.js";

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (socket, request) => {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    // Extract token
    const token = url.searchParams.get("token");

    socket.currentConversationId =
      Number(url.searchParams.get("conversationId")) || undefined;

    if (!token) {
      socket.send(JSON.stringify({ error: "Missing token" }));
      socket.close();
      return;
    }

    const user = verifyToken(token);
    if (!user) {
      socket.send(JSON.stringify({ error: "Invalid token" }));
      socket.close();
      return;
    }

    socket.userId = user.id;

    socket.send(JSON.stringify({ message: "Connected" }));

    // ------------ On Message ------------
    socket.on("message", async (data) => {
      try {
        const payload = JSON.parse(data.toString());

        const { type, conversationId, content, messageId } = payload;

        if (!type || !conversationId) {
          return socket.send(
            JSON.stringify({ error: "Missing required fields" })
          );
        }

        // ========== TYPE: ADD MESSAGE ==========
        if (type === "add") {
          if (!content) {
            return socket.send(
              JSON.stringify({ error: "Content is required for add" })
            );
          }

          const savedMsg = await addMeassage(
            socket.userId,
            content,
            conversationId
          );

          // Broadcast to all users in conversation
          broadcastToConversation(
            wss,
            conversationId,
            {
              type: "newMessage",
              message: savedMsg,
            },
            socket.userId
          );

          return;
        }

        // ========== TYPE: DELETE MESSAGE ==========
        if (type === "delete") {
          // TODO: add deleteMessage() logic
          broadcastToConversation(
            wss,
            conversationId,
            {
              type: "messageDeleted",
              messageId,
            },
            socket.userId
          );
          return;
        }
      } catch (err) {
        socket.send(JSON.stringify({ error: "Invalid JSON payload" }));
      }
    });

    socket.on("close", () => {});
  });
}

// --------------- Broadcast Helper ----------------
function broadcastToConversation(wss, conversationId, payload, senderId) {
  const message = JSON.stringify(payload);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      // If client joined same conversation
      if (
        client.currentConversationId === conversationId &&
        client.userId !== senderId
      ) {
        client.send(message);
      }
    }
  });
}
