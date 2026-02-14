import React from "react";
import { FaBookmark, FaShip, FaCompass, FaWater, FaAward, FaClock, FaUsers } from "react-icons/fa";

const offers = [
  {
    id: 1,
    title: "Boat Cruise Experience",
    location: "Walvis Bay, Namibia",
    image: "https://images.unsplash.com/photo-1548579142-4880f5fa13c4?w=500&h=300&fit=crop",
    oldPrice: 1800,
    newPrice: 1400,
    discount: 22,
    duration: "3 Hours",
    groupSize: "2-12 People",
    rating: 4.9,
    category: "Marine & Luxury",
    featured: true,
    includes: ["Oysters", "Champagne", "Light Lunch"]
  },
  {
    id: 2,
    title: "Sandwich Harbour 4X4 Tour",
    location: "Sandwich Harbour, Namibia",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&h=300&fit=crop",
    oldPrice: 3200,
    newPrice: 2800,
    discount: 13,
    duration: "Half Day",
    groupSize: "4-7 People",
    rating: 4.8,
    category: "Adventure & Desert",
    featured: true,
    note: "7-seater vehicles - comfort guaranteed",
    includes: ["Picnic Lunch", "Expert Guide", "Dune Driving"]
  },
  {
    id: 3,
    title: "Kayaking Adventure",
    location: "Walvis Bay, Namibia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    oldPrice: 1900,
    newPrice: 1600,
    discount: 16,
    duration: "Half Day",
    groupSize: "2-8 People",
    rating: 4.7,
    category: "Adventure & Marine",
    featured: false,
    includes: ["Kayak with Seals", "Equipment", "Guide"]
  },
  {
    id: 4,
    title: "Boat Cruise & Kayaking Combo",
    location: "Walvis Bay, Namibia",
    image: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=500&h=300&fit=crop",
    oldPrice: 3400,
    newPrice: 2800,
    discount: 18,
    duration: "Full Day",
    groupSize: "2-8 People",
    rating: 4.9,
    category: "Marine Adventure",
    featured: true,
    includes: ["Both Tours", "Lunch", "All Equipment"]
  },
  {
    id: 5,
    title: "4X4 & Kayaking Ultimate Combo",
    location: "Walvis Bay, Namibia",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=500&h=300&fit=crop",
    oldPrice: 4800,
    newPrice: 4000,
    discount: 17,
    duration: "Full Day",
    groupSize: "4-7 People",
    rating: 4.9,
    category: "Ultimate Adventure",
    featured: true,
    includes: ["Desert & Ocean", "Picnic", "All Activities"]
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white px-6 py-10">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg mr-4">
            <FaAward className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Exclusive Offers
          </h1>
        </div>
        <p className="text-gray-300 max-w-xl mx-auto mt-2 text-lg">
          Limited-time deals on unforgettable Namibian adventures. Book now and save!
        </p>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16 xl:px-32 mx-auto">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 ease-in-out relative border border-white/10 hover:border-orange-500/30"
          >
            {/* Image Section */}
            <div className="relative">
              <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
              
              {/* Sale Tag */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {offer.discount}% OFF
              </div>

              {/* Featured Badge */}
              {offer.featured && (
                <div className="absolute top-3 left-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  FEATURED
                </div>
              )}

              {/* Bookmark Icon */}
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-orange-500/60 transition-all duration-300">
                <FaBookmark className="text-white text-sm" />
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-white text-xs font-bold">{offer.rating}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-white">{offer.title}</h2>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">{offer.location}</p>

              {/* Duration & Group Size */}
              <div className="flex items-center gap-4 mb-3 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <FaClock className="text-orange-400" />
                  <span>{offer.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUsers className="text-orange-400" />
                  <span>{offer.groupSize}</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                  {offer.category}
                </span>
              </div>

              {/* Quick Includes */}
              <div className="flex flex-wrap gap-1 mb-4">
                {offer.includes.map((item, idx) => (
                  <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                    {item}
                  </span>
                ))}
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-red-400 line-through text-sm">N${offer.oldPrice}</span>
                <span className="text-white font-bold text-2xl">N${offer.newPrice}</span>
                <span className="text-emerald-400 text-sm font-medium">per person</span>
              </div>

              {/* Special Note */}
              {offer.note && (
                <p className="text-xs text-orange-300 mb-3 italic">{offer.note}</p>
              )}

              <button className="w-full mt-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Offer →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-400">
          *All offers are valid for 2026 packages. Terms and conditions apply.
        </p>
      </div>
    </div>
  );
}