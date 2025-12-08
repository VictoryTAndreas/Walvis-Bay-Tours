import React from "react";
import {
  User,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const FriendCard = ({
  user,
  conversationId,
  message,
  handelrequest,
  ChatHandler,
}) => {

 
  const handelOnclick = () => {
    ChatHandler(conversationId);
    handelrequest(user.id);
  };
  return (
    <div className="group relative">
      <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
        {/* Hero section with gradient background */}
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Profile header */}
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-lg flex items-center justify-center shadow-lg ring-2 ring-white/30">
                {getInitials(user.name)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime-400 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1 truncate">
                {user.name}
              </h3>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {user.Address?.city || "Unknown Location"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          {/* Email section */}
          <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-stone-700">Email</span>
            </div>
            <p className="text-stone-900 font-medium">{user.email}</p>
          </div>

          {/* Address details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-medium text-stone-600 uppercase tracking-wide">
                  Country
                </span>
              </div>
              <p className="text-stone-900 font-semibold">
                {user.Address?.country || "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-medium text-stone-600 uppercase tracking-wide">
                  Pincode
                </span>
              </div>
              <p className="text-stone-900 font-semibold">
                {user.Address?.pincode || "N/A"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg active:scale-95"
              onClick={handelOnclick}
            >
              {/* <MessageCircleCode className="w-4 h-4" /> */}
              <span>{message}</span>
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-lime-950 text-white font-semibold shadow-md transition-all duration-200 hover:bg-lime-900 hover:shadow-lg active:scale-95">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FriendCard;
