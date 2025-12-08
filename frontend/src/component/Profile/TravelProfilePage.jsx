import React, { useState } from "react";
import {
  Edit3,
  Camera,
  MessageCircle,
  Award,
  Compass,
  Mountain,
} from "lucide-react";

const TravelProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Compass },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header Profile */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-6 text-white shadow-2xl shadow-emerald-500/25 mb-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-2 right-2 opacity-10">
            <Compass className="w-20 h-20 transform rotate-12" />
          </div>
          <div className="relative z-10 flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl p-1">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  AR
                </div>
              </div>
              <button className="absolute -bottom-1 -right-1 p-1.5 bg-white text-emerald-600 rounded-lg shadow-lg hover:shadow-xl transition-all group-hover:scale-110">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">Traveler Name</h1>
              <div className="flex items-center space-x-3 text-white/90 text-sm mb-2">
                <span>🎂 Age</span>
                <span>📍 Location</span>
              </div>
              <p className="text-white/95 mb-2">
                Short traveler bio goes here...
              </p>
              <p className="text-white/70 text-sm">Joined Year</p>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-lg font-bold">0</div>
                  <div className="text-xs text-white/80">Adventures</div>
                </div>
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-lg font-bold">0</div>
                  <div className="text-xs text-white/80">Countries</div>
                </div>
                <div className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="text-lg font-bold">0.0</div>
                  <div className="text-xs text-white/80">Rating</div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all hover:scale-105">
              <Edit3 className="w-4 h-4" />
              <span className="font-semibold text-sm">Edit</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-xl border border-emerald-500/20 mb-6 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-semibold text-sm transition-all
                  ${
                    activeTab === tab.id
                      ? "text-emerald-300 bg-emerald-500/10"
                      : "text-gray-300 hover:text-emerald-300 hover:bg-emerald-500/10"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/*overview, review & achievements*/}
        {activeTab === "overview" && (
          <div className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/10 shadow-xl mb-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Recent Journeys
                </h3>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                Latest Updates
              </div>
            </div>

            {/* Journey Card */}
            <div className="relative border-l-4 border-emerald-500/20 pl-6 ml-2">
              <div className="relative group">
                <div className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-4 border-slate-900"></div>
                <div className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center text-lg border border-emerald-400/20">
                        🌍
                      </div>
                      <h4 className="text-white font-semibold text-lg">
                        Sample Place
                      </h4>
                    </div>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                      Sample Time
                    </span>
                  </div>
                  <p className="text-sm text-emerald-300 italic">
                    Sample journey action or description
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-slate-800/70 rounded-2xl p-6 mb-6 border border-white/10 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Traveler Reviews</span>
            </h3>
            <div className="bg-slate-900/50 rounded-xl p-4 text-white/80">
              <p className="italic">
                "Amazing adventure, unforgettable experience!"
              </p>
              <div className="text-sm text-right text-gray-400 mt-2">
                – Reviewer Name
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="bg-slate-800/70 rounded-2xl p-6 mb-6 border border-white/10 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Achievements</span>
            </h3>
            <div className="bg-slate-900/50 rounded-xl p-4 text-white/90">
              <p className="font-semibold">🌟 Top Explorer Badge</p>
              <p className="text-sm text-gray-400">
                Awarded for exploring 10+ countries.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelProfilePage;
