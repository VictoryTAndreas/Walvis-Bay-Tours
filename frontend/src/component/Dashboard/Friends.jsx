import React, { useEffect, useState } from "react";
import FriendCard from "../FriendCard";
import axios from "axios";
import { FaUserFriends, FaUserPlus, FaPaperPlane } from "react-icons/fa";
import LoadingEffect from "../ui/LoadingEffect";
import ChatPage from "../Chat/ChatPage";
import { toast } from "react-toastify";

const Friends = () => {
  const token = localStorage.getItem("token");

  // State
  const [friendsList, setFriendsList] = useState([]); // from 'friend'
  const [receivedRequests, setReceivedRequests] = useState([]); // from 'notAccepeted' (Incoming)
  const [sentRequests, setSentRequests] = useState([]); // from 'pendingRequest' (Outgoing)
  const [loading, setLoading] = useState(true);
  const [openChat, setChatInterface] = useState(false);
  const [conversationId, setConsversationId] = useState(1);

  const chatHandler = (id) => {
    try {
      console.log(id);
      setConsversationId(id);
      setChatInterface(true);
    } catch (error) {
      toast.success("something went wrong");
    }
  };

  // UI State for Tabs
  const [activeTab, setActiveTab] = useState("friends"); // 'friends', 'received', 'sent'

  const getAllFriends = async () => {
    try {
      setLoading(true);
      const headers = { authorization: token };

      // Parallel fetching for speed
      const [friendsRes, receivedRes, sentRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/friend`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/friend/notAccepeted`, {
          headers,
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/friend/pendingRequest`, {
          headers,
        }),
      ]);

      setFriendsList(friendsRes.data.friend || []);
      setReceivedRequests(receivedRes.data.notAccepeted || []);
      setSentRequests(sentRes.data.pendingRequest || []);
    } catch (error) {
      toast.success("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRequest = async (senderId) => {
    console.log("yes")
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/friend/${senderId}`,
        {},
        { headers: { authorization: token } }
      );

      if (response) {
        toast.success("Request Accepted!");
        getAllFriends();
      }
    } catch (error) {
      toast.success("Error accepting request:");
    }
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  if (loading) {
    return <LoadingEffect />;
  }

  // --- TAB RENDER LOGIC --- //

  const renderContent = () => {
    switch (activeTab) {
      case "friends":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-800">
                My Friends{" "}
                <span className="text-stone-400 font-normal">
                  ({friendsList.length})
                </span>
              </h2>
            </div>

            {friendsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friendsList.map((item, ind) => (
                  // FIX: Pass item.friendInformation as the user props
                  <FriendCard
                    key={ind}
                    user={item.friendInformation}
                    conversationId={item.conversationId}
                    message="Message"
                    type="friend"
                    ChatHandler={chatHandler}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="No friends yet. Go explore and connect!" />
            )}
          </div>
        );

      case "received":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-800">
              Friend Requests{" "}
              <span className="text-stone-400 font-normal">
                ({receivedRequests.length})
              </span>
            </h2>
            {receivedRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {receivedRequests.map((item, ind) => (
                  // FIX: Pass item.sender as the user (Incoming request)
                  <FriendCard
                    key={ind}
                    user={item.sender}
                    message="Accept"
                    handelrequest={handleFriendRequest}
                    ChatHandler={() => { console.log("")}}
                   
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="No pending requests at the moment." />
            )}
          </div>
        );

      case "sent":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-800">
              Sent Requests{" "}
              <span className="text-stone-400 font-normal">
                ({sentRequests.length})
              </span>
            </h2>
            {sentRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sentRequests.map((item, ind) => (
                  // FIX: Pass item.receiver as the user (Outgoing request)
                  <FriendCard
                    key={ind}
                    user={item.receiver}
                    message="Pending"
                    type="outgoing"
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="You haven't sent any requests recently." />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (openChat) {
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex p-14 z-50"
        onClick={() => {
          setChatInterface(false);
        }}
      >
        <ChatPage conversationId={conversationId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">
            Connections
          </h1>
          <p className="text-stone-500">
            Manage your network, accept requests, and find travel buddies.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-xl border border-stone-200 w-full md:w-fit shadow-sm">
          <TabButton
            active={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
            icon={<FaUserFriends />}
            label="Friends"
            count={friendsList.length}
          />
          <TabButton
            active={activeTab === "received"}
            onClick={() => setActiveTab("received")}
            icon={<FaUserPlus />}
            label="Requests"
            count={receivedRequests.length}
          />
          <TabButton
            active={activeTab === "sent"}
            onClick={() => setActiveTab("sent")}
            icon={<FaPaperPlane />}
            label="Sent"
            count={sentRequests.length}
          />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// --- Sub Components for cleanliness ---

const TabButton = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex-1 md:flex-none justify-center
      ${
        active
          ? "bg-stone-900 text-white shadow-md"
          : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
      }`}
  >
    {icon}
    <span>{label}</span>
    {count > 0 && (
      <span
        className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
          active ? "bg-stone-700" : "bg-stone-200"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
    <div className="bg-stone-100 p-4 rounded-full mb-4">
      <FaUserFriends className="text-4xl text-stone-400" />
    </div>
    <p className="text-stone-500 font-medium text-lg">{message}</p>
  </div>
);

export default Friends;
