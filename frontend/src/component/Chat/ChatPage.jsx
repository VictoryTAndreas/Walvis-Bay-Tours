import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatWindow from "./ChatWindow";
import { toast } from "react-toastify";

export default function ChatPage({ conversationId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [conId, setconId] = useState(conversationId);
  const [friedlist, setFriendlist] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const ws = useRef(null);

  // Fetch friend list once on mount
  useEffect(() => {
    if (!token) return;
    const fetchFriends = async () => {
      setMemberLoading(true);
      try {
        const friends = await axios.get(
          `${import.meta.env.VITE_API_URL}/friend`,
          { headers: { authorization: token } }
        );
        setFriendlist(friends.data.friend);
      } catch (error) {
        toast.error("Failed to load friends");
      } finally {
        setMemberLoading(false);
      }
    };
    fetchFriends();
  }, [token]);

  const fetchMessage = async (id) => {
    if (id === conId) return;
    try {
      setMessages([]); // Clear previous messages immediately to avoid "bleeding"
      setconId(id);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/chat/${id}/seen`,
        {},
        { headers: { authorization: token } }
      );
    } catch (error) {
      console.error("Error marking seen:", error);
    }
  };

  useEffect(() => {
    if (!token || !conId) return;

    const fetchHistory = async () => {
      setMsgLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/${conId}`,
          { headers: { authorization: token } }
        );
        setMessages(res.data.message || []);
      } catch (error) {
        toast.error("Failed to load chat history");
      } finally {
        setMsgLoading(false);
      }
    };

    fetchHistory();

    const socket = new WebSocket(
      `${import.meta.env.VITE_API_URL}?token=${token}&conversationId=${conId}`
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.message]);
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
      ws.current.send(
        JSON.stringify({
          conversationId: conId,
          content: content,
          type: "add",
        })
      );

      const tempMsg = {
        id: Date.now(),
        senderId: user.id,
        content: content,
        createdAt: new Date().toISOString(),
        seenBy: [],
      };

      setMessages((prev) => [...prev, tempMsg]);
    } else {
      toast.error("Connection lost. Try refreshing.");
    }
  };

  return (
    <ChatWindow
      messages={messages}
      sendMessage={sendMessage}
      friedlist={friedlist}
      getMeassage={fetchMessage}
      msgLoading={msgLoading}
      memberLoading={memberLoading}
      onClose={onClose}
    />
  );
}
