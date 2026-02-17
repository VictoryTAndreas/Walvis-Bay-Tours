import React, { useState, useEffect } from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendar, FaUsers, FaComment, FaBox } from "react-icons/fa";
import { Star, MapPin, Clock, Users as LucideUsers, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logo from "/src/assets/logo.png";

// Your EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_o3ejxng';
const EMAILJS_TEMPLATE_ID = 'template_uakit0e';
const EMAILJS_PUBLIC_KEY = 'pWuBuEqzbPQ8JJFQq';
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_3z0fsfs';

// Import the travel packages data (you can also pass this as a prop)
const travelPackages = [
  {
    id: 1,
    destination: "Walvis Bay, Namibia",
    title: "Walvis Bay Boat Cruise",
    price: 1400,
    originalPrice: 0,
    currency: "N$",
    duration: "3 Hours",
    groupSize: "2-12 People",
    rating: 4.9,
    reviews: 187,
    departure: "Daily - Year Round",
    includes: ["Light Lunch", "Fresh Oysters", "Champagne", "Wine & Beer", "Cooldrink", "Professional Guide"],
    highlights: ["Dolphin Watching", "Pelican Encounter", "Cape Fur Seals", "Marine Life", "Scenic Bay Views", "Oyster Tasting"],
    optionalExtras: ["Photography Package", "Sunset Cruise Add-on", "Private Charter"],
    difficulty: "Easy",
    category: "Marine & Luxury",
    discount: 0,
    featured: true,
  },
  {
    id: 2,
    destination: "Sandwich Harbour, Namibia",
    title: "Sandwich Harbour 4X4 Tour",
    price: 2800,
    originalPrice: 0,
    currency: "N$",
    duration: "Half Day",
    groupSize: "4-7 People",
    rating: 4.8,
    reviews: 203,
    departure: "Daily - Year Round",
    includes: [
      "Experienced 4x4 Driving Guide", 
      "Picnic in the Dunes", 
      "Comfortable Transport", 
      "Photo Stops", 
      "Refreshments"
    ],
    highlights: [
      "Sandwich Harbour Lagoon", 
      "Dune Driving Experience", 
      "Walvis Bay Wetlands", 
      "Desert Adaptations", 
      "Shipwreck Views",
      "Flamingo Sightings"
    ],
    optionalExtras: [
      "Breakfast Package", 
      "Drone Photography", 
      "Private Tour Upgrade",
      "Sunset Option"
    ],
    difficulty: "Moderate",
    category: "Adventure & Desert",
    discount: 0,
    featured: true,
    note: "7-seater vehicles - never packed to full capacity for your comfort"
  },
  {
    id: 3,
    destination: "Walvis Bay, Namibia",
    title: "Kayaking Adventure",
    price: 1600,
    originalPrice: 0,
    currency: "N$",
    duration: "Half Day",
    groupSize: "2-8 People",
    rating: 4.7,
    reviews: 156,
    departure: "Daily - Year Round",
    includes: [
      "Kayaking Equipment", 
      "Professional Guide", 
      "Safety Briefing", 
      "Life Jackets", 
      "Dry Bags",
      "Wetsuit (if needed)"
    ],
    highlights: [
      "Paddle with Cape Fur Seals", 
      "Pelican Sightings", 
      "Flamingo Viewing", 
      "Oyster Farms Tour", 
      "Marine Wildlife",
      "Lagoon Scenery"
    ],
    optionalExtras: [
      "Underwater Camera Hire", 
      "Photography Package", 
      "Breakfast Add-on",
      "Private Guide"
    ],
    difficulty: "Easy",
    category: "Adventure & Marine",
    discount: 0,
    featured: false,
    note: "No experience needed - suitable for beginners"
  },
];

const BookingForm = ({ selectedPackage: initialPackage, onClose, onSubmit }) => {
  const [selectedPkg, setSelectedPkg] = useState(initialPackage || null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    participants: "2",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle package selection from dropdown
  const handlePackageChange = (e) => {
    const packageId = parseInt(e.target.value);
    const pkg = travelPackages.find(p => p.id === packageId);
    setSelectedPkg(pkg);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate a random booking reference
  const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'WBT-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPkg) {
      alert('Please select a package');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const participantsCount = parseInt(formData.participants);
      const totalPrice = selectedPkg.price * participantsCount;
      
      const now = new Date();
      const bookingDate = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const bookingTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      const bookingReference = generateBookingReference();

      const templateParams = {
        name: "Admin",
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        package_name: selectedPkg.title,
        location: selectedPkg.destination,
        price_per_person: selectedPkg.price,
        participants: formData.participants,
        total_price: totalPrice,
        date: formData.date,
        special_requests: formData.specialRequests || 'No special requests',
        booking_reference: bookingReference,
        booking_date: bookingDate,
        booking_time: bookingTime,
        duration: selectedPkg.duration,
        difficulty: selectedPkg.difficulty
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      alert(`Booking confirmed! Your reference number is ${bookingReference}. We will contact you soon.`);
      
      onSubmit(formData);
      onClose();
      
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('If you did not recieve confirmation email. Please try again or contact us directly (0812664189).');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl shadow-2xl w-full max-w-2xl relative border border-blue-500/30 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 backdrop-blur-sm rounded-full text-gray-300 hover:text-white hover:bg-blue-600/60 transition-all duration-300 border border-white/10"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Form Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-amber-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Book Your Adventure</h2>
          <p className="text-blue-100">Fill in your details to confirm booking</p>
          <div className="absolute top-4 right-16 w-12 h-12 p-2 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <img 
              src={logo}
              alt="Walvis Bay Tours Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Package Selection Dropdown - Show if no package selected */}
          {!initialPackage && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaBox className="inline mr-2 text-blue-400" />
                Select Package *
              </label>
              <select
                onChange={handlePackageChange}
                value={selectedPkg?.id || ""}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              >
                <option value="" className="bg-stone-800">-- Choose a package --</option>
                {travelPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id} className="bg-stone-800">
                    {pkg.title} - {pkg.currency}{pkg.price} ({pkg.duration})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Selected Package Summary - Only show if package is selected */}
          {selectedPkg && (
            <div className="bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-xl p-4 mb-6 border border-blue-500/30">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-400">Selected Package</p>
                  <p className="font-semibold text-white text-lg">{selectedPkg.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <p className="text-xs text-gray-300">{selectedPkg.destination}</p>
                  </div>
                </div>
                {selectedPkg.featured && (
                  <div className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    FEATURED
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                <div className="text-center">
                  <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="text-sm font-medium text-white">{selectedPkg.duration}</p>
                </div>
                <div className="text-center">
                  <LucideUsers className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Group</p>
                  <p className="text-sm font-medium text-white">{selectedPkg.groupSize}</p>
                </div>
                <div className="text-center">
                  <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1 fill-current" />
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="text-sm font-medium text-white">{selectedPkg.rating}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <FaUser className="inline mr-2 text-blue-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <FaEnvelope className="inline mr-2 text-blue-400" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-orange-500 transition disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <FaPhone className="inline mr-2 text-blue-400" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                placeholder="+264 XX XXX XXXX"
              />
            </div>

            {/* Date and Participants Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <FaCalendar className="inline mr-2 text-blue-400" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={minDate}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                />
              </div>

              {/* Number of Participants */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <FaUsers className="inline mr-2 text-blue-400" />
                  Participants *
                </label>
                <select
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-stone-800">
                      {i + 1} {i === 0 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <FaComment className="inline mr-2 text-blue-400" />
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
                placeholder="Any dietary requirements, medical conditions, or special requests..."
              ></textarea>
            </div>

            {/* Total Price Calculation - Only show if package selected */}
            {selectedPkg && (
              <div className="bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-400">
                    N${(selectedPkg.price * parseInt(formData.participants || 1)).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  For {formData.participants} {parseInt(formData.participants) === 1 ? 'person' : 'people'}
                </p>
                {selectedPkg.note && (
                  <p className="text-xs text-amber-400 mt-2 italic border-t border-white/10 pt-2">
                    {selectedPkg.note}
                  </p>
                )}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !selectedPkg}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;