import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  Heart,
  Clock,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import BookingForm from "../BookingForm";// Adjust the import path as needed


import eat from "../../assets/eat.jpeg";
// Import images from assets
import car from "../../assets/car.jpeg";
import himalayasImg from "../../assets/himalayas.png";


const ExpBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
const experiencesData = {
  "walvis-bay-boat-cruise-adventure": {
    id: 1,
    title: "Walvis Bay Boat Cruise Experience",
    location: "Walvis Bay, Namibia",
    rating: 4.9,
    reviews: 187,
    duration: "3 Hours",
    groupSize: "2-12 People",
    price: "N$1,400",
    newPrice: 1400,
    currency: "N$",
    image: eat,
    description: "Embark on a spectacular 3-hour marine adventure in Walvis Bay Lagoon. Cruise alongside playful dolphins, encounter friendly Cape fur seals, and watch pelicans up close. Indulge in fresh oysters and champagne while enjoying breathtaking views of the bay and surrounding dunes. This unforgettable journey offers the perfect introduction to Namibia's rich marine life.",
    highlights: [
      "Dolphin & Seal Encounters", 
      "Fresh Oyster Tasting with Champagne", 
      "Pelican Feeding Experience", 
      "Marine Wildlife Photography", 
      "Expert Marine Guide Commentary",
      "Scenic Bay & Dune Views"
    ],
    itinerary: [
      { day: 1, title: "Welcome Aboard", detail: "Depart from the Walvis Bay waterfront. Safety briefing and introduction to the crew. Welcome drink served as we set sail into the lagoon." },
      { day: 2, title: "Marine Wildlife Watching", detail: "Cruise to the seal colony at Pelican Point. Watch hundreds of Cape fur seals playing in their natural habitat. Dolphins often join the boat, swimming alongside." },
      { day: 3, title: "Oyster & Champagne Tasting", detail: "Anchor in calm waters for the highlight of the tour - fresh Namibian oysters paired with chilled champagne while pelicans and seals approach the boat." },
      { day: 4, title: "Return Cruise", detail: "Leisurely cruise back to the harbor, spotting flamingos in the shallows and learning about the ecology of Walvis Bay. Disembark with unforgettable memories." }
    ],
    includes: [
      "3-Hour Boat Cruise", 
      "Professional Marine Guide", 
      "Fresh Oysters", 
      "Champagne, Wine & Beer", 
      "Soft Drinks & Water", 
      "Light Lunch", 
      "All Safety Equipment"
    ],
    excludes: [
      "Hotel Transfers", 
      "Personal Travel Insurance", 
      "Gratuities for Crew", 
      "Souvenir Photos"
    ]
  },
  
  "sandwich-harbour-4x4-desert-adventure": {
    id: 2,
    title: "Sandwich Harbour 4X4 Desert Adventure",
    location: "Sandwich Harbour, Namibia",
    rating: 4.8,
    reviews: 203,
    duration: "Half Day",
    groupSize: "4-7 People",
    price: "N$2,800",
    newPrice: 2800,
    currency: "N$",
    image: car,
    description: "Experience the thrill of dune driving on an exhilarating half-day 4x4 tour to Sandwich Harbour. Navigate through towering sand dunes that meet the Atlantic Ocean, witness incredible desert-adapted wildlife, and enjoy a scenic picnic in the dunes. Our experienced guides ensure a safe and unforgettable journey through one of Namibia's most spectacular coastal landscapes, with comfortable 7-seater vehicles never packed to full capacity for your comfort.",
    highlights: [
      "Thrilling Dune Driving Experience", 
      "Sandwich Harbour Lagoon Views", 
      "Scenic Picnic in the Dunes", 
      "Desert-Adapted Wildlife Spotting", 
      "Historic Shipwreck Photography",
      "Flamingo & Bird Watching"
    ],
    itinerary: [
      { day: 1, title: "Departure from Walvis Bay", detail: "Meet your experienced 4x4 guide and depart from Walvis Bay along the scenic coastal road. Briefing on the adventure ahead and vehicle preparation for dune driving." },
      { day: 2, title: "Dune Driving Begins", detail: "Enter the dune belt and experience the thrill of driving on towering sand dunes. Your guide demonstrates proper 4x4 techniques while navigating the challenging terrain." },
      { day: 3, title: "Sandwich Harbour Lagoon", detail: "Arrive at the spectacular Sandwich Harbour lagoon where the dunes meet the ocean. Time for photography and exploration of this unique ecosystem." },
      { day: 4, title: "Picnic in the Dunes", detail: "Enjoy a delicious picnic lunch set up in a scenic dune location with panoramic views. Relax and take in the breathtaking desert landscape." },
      { day: 5, title: "Return Journey", detail: "Explore more of the dune belt on the return journey, with stops for wildlife viewing and photography before arriving back in Walvis Bay." }
    ],
    includes: [
      "Experienced 4x4 Driving Guide", 
      "Comfortable 7-Seater Vehicle", 
      "Picnic Lunch in the Dunes", 
      "Refreshments & Water", 
      "Photo Stops at Key Locations", 
      "Sandboarding (Optional)"
    ],
    excludes: [
      "Hotel Pickup/Drop-off", 
      "Personal Travel Insurance", 
      "Gratuities for Guide", 
      "Alcoholic Beverages"
    ],
    note: "7-seater vehicles - never packed to full capacity for your comfort"
  },
  
  "walvis-bay-kayaking-marine-wildlife": {
    id: 3,
    title: "Walvis Bay Kayaking Marine Wildlife Tour",
    location: "Walvis Bay, Namibia",
    rating: 4.7,
    reviews: 156,
    duration: "Half Day",
    groupSize: "2-8 People",
    price: "N$1,600",
    newPrice: 1600,
    currency: "N$",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    description: "Paddle through the calm waters of Walvis Bay lagoon on an intimate half-day kayaking adventure. Get up close with playful Cape fur seals, watch pelicans glide overhead, and spot flamingos feeding in the shallows. Perfect for beginners and nature lovers alike, this guided tour offers a unique perspective on Namibia's rich marine ecosystem while visiting local oyster farms and enjoying the stunning coastal scenery.",
    highlights: [
      "Kayak Alongside Wild Seals", 
      "Pelican & Flamingo Encounters", 
      "Oyster Farm Visit", 
      "Marine Wildlife Photography", 
      "Beginner-Friendly Instruction",
      "Scenic Lagoon Paddling"
    ],
    itinerary: [
      { day: 1, title: "Meeting & Preparation", detail: "Meet your guide at the Walvis Bay waterfront. Receive your kayaking equipment, safety briefing, and basic paddling instruction. No experience necessary!" },
      { day: 2, title: "Launch into the Lagoon", detail: "Launch into the calm waters of the lagoon and begin paddling toward Pelican Point. The sheltered waters make for easy paddling suitable for all fitness levels." },
      { day: 3, title: "Seal Encounter", detail: "Arrive at the seal colony area where curious juvenile seals often approach kayaks, playing in the water alongside you. An unforgettable wildlife experience!" },
      { day: 4, title: "Oyster Farm Visit", detail: "Paddle past local oyster farms and learn about Namibia's thriving oyster industry. Your guide explains the farming process and ecology of the lagoon." },
      { day: 5, title: "Return Paddle", detail: "Enjoy a leisurely paddle back to the launch point, spotting flamingos, pelicans, and other birdlife along the way. Disembark with incredible memories." }
    ],
    includes: [
      "Professional Kayaking Guide", 
      "All Kayaking Equipment", 
      "Safety Briefing & Instruction", 
      "Life Jackets", 
      "Dry Bags for Personal Items", 
      "Wetsuits (if needed)"
    ],
    excludes: [
      "Hotel Transfers", 
      "Personal Travel Insurance", 
      "Underwater Camera Rental", 
      "Gratuities for Guide", 
      "Meals & Drinks"
    ],
    note: "No experience needed - suitable for beginners"
  }
};

  const experience = experiencesData[slug] || experiencesData["walvis-bay-boat-cruise-adventure"];

  const handleBookNow = () => {
    // Convert the experience data to the format expected by BookingForm
    const packageData = {
      id: experience.id,
      title: experience.title,
      location: experience.location,
      price: experience.newPrice || parseInt(experience.price.replace('N$', '').replace(',', '')),
      newPrice: experience.newPrice || parseInt(experience.price.replace('N$', '').replace(',', '')),
      currency: "N$",
      duration: experience.duration,
      groupSize: experience.groupSize,
      image: experience.image,
      note: experience.note || null
    };
    
    setSelectedPackage(packageData);
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedPackage(null);
  };

  const handleBookingSubmit = (formData) => {
    console.log("Booking submitted:", {
      package: selectedPackage,
      ...formData
    });
    alert(`Thank you for booking ${selectedPackage.title}! We'll contact you shortly to confirm your reservation.`);
    handleCloseBooking();
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      {/* Navigation Header */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-stone-100 shadow-sm">
        <button 
          onClick={() => navigate("/experience")}
          className="flex items-center gap-2 text-stone-600 hover:text-blue-500 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Packages
        </button>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-stone-600" />
          </button>
          <button className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden pt-20">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Bestseller
            </span>
            <div className="flex items-center gap-1 text-white">
              <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
              <span className="font-bold">{experience.rating}</span>
              <span className="opacity-70 text-sm">({experience.reviews} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {experience.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{experience.groupSize}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                Experience Overview
                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-stone-50 rounded-[2rem] p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-8">What makes this special?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experience.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-lg font-medium text-stone-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Itinerary */}
            <div>
              <h2 className="text-3xl font-bold mb-10">Detailed Itinerary</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-stone-100"></div>
                {experience.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-16">
                    <div className="absolute left-0 top-1 w-12 h-12 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg">
                      {item.day}
                    </div>
                    <h4 className="text-2xl font-bold mb-2 text-stone-900">{item.title}</h4>
                    <p className="text-lg text-stone-600 leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes/Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-stone-100 rounded-3xl p-8">
                <h4 className="text-xl font-bold mb-6 text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  What's Included
                </h4>
                <ul className="space-y-4">
                  {experience.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-stone-600 font-medium">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-stone-100 rounded-3xl p-8">
                <h4 className="text-xl font-bold mb-6 text-red-700 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  What's Excluded
                </h4>
                <ul className="space-y-4">
                  {experience.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-stone-600 font-medium">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 bg-white border border-stone-100 shadow-2xl rounded-[2.5rem] p-8 space-y-8 overflow-hidden">
              {/* Highlight background */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
              
              <div className="relative">
                <p className="text-stone-500 font-medium mb-1">Total price for experience</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-stone-900">{experience.price}</span>
                  <span className="text-stone-500 font-medium">/ person</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-stone-50 pt-8">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-stone-700">Select Date</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-stone-300" />
                </div>
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-stone-700">Guests</span>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-lg border border-stone-200 font-bold">2</span>
                </div>
              </div>

              <button 
                onClick={handleBookNow}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Package Now
              </button>
              
              <p className="text-center text-stone-500 text-sm font-medium">
                Free cancellation up to 48 hours before
              </p>

              <div className="space-y-4 pt-4 border-t border-stone-50">
                <div className="flex items-center gap-3 text-stone-600">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Secure Payments Verified</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Pay in installments up to 12 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <BookingForm
          selectedPackage={selectedPackage}
          onClose={handleCloseBooking}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default ExpBlog;