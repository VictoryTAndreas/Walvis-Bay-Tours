import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import { toast } from "react-toastify";

export default function ChatPage({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [conId, setconId] = useState(conversationId);
  const [friedlist, setFriendlist] = useState([]);
  const [msgLoading , setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // Use a ref to keep track of the socket so we don't lose connection on re-renders
  const ws = useRef(null);

  const fetchMessage = async (id) => {
    try {
      setconId(id);
      const seen = await axios.patch(
        `${import.meta.env.VITE_API_URL}/chat/${conId}/seen`,
        {},
        { headers: { authorization: token } }
      );
    } catch (error) {
      toast.success("Something went wrong");
    }
  };

  useEffect(() => {
    if (!token) return;

    // 1. Fetch old messages from DB
    const fetchHistory = async () => {
      try {
        const friends = await axios.get(
          `${import.meta.env.VITE_API_URL}/friend`,
          { headers: { authorization: token } }
        );
        setFriendlist(friends.data.friend);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/${conId}`,
          { headers: { authorization: token } }
        );
        setMessages(res.data.message || []);
        setLoading(false);

      } catch (error) {
        toast.success("Fetch error:");
      }
    };

    fetchHistory();

    // 2. Connect to WebSocket
    const socket = new WebSocket(
      `${import.meta.env.VITE_API_URL}?token=${token}&conversationId=${conId}`
    );

    socket.onopen = () => {
      console.log(" Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.message]); // FIX
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [token, conId]);

  const sendMessage = (content) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // 1. Send to Server
      ws.current.send(
        JSON.stringify({
          conversationId: conId,
          content: content,
          type: "add",
        })
      );

      // 2. OPTIMISTIC UPDATE (Fixes "Not appearing until refresh")
      // We manually add the message to our list immediately so the sender sees it.
      const tempMsg = {
        id: Date.now(), // Temporary ID
        senderId: user.id, // CRITICAL: Ensure this matches the logged-in user ID
        content: content,
        createdAt: new Date().toISOString(),
        seenBy: [],
      };

      setMessages((prev) => [...prev, tempMsg]);
    } else {
      alert("Connection lost. Try refreshing.");
    }
  };

  return (
    <ChatWindow
      messages={messages}
      sendMessage={sendMessage}
      friedlist={friedlist}
      getMeassage={fetchMessage}
    
    />
  );
}
