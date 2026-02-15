import React, { useState } from "react";
import { FaTimes, FaAward, FaUser, FaEnvelope, FaPhone, FaCalendar, FaUsers, FaComment } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import logo from "/src/assets/logo.png";
// Your EmailJS credentials (get these from your dashboard)
const EMAILJS_SERVICE_ID = 'service_o3ejxng'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_uakit0e'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'pWuBuEqzbPQ8JJFQq'; // Replace with your Public Key
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_3z0fsfs';
const BookingForm = ({ selectedPackage, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    participants: "2",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      // Calculate total price
      const participantsCount = parseInt(formData.participants);
      const totalPrice = selectedPackage.newPrice * participantsCount;
      
      // Get current date and time
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

      // Generate booking reference
      const bookingReference = generateBookingReference();

      // Prepare email parameters with ALL details
      const templateParams = {
        // Your name (from EmailJS template)
        name: "Admin", // This can be dynamic if you want
        
        // Customer details
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        
        // Package details
        package_name: selectedPackage.title,
        location: selectedPackage.location,
        price_per_person: selectedPackage.newPrice,
        participants: formData.participants,
        total_price: totalPrice,
        date: formData.date,
        
        // Special requests
        special_requests: formData.specialRequests || 'No special requests',
        
        // Booking metadata
        booking_reference: bookingReference,
        booking_date: bookingDate,
        booking_time: bookingTime
      };

      // Send email notification
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
      // Show success message
      alert(`Booking confirmed! Your reference number is ${bookingReference}. We will contact you soon.`);
      
      // Call the parent onSubmit handler
      onSubmit(formData);
      
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('There was an error sending your booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date for min date in date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh] border border-blue-500/30">
        
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
          <p className="text-blue-100">{selectedPackage.title}</p>
          <div className="w-10 h-10 p-1 bg-white rounded-xl flex items-center justify-center 
                group-hover:rotate-12 transition-transform duration-300">
  <img 
    src={logo}
    alt="Walvis Bay Tours Logo"
    className="w-full h-full object-cover rounded-lg"
  />
</div>

        </div>

        {/* Form Body */}
        <div className="p-6 pt-10">
          {/* Package Summary */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Selected Package</p>
                <p className="font-semibold text-white">{selectedPackage.title}</p>
                <p className="text-xs text-gray-400">{selectedPackage.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Price</p>
                <p className="text-xl font-bold text-blue-400">N${selectedPackage.newPrice}</p>
                <p className="text-xs text-gray-400">per person</p>
              </div>
            </div>
            {selectedPackage.note && (
              <p className="text-xs text-blue-300 mt-2 italic border-t border-white/10 pt-2">
                {selectedPackage.note}
              </p>
            )}
          </div>

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

            {/* Total Price Calculation */}
            <div className="bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Price:</span>
                <span className="text-2xl font-bold text-blue-400">
                  N${(selectedPackage.newPrice * parseInt(formData.participants || 1)).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                For {formData.participants} {parseInt(formData.participants) === 1 ? 'person' : 'people'}
              </p>
            </div>

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
                disabled={isSubmitting}
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