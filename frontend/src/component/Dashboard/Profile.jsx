import { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
  FaCamera,
  FaPlane,
  FaHeart,
  FaStar,
  FaCalendar,
  FaGlobe,
  FaCog,
  FaUpload,
  FaEye,
  FaLock,
  FaBell,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const getInitials = (name) =>
  typeof name === "string"
    ? name
        .trim()
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
    : "";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const currentUser = {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    bio: "Adventure enthusiast and culture explorer. I love discovering hidden gems, trying authentic local food, and connecting with fellow travelers. Currently planning my next big adventure!",
    joinDate: "January 2023",
    profileViews: 156,
    stats: {
      trips: 18,
      countries: 9,
      connections: 45,
      rating: 4.9,
    },
    interests: [
      "Photography",
      "Hiking",
      "Food Tours",
      "Museums",
      "Beach",
      "Adventure Sports",
    ],
    upcomingTrips: [
      { destination: "Iceland", date: "March 2024", status: "Planning" },
      { destination: "Morocco", date: "June 2024", status: "Booked" },
    ],
    recentTrips: [
      {
        destination: "New Zealand",
        date: "Dec 2023",
        image: "/placeholder.svg?height=100&width=150",
        rating: 5,
      },
      {
        destination: "Thailand",
        date: "Sep 2023",
        image: "/placeholder.svg?height=100&width=150",
        rating: 5,
      },
      {
        destination: "Greece",
        date: "Jul 2023",
        image: "/placeholder.svg?height=100&width=150",
        rating: 4,
      },
    ],
    privacy: {
      profileVisibility: "Public",
      showEmail: false,
      showPhone: false,
    },
  };

  if (loading || !user) {
    return (
      <div className="text-stone-900 text-center py-20">Loading Profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20 font-sans">
      {/* --- Hero / Header Section --- */}
      <div className="relative bg-white border-b border-orange-100 shadow-sm">
        {/* Decorative Background Blur */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-50 via-white to-orange-50 opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image with Ring Effect */}
            <div className="relative group shrink-0">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-xl ring-1 ring-orange-100">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl font-bold text-white overflow-hidden relative">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(user.name)
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                    <FaEdit className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left pt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
                    {user.name}
                  </h1>
                  <p className="text-stone-500 font-medium mt-1">
                    Travel Enthusiast & Explorer
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start">
                  <Link
                    to={"/editProfile"}
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-orange-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-medium text-sm"
                  >
                    <FaEdit /> Edit Profile
                  </Link>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-full transition-all duration-300 hover:shadow-md font-medium text-sm">
                    <FaCog /> Settings
                  </button>
                </div>
              </div>

              {/* Meta Data Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-stone-500 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500" />
                  <span>{user.Address?.city || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-orange-500" />
                  <span>Joined {user.createdAt?.slice(0, 4) || "2024"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-orange-500" />
                  <span>{currentUser.profileViews} views</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-stone-600 leading-relaxed max-w-3xl mx-auto md:mx-0 bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                {currentUser.bio ||
                  "No bio yet. Tell the world about your travel dreams!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Content) - Spans 8 cols */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: FaPlane,
                  count: user.travelPlans.length,
                  label: "My Trips",
                },
                {
                  icon: FaGlobe,
                  count: user.createdPlans.length,
                  label: "Created",
                },
                { icon: FaUser, count: 10, label: "Friends" }, // Hardcoded 10 based on input
                { icon: FaStar, count: "4.8", label: "Rating" }, // Placeholder rating
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 hover:border-orange-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mx-auto bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-stone-900 mb-1">
                    {stat.count}
                  </div>
                  <div className="text-stone-400 text-xs font-semibold uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Trips */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-3 text-stone-900">
                  <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <FaCalendar />
                  </span>
                  Upcoming Adventures
                </h3>
                <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline decoration-2 underline-offset-4">
                  + Plan New
                </button>
              </div>

              <div className="space-y-4">
                {currentUser.upcomingTrips.length > 0 ? (
                  currentUser.upcomingTrips.map((trip, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-stone-100 rounded-2xl hover:shadow-lg hover:border-orange-100 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 font-bold group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {trip.destination.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-stone-900">
                            {trip.destination}
                          </h4>
                          <p className="text-stone-500 text-sm flex items-center gap-2">
                            <FaCalendar className="text-xs" /> {trip.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4 sm:mt-0 pl-16 sm:pl-0">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                            trip.status === "Booked"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {trip.status}
                        </span>
                        <button className="text-stone-400 hover:text-orange-500 transition-colors p-2">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-stone-400">
                    No upcoming trips. Time to plan one!
                  </div>
                )}
              </div>
            </div>

            {/* Travel Interests */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-stone-900">
                  <span className="p-2 bg-red-100 text-red-500 rounded-lg">
                    <FaHeart />
                  </span>
                  Travel Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {currentUser.interests.map((interest, index) => (
                  <div key={index} className="group relative">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-full text-sm font-medium hover:border-orange-400 hover:text-orange-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                      {interest}
                      <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                        <FaTrash className="text-xs" />
                      </button>
                    </span>
                  </div>
                ))}
                <button className="px-5 py-2.5 border border-dashed border-stone-300 text-stone-400 hover:text-orange-500 hover:border-orange-400 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2">
                  <FaPlus className="text-xs" /> Add Interest
                </button>
              </div>
            </div>

            {/* Recent Trips Photos */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-stone-900">
                  <span className="p-2 bg-blue-100 text-blue-500 rounded-lg">
                    <FaPlane />
                  </span>
                  Recent Adventures
                </h3>
                <button className="flex items-center gap-2 text-stone-500 hover:text-orange-600 text-sm font-medium transition-colors">
                  <FaUpload /> Add Photos
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentUser.recentTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md cursor-pointer"
                  >
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.destination}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-bold text-white text-lg">
                        {trip.destination}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-stone-300 text-xs">{trip.date}</p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xs ${
                                i < trip.rating
                                  ? "text-yellow-400"
                                  : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) - Spans 4 cols */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-xl shadow-orange-500/20 text-white">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={"/tripCreate"}
                  className="w-full flex items-center gap-3 px-4 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 font-medium border border-white/10"
                >
                  <FaPlus className="text-orange-200" /> Create New Trip
                </Link>
                <Link
                  to="/find-travel-mate"
                  className="w-full flex items-center gap-3 px-4 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 font-medium border border-white/10"
                >
                  <FaUser className="text-orange-200" /> Find Travel Mates
                </Link>
              </div>
            </div>

            {/* Account Settings Menu */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <h3 className="text-lg font-bold mb-4 text-stone-900">
                Settings
              </h3>
              <div className="space-y-2">
                {[
                  { icon: FaUser, label: "Personal Info" },
                  { icon: FaLock, label: "Privacy & Security" },
                  { icon: FaBell, label: "Notifications" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <item.icon className="text-xs" />
                      </div>
                      <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900">
                        {item.label}
                      </span>
                    </div>
                    <FaEdit className="text-stone-300 text-xs group-hover:text-orange-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Status */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <h3 className="text-lg font-bold mb-4 text-stone-900">
                Privacy Status
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Profile Visibility",
                    value: currentUser.privacy.profileVisibility,
                    isBool: false,
                  },
                  {
                    label: "Show Email",
                    value: currentUser.privacy.showEmail,
                    isBool: true,
                  },
                  {
                    label: "Show Phone",
                    value: currentUser.privacy.showPhone,
                    isBool: true,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2"
                  >
                    <span className="text-sm text-stone-500">{item.label}</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded border ${
                        (item.isBool ? item.value : item.value === "Public")
                          ? "bg-green-50 text-green-600 border-green-100"
                          : "bg-red-50 text-red-500 border-red-100"
                      }`}
                    >
                      {item.isBool
                        ? item.value
                          ? "Visible"
                          : "Hidden"
                        : item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 text-stone-400 hover:text-red-500 font-medium text-sm transition-colors flex items-center justify-center gap-2">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
