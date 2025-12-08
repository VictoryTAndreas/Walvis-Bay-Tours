import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EnhancedTravelPlan from "./ui/TravelPlan";
import Planmember from "./FriendsPage/Planmember";
import LoadingEffect from "./ui/LoadingEffect";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Clock,
  RotateCcw,
  Filter,
} from "lucide-react";

const FindTravelmate = () => {
  const token = localStorage.getItem("token");

  // State
  const [travelDate, setTravelDate] = useState("");
  const [destination, setDestination] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [allPlans, setAllPlans] = useState([]);
  const [plan, setPlan] = useState([]);
  const [memberPage, setmemberPage] = useState(false);
  const [members, setMemberData] = useState([]);
  const [isPlan, setCurPlan] = useState(true);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // --- Auth Check ---
  useEffect(() => {
    if (!loading && !user) {
      toast.success("Login is required.");
      navigate("/signin");
    }
  }, [user, navigate, loading]);

  // --- Data Fetching ---
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/plans`,
          { headers: { authorization: token } }
        );
        // Ensure we handle the response correctly
        const plans = response.data.notJoinedPlans || [];
        setPlan(plans);
        setAllPlans(plans);
        setCurPlan(false);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        setCurPlan(false);
      }
    }

    if (user) fetchUser();
  }, [user, token]);

  // --- Handlers ---
  const handleApplyFilters = () => {
    const filtered = allPlans.filter((p) => {
      const destinationMatch =
        !destination ||
        p.destination.toLowerCase().includes(destination.toLowerCase());
      const dateMatch =
        !travelDate ||
        new Date(p.travelDate).toISOString().split("T")[0] === travelDate;
      // Note: You might want to add logic for Group Size and Duration filtering here if your API/Data supports it
      return destinationMatch && dateMatch;
    });
    setPlan(filtered);
    toast.info(`Found ${filtered.length} plans`);
  };

  const handleReset = () => {
    setDestination("");
    setTravelDate("");
    setTripDuration("");
    setGroupSize("");
    setPlan(allPlans);
  };

  const HandleJoinPlan = async (planId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/plans/${planId}`,
        {},
        { headers: { authorization: token } }
      );
      if (response) toast.success("Request sent successfully");
    } catch (error) {
      toast.error("Something went wrong joining the plan.");
    }
  };

  const OpenMemberPage = (members) => {
    setmemberPage(true);
    setMemberData(members);
  };

  const sendRequest = async (recieverId) => {
    try {
      const addFriend = await axios.post(
        `${import.meta.env.VITE_API_URL}/friend/${recieverId}`,
        {},
        { headers: { authorization: token } }
      );
      if (addFriend) toast.success("Friend request sent!");
    } catch (error) {
      toast.error("Something went wrong sending request.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (isPlan) return <LoadingEffect />;

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      {/* --- 1. Compact Hero Section --- */}
      {/* Reduced padding significantly (pt-24 instead of pt-32) and removed bottom margin */}
      <div className="bg-white pt-24 pb-12 px-6 border-b border-stone-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl uppercase md:text-5xl font-extrabold tracking-tight text-stone-900">
            Find Your Next <span className="text-orange-500">Travel Mate</span>
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            Connect with travelers, share costs, and make memories.
          </p>
        </div>
      </div>

      {/* --- 2. Floating/Sticky Filter Bar --- */}
      {/* This sticks to the top 20px when scrolling */}
      <div className="sticky top-4 z-40 px-4 -mt-8 mb-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 p-2 md:p-3">
          {/* Desktop/Tablet Layout: Single Row */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* Destination Input */}
            <div className="relative flex-1 w-full group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 hover:bg-stone-100 focus:bg-white rounded-xl text-sm font-medium outline-none border border-transparent focus:border-orange-200 transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Hidden on mobile unless expanded (Simple toggle logic could be added here) */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {/* Date */}
              <div className="relative min-w-[140px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <Calendar size={16} />
                </div>
                <input // Changed to text type on focus or keep date depending on preference
                  type="date"
                  className="w-full pl-9 pr-3 py-3 bg-stone-50 hover:bg-stone-100 rounded-xl text-sm font-medium outline-none text-stone-600 cursor-pointer border border-transparent focus:border-orange-200"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>

              {/* Duration Select */}
              <div className="relative min-w-[130px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <Clock size={16} />
                </div>
                <select
                  className="w-full pl-9 pr-8 py-3 bg-stone-50 hover:bg-stone-100 rounded-xl text-sm font-medium outline-none appearance-none text-stone-600 border border-transparent focus:border-orange-200 cursor-pointer"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(e.target.value)}
                >
                  <option value="">Duration</option>
                  <option value="Weekend">Weekend</option>
                  <option value="1 Week">1 Week</option>
                  <option value="1 Month">1 Month</option>
                </select>
              </div>

              {/* Group Size Select */}
              <div className="relative min-w-[120px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <Users size={16} />
                </div>
                <select
                  className="w-full pl-9 pr-8 py-3 bg-stone-50 hover:bg-stone-100 rounded-xl text-sm font-medium outline-none appearance-none text-stone-600 border border-transparent focus:border-orange-200 cursor-pointer"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                >
                  <option value="">Size</option>
                  <option value="solo">Solo</option>
                  <option value="small">2-4</option>
                  <option value="medium">5-8</option>
                  <option value="large">9+</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleReset}
                className="p-3 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={handleApplyFilters}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-stone-900 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-stone-200"
              >
                <Search size={18} />
                <span className="md:hidden">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Results Grid --- */}
      <div className=" px-6 py-5 min-h-screen  ">
        {/* Optional: Results Count */}
        <div className="flex items-center justify-between mb-6 text-sm text-stone-500">
          <span>Showing {plan.length} active trips</span>
          {/* You could add a sort dropdown here */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {plan.length > 0 ? (
            plan.map((p, idx) => (
              // wrapper ensures centering; h-full to let card stretch
              <div key={idx} className="flex justify-center h-full min-w-0">
                <div className="w-full max-w-[440px]">
                  {" "}
                  {/* optional max width for nicer columns */}
                  <EnhancedTravelPlan
                    plan={p}
                    handlePlan={HandleJoinPlan}
                    msg={"Join Plan"}
                    OpenMemberPage={() => OpenMemberPage(p)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={24} className="text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900">
                No plans found
              </h3>
              <p className="text-stone-500">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 text-orange-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Member Modal --- */}
      {memberPage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setmemberPage(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Planmember members={members} sendRequest={sendRequest} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTravelmate;
