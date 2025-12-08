import { useEffect, useRef, useState } from "react";

export default function ChatInterface({
  userId,
  messages,
  sendMessage,
  onSelectChat,
  friedlist, // Keeping prop name as requested
  getMeassage, // Keeping prop name as requested
 
}) {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const scrollRef = useRef(null);

  // Current User Logic
  const user = JSON.parse(localStorage.getItem("user")) || {
    id: userId,
    name: "Me",
  };

  const setConversationId = (id) => {
    if (getMeassage) getMeassage(id);
  };

  // Find the active chat object from the real friendList based on selected ID
  // This replaces the old MOCK_CONTACTS lookup
  const activeChat = friedlist?.find(
    (c) => c.friendInformation.id === selectedChatId
  );

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const msg = e.target.message.value.trim();
    if (!msg) return;
    sendMessage(msg);
    e.target.reset();

    // Fix: slight timeout ensures focus stays even if UI updates
    setTimeout(() => e.target.message.focus(), 0);
  };

  return (
    // CSS FIX: used w-full h-full to fill whatever container (modal or page) handles the sizing
    <div
      className="flex w-full h-160  overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-1/3 min-w-[300px] max-w-[400px] bg-white border-r border-gray-200 flex flex-col h-full z-20">
        {/* Sidebar Header */}
        <div className="h-16 bg-gray-50/80 backdrop-blur-sm flex-shrink-0 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
              {/* User Avatar */}
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </div>
            <h2 className="font-semibold text-gray-700 tracking-wide">Chats</h2>
          </div>
          <div className="flex gap-2 text-gray-500">
            <button className="hover:bg-gray-200 p-2 rounded-full transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button className="hover:bg-gray-200 p-2 rounded-full transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100 flex-shrink-0">
          <div className="bg-gray-100 flex items-center rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search chats"
              className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {friedlist?.map((contact) => (
            <div
              key={contact.friendInformation.id || contact.conversationId}
              onClick={() => {
                setSelectedChatId(contact.friendInformation.id);
                setConversationId(contact.conversationId);
                if (onSelectChat) onSelectChat(contact);
              }}
              className={`flex items-center p-3 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200
                ${
                  selectedChatId === contact.friendInformation.id
                    ? "bg-blue-50/60 border-l-4 border-l-blue-500"
                    : "bg-white border-l-4 border-l-transparent"
                }`}
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-sm bg-blue-400`}
                >
                  {contact.friendInformation.name
                    ? contact.friendInformation.name[0].toUpperCase()
                    : "?"}
                </div>
                {/* Online Status (Optional - adds green dot if needed) */}
                {/* <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span> */}
              </div>

              {/* Info */}
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h3
                    className={`font-medium truncate ${
                      selectedChatId === contact.friendInformation.id
                        ? "text-blue-900"
                        : "text-gray-800"
                    }`}
                  >
                    {contact.friendInformation.name}
                  </h3>
                  {/* Time Placeholder */}
                  <span className="text-xs text-gray-400"></span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500 truncate w-4/5 min-h-[1.25em]">
                    {/* Last Message Placeholder */}
                    {contact.friendInformation.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT CHAT WINDOW ================= */}
      <div className="flex-1 flex flex-col h-full bg-[#efe7dd] relative min-w-0">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none z-0"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          }}
        ></div>

        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-16 px-4 bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-between z-20 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  {/* Dynamic Avatar from Active Chat */}
                  {activeChat.friendInformation.name
                    ? activeChat.friendInformation.name[0].toUpperCase()
                    : "C"}
                </div>

                <div className="ml-3">
                  <h2 className="font-semibold text-gray-800 leading-tight">
                    {activeChat.friendInformation.name}
                  </h2>
                  <span className="text-xs text-green-600 font-medium">
                    ● Online
                  </span>
                </div>
              </div>

              <div className="flex gap-4 text-gray-500">
                <button className="hover:text-gray-700 transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="hover:text-gray-700 transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar z-10 scroll-smooth h-screen">
            
               
                  {messages.map((msg, index) => {
                    const isOwn = String(msg.senderId) === String(user.id);

                    return (
                      <div
                        key={index}
                        className={`flex w-full ${
                          isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
              relative max-w-[70%] lg:max-w-[60%] px-3 py-2 text-sm shadow-sm
              ${
                isOwn
                  ? "bg-[#d9fdd3] text-gray-900 rounded-l-lg rounded-tr-lg rounded-br-none"
                  : "bg-white text-gray-900 rounded-r-lg rounded-tl-lg rounded-bl-none"
              }
            `}
                        >
                          <p className="mb-4 leading-relaxed break-words whitespace-pre-wrap">
                            {msg.content}
                          </p>

                          <div className="absolute bottom-1 right-2 flex items-center gap-1">
                            <span className="text-[10px] text-gray-500 min-w-fit">
                              {msg.createdAt
                                ? new Date(msg.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )
                                : ""}
                            </span>

                            {isOwn && (
                              <span className="text-blue-500 text-[11px] font-bold">
                                ✓✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div ref={scrollRef}></div>
                </div>
        

            {/* Input Area */}
            <div className="p-3 bg-gray-50 z-20 border-t border-gray-200 flex-shrink-0">
              <form onSubmit={handleSend} className="flex gap-2 items-center">
                <button
                  type="button"
                  className="text-gray-500 p-2 hover:bg-gray-200 rounded-full transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                <input
                  name="message"
                  required
                  autoComplete="off"
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-green-500 bg-white shadow-sm placeholder-gray-400"
                />

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-full shadow-md transition transform active:scale-95 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 ml-0.5"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#f0f2f5] border-l border-gray-300">
            <div className="w-40 h-40 bg-gray-100 rounded-full mb-6 flex items-center justify-center shadow-inner">
              <svg
                className="w-20 h-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-600 mb-2">
              Welcome to Chat
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              Select a contact from the sidebar to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
