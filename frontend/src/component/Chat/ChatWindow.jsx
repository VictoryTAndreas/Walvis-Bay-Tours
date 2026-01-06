import { useEffect, useRef, useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Plus, 
  Send, 
  Smile, 
  CheckCheck, 
  ArrowLeft,
  Loader2,
  MessageSquare,
  User,
  X
} from "lucide-react";

export default function ChatInterface({
  userId,
  messages,
  sendMessage,
  onSelectChat,
  friedlist,
  getMeassage,
  msgLoading,
  memberLoading,
  onClose
}) {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    id: userId,
    name: "Me",
  };

  const setConversationId = (id) => {
    if (getMeassage) getMeassage(id);
  };

  const activeChat = friedlist?.find(
    (c) => c.friendInformation.id === selectedChatId
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (!msg) return;
    sendMessage(msg);
    e.target.reset();
    setTimeout(() => e.target.message.focus(), 0);
  };

  const filteredFriends = friedlist?.filter(friend => 
    friend.friendInformation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="flex w-full h-[600px] overflow-hidden bg-white rounded-3xl shadow-2xl border border-stone-200 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Global Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-stone-100 hover:bg-orange-500 hover:text-white text-stone-500 rounded-full transition-all shadow-md group"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-1/3 min-w-[320px] max-w-[400px] bg-white border-r border-stone-100 flex flex-col h-full z-20">
        
        {/* Sidebar Header */}
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <h2 className="text-xl font-bold text-stone-900">Messages</h2>
          </div>
          <button className="p-2 hover:bg-stone-100 rounded-xl transition-colors text-stone-500">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-stone-50">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 bg-stone-100 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-stone-700 placeholder-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {memberLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-stone-400">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              <p className="font-medium">Loading friends...</p>
            </div>
          ) : filteredFriends?.length > 0 ? (
            filteredFriends.map((contact) => (
              <div
                key={contact.friendInformation.id || contact.conversationId}
                onClick={() => {
                  setSelectedChatId(contact.friendInformation.id);
                  setConversationId(contact.conversationId);
                  if (onSelectChat) onSelectChat(contact);
                }}
                className={`flex items-center p-4 cursor-pointer relative transition-all duration-300 mx-2 my-1 rounded-2xl
                  ${
                    selectedChatId === contact.friendInformation.id
                      ? "bg-orange-50 text-orange-900 shadow-sm"
                      : "hover:bg-stone-50 text-stone-600"
                  }`}
              >
                {/* Avatar */}
                <div className="relative w-14 h-14 flex-shrink-0">
                  <div className={`w-full h-full rounded-2xl flex items-center justify-center text-white font-bold shadow-md transition-transform duration-300
                    ${selectedChatId === contact.friendInformation.id ? "bg-orange-500 scale-105" : "bg-stone-300"}
                  `}>
                    {contact.friendInformation.name ? contact.friendInformation.name[0].toUpperCase() : "?"}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Info */}
                <div className="ml-4 flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-bold truncate ${selectedChatId === contact.friendInformation.id ? "text-orange-600" : "text-stone-900"}`}>
                      {contact.friendInformation.name}
                    </h3>
                  </div>
                  <p className="text-sm truncate opacity-70">
                    {contact.friendInformation.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-400">
              <User className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">No friends found</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT CHAT WINDOW ================= */}
      <div className="flex-1 flex flex-col h-full bg-stone-50 relative min-w-0">
        
        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-20 px-6 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between z-20 border-b border-stone-100 flex-shrink-0">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold shadow-lg">
                  {activeChat.friendInformation.name ? activeChat.friendInformation.name[0].toUpperCase() : "C"}
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-stone-900 text-lg leading-tight">
                    {activeChat.friendInformation.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-stone-500 font-semibold tracking-wide uppercase">Active Now</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mr-10"> {/* Margin to avoid overlapping with global close button if same line */}
                <button className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10 scroll-smooth">
              {msgLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                  <p className="font-bold text-lg">Retrieving messages...</p>
                </div>
              ) : messages.length > 0 ? (
                messages.map((msg, index) => {
                  const isOwn = String(msg.senderId) === String(user.id);
                  return (
                    <div key={index} className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                      <div className={`relative max-w-[75%] lg:max-w-[65%] px-5 py-3 shadow-md
                        ${isOwn
                          ? "bg-orange-500 text-white rounded-2xl rounded-tr-none"
                          : "bg-white text-stone-800 rounded-2xl rounded-tl-none border border-stone-100"}
                      `}>
                        <p className="leading-relaxed break-words whitespace-pre-wrap font-medium">
                          {msg.content}
                        </p>
                        <div className={`flex items-center gap-2 mt-2 justify-end ${isOwn ? "text-orange-100" : "text-stone-400"}`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                          </span>
                          {isOwn && <CheckCheck className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-400">
                  <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-10 h-10 opacity-30 px-1" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-600 mb-2">No messages yet</h3>
                  <p className="max-w-xs font-medium">Start the conversation by sending a message below!</p>
                </div>
              )}
              <div ref={scrollRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white z-20 border-t border-stone-100 flex-shrink-0">
              <form onSubmit={handleSend} className="flex gap-4 items-center">
                <button
                  type="button"
                  className="text-stone-400 p-3 hover:bg-stone-50 rounded-2xl transition-all hover:text-orange-500"
                >
                  <Smile className="w-7 h-7" />
                </button>

                <div className="flex-1 relative">
                  <input
                    name="message"
                    required
                    autoComplete="off"
                    placeholder="Write a message..."
                    className="w-full px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 bg-stone-100 text-stone-800 placeholder-stone-400 font-medium transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all duration-300 flex items-center justify-center group"
                >
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center p-12 bg-white">
            <div className="relative w-64 h-64 mb-10">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse opacity-50"></div>
              <div className="absolute inset-4 bg-orange-50 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageSquare className="w-32 h-32 text-orange-500" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-stone-900 mb-4 tracking-tight">
              Stay Connected
            </h2>
            <p className="text-stone-500 text-lg max-w-sm font-medium leading-relaxed">
              Select a friend from the left to start a beautiful journey of conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
