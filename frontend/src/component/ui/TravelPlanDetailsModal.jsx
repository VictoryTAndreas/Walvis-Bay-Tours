import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Compass,
  TrendingUp,
  Timer,
  X,
  Share2,
  Heart,
  MessageCircle,
  CheckCircle,
  MessageCircleCodeIcon,
  MessageCircleCode,
  SendToBackIcon,
  Send,
  GitPullRequest,
  UserCircle,
  Users2Icon,
} from "lucide-react";

import { toast } from "react-toastify";

const TravelPlanDetailsModal = ({ plan, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const token = localStorage.getItem("token");

  const sendRequest = async (receiverId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/friend/${receiverId}`,
        {},
        { headers: { authorization: token } }
      );

      if (response) toast.success("Friend request send succfully");
    } catch (error) {
      toast.success("Something went wrong !!!");
    }
  };

  const getInitials = (name) =>
    typeof name === "string"
      ? name
          .trim()
          .split(" ")
          .map((n) => n[0]?.toUpperCase())
          .join("")
      : "";

  const getMemberStatus = (member) => {
    if (member.user?.sender && member.user.sender.length > 0) {
      return member.user.sender[0].isAccepted ? "accepted" : "pending";
    }
    return "member";
  };

  const getMemberCities = () => {
    const cities =
      plan.members
        ?.map((member) => member.user?.Address?.city)
        .filter(Boolean) || [];
    return [...new Set(cities)];
  };

  const acceptedMembers = (plan.members || []).filter(
    (m) => getMemberStatus(m) === "accepted"
  ).length;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "from-green-400 to-green-600";
      case "medium":
        return "from-yellow-400 to-yellow-600";
      case "hard":
        return "from-red-400 to-red-600";
      default:
        return "from-stone-400 to-stone-600";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 flex items-center justify-between border-b border-orange-400 shadow-lg">
          <h2 className="text-2xl font-bold text-white">Trip Details</h2>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Hero Section */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            {plan.image ? (
              <img
                src={plan.image}
                alt={plan.destination}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <MapPin size={64} className="text-white/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                {plan.destination}
              </h1>
              <p className="text-white/90 text-lg drop-shadow-lg">
                Led by{" "}
                <span className="font-semibold text-white">
                  {plan.user?.name}
                </span>
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-500 rounded-lg p-2">
                  <Calendar size={20} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-stone-600 uppercase">
                  Date
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                {formatDate(plan.travelDate)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 rounded-lg p-2">
                  <Clock size={20} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-stone-600 uppercase">
                  Time
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                {plan.timeSlot}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500 rounded-lg p-2">
                  <Users size={20} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-stone-600 uppercase">
                  Capacity
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                {plan.members?.length || 0}/{plan.grpSize}
              </p>
            </div>

            <div
              className={`bg-gradient-to-br ${getDifficultyColor(
                plan.Difficulty
              )} bg-opacity-10 rounded-2xl p-4 border border-current border-opacity-20`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`bg-gradient-to-r ${getDifficultyColor(
                    plan.Difficulty
                  )} rounded-lg p-2`}
                >
                  <TrendingUp size={20} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-stone-600 uppercase">
                  Level
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                {plan.Difficulty}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <Compass size={24} className="text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-stone-600 font-medium mb-1">
                Category
              </p>
              <p className="font-bold text-stone-900">{plan.Categories}</p>
            </div>

            <div className="text-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <Timer size={24} className="text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-stone-600 font-medium mb-1">
                Duration
              </p>
              <p className="font-bold text-stone-900 capitalize">
                {plan.Duration}
              </p>
            </div>

            <div className="text-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
              <p className="text-xs text-stone-600 font-medium mb-1">Age</p>
              <p className="font-bold text-stone-900">
                {plan.minAge}-{plan.maxAge}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stone-900">
              About This Trip
            </h3>
            <p className="text-stone-600 leading-relaxed text-base">
              {plan.decp}
            </p>
          </div>

          {/* Departure Cities */}
          {getMemberCities().length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <MapPin size={20} className="text-orange-500" />
                Departure Cities
              </h3>
              <div className="flex flex-wrap gap-3">
                {getMemberCities().map((city, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full font-semibold text-sm border border-orange-300 shadow-sm"
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members Section */}
          <div className="space-y-4 bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-6 border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Users size={20} className="text-orange-500" />
                Travel Buddies
              </h3>
              <span className="text-sm font-semibold text-stone-600">
                {acceptedMembers} confirmed
              </span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {plan.members && plan.members.length > 0 ? (
                plan.members.map((member, ind) => {
                  const status = getMemberStatus(member);
                  return (
                    <div
                      key={ind}
                      className="flex items-center justify-between  p-4 bg-white rounded-xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between w-full py-2">
                        {/* LEFT SIDE — Profile + Name */}
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-orange-200 rounded-full text-white w-12 h-12 flex justify-center items-center font-bold shadow-md">
                            {getInitials(member.user?.name || "")}
                          </div>

                          <div>
                            <p className="font-semibold text-stone-900">
                              {member.user?.name}
                            </p>
                            {member.user?.Address?.city && (
                              <p className="text-xs text-stone-500">
                                From {member.user.Address.city}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* RIGHT SIDE — Buttons */}
                        {(() => {
                          const received = member?.user?.receivedRequests ?? [];
                          const sent = member?.user?.sentRequests ?? [];

                          const isFriend =
                            received.some((r) => r.isAccepted) ||
                            sent.some((r) => r.isAccepted);

                          const isPending =
                            received.length > 0 || sent.length > 0;

                          if (isFriend) {
                            return (
                              <button className="bg-green-500 rounded p-4 hover:scale-110 transition duration-300">
                                <Users2Icon />
                              </button>
                            );
                          }

                          if (isPending) {
                            return (
                              <button className="bg-orange-500 p-4 rounded hover:scale-110 transition duration-300">
                                Pending
                              </button>
                            );
                          }

                          return (
                            <button
                              className="bg-green-500  p-4 rounded hover:scale-110 transition duration-300"
                              onClick={() => sendRequest(member.user.id)}
                            >
                              <Send />
                            </button>
                          );
                        })()}
                      </div>

                      {status === "accepted" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-xs font-semibold text-green-700">
                            Confirmed
                          </span>
                        </div>
                      )}
                      {status === "pending" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
                          <Clock size={14} className="text-yellow-600" />
                          <span className="text-xs font-semibold text-yellow-700">
                            Pending
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-stone-500 text-center py-8">
                  No members yet. Be the first to join!
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-all">
              <Heart size={18} />
              Save
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-all">
              <Share2 size={18} />
              Share
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl transition-all">
              <MessageCircle size={18} />
              Message
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-4 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanDetailsModal;
