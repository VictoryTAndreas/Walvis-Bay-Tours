"use client"
import { useState, useEffect, useRef } from "react"
import { Star, Calendar, Users, MapPin, Heart, Plane, Mountain, Waves, TreePine, Sun, X, CheckCircle, Info, Clock, Award, Sparkles } from 'lucide-react'
import BookingForm from "./BookingForm";
import boatCruiseImg from "../assets/boat.jpeg";
import sandWichImg from "../assets/sandwich.jpeg";
import kayaking from "../assets/kayaking.jpg";

const TravelPackageCards = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [favorites, setFavorites] = useState(new Set())
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const containerRef = useRef(null)
  
  const travelPackages = [
   {
  id: 1,
  destination: "Walvis Bay, Namibia",
  title: "Walvis Bay Boat Cruise",
  price: 1400,
  originalPrice: 0, // Change from null to 0
  currency: "N$",
  duration: "3 Hours",
  groupSize: "2-12 People",
  image: boatCruiseImg,
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
}
,
    {
  id: 2,
  destination: "Sandwich Harbour, Namibia",
  title: "Sandwich Harbour 4X4 Tour",
  price: 2800,
  originalPrice: 0,
  currency: "N$",
  duration: "Half Day",
  groupSize: "4-7 People",
  image: sandWichImg,
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
  image: kayaking,
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
    
  ]

  // Duplicate packages for infinite scroll effect
  const infinitePackages = [...travelPackages, ...travelPackages]

  const toggleFavorite = (packageId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      newFavorites.has(packageId) ? newFavorites.delete(packageId) : newFavorites.add(packageId)
      return newFavorites
    })
  }

  const getCategoryIcon = (category) => {
    if (category.includes("Beach")) return <Waves className="w-3 h-3" />
    if (category.includes("Adventure")) return <Mountain className="w-3 h-3" />
    if (category.includes("Nature")) return <TreePine className="w-3 h-3" />
    if (category.includes("Hill")) return <Mountain className="w-3 h-3" />
    return <Sun className="w-3 h-3" />
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-400 bg-green-500/20 border-green-500/30"
      case "Moderate": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "Hard": return "text-red-400 bg-red-500/20 border-red-500/30"
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  // Auto-scrolling effect
  useEffect(() => {
    const container = containerRef.current
    if (!isAutoPlaying || !container) return

    const scrollStep = 2.5 // Adjust for speed
    let animationFrame

    const scroll = () => {
      container.scrollLeft += scrollStep
      // Reset scroll position when it reaches the end of the first duplicated set
      if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
        container.scrollLeft = container.scrollWidth / 3
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrame)
  }, [isAutoPlaying])

  // Initialize scroll position to the start of the second set of packages
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollLeft = container.scrollWidth / 3
    }
  }, [])

  
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg)
    setShowDetailsModal(true)
  }

  const handleBookNow = () => {
    setShowDetailsModal(false)
    setShowBookingForm(true)
  }

  const handleCloseBooking = () => {
    setShowBookingForm(false)
    setSelectedPackage(null)
  }

  const handleBookingSubmit = (formData) => {
    console.log("Booking submitted:", {
      package: selectedPackage,
      ...formData
    })
    alert(`Thank you for booking ${selectedPackage.title}! We'll contact you shortly to confirm your reservation.`)
    handleCloseBooking()
  }
  
  return (
    <div className="w-full mx-auto px-4 py-16 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-500 rounded-2xl shadow-lg mr-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-900 to-gray-700 bg-clip-text text-transparent">
              Featured Travel Packages
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-orange-600 font-medium">Handpicked by Experts</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover a Namibian Adventure with our curated travel packages. Discover the beauty of Walvis Bay with unforgettable experiences!
        </p>
      </div>

      {/* Cards Container */}
      <div
        
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 p-14"
        
      >
        {infinitePackages.map((pkg, index) => (
          <div
            key={`${pkg.id}-${index}`}
            className="group  flex-shrink-0 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-gray-100 hover:border-emerald-200 relative"
          >
            {/* Featured Badge */}
            {pkg.featured && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg border border-white/20">
                <Award className="w-3 h-3 inline mr-1" />
                FEATURED
              </div>
            )}

            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Discount Badge */}
              {pkg.discount > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                  {pkg.discount}% OFF
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(pkg.id)}
                className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/50"
              >
                <Heart 
                  fill={favorites.has(pkg.id) ? "red" : "none"} 
                  className={`w-5 h-5 ${favorites.has(pkg.id) ? 'text-red-500' : ''}`} 
                />
              </button>

              {/* Rating Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/50">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                <span className="text-xs text-gray-600">({pkg.reviews})</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="mb-3">
                <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors" title={pkg.title}>
                  {pkg.title}
                </h4>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">{pkg.destination}</span>
                </div>
              </div>

              {/* Package Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(pkg.category)}
                    <span className="text-xs text-gray-500">{pkg.category}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(pkg.difficulty)}`}>
                    {pkg.difficulty}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline justify-between mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                <div>
                  <span className="text-2xl font-bold text-emerald-600">
                    {pkg.currency}{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">per person</span>
                </div>
                <span className="line-through text-gray-400 text-sm">
                  {pkg.currency}{pkg.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewDetails(pkg)}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-500 hover:to-orange-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 border border-emerald-500/20"
              >
                View Details & Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedPackage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-300 shadow-lg border border-gray-200"
              onClick={() => setShowDetailsModal(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedPackage.image || "/placeholder.svg"}
                alt={selectedPackage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Featured Badge */}
              {selectedPackage.featured && (
                <div className="absolute top-6 left-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold rounded-full shadow-lg">
                  <Award className="w-4 h-4 inline mr-1" />
                  FEATURED
                </div>
              )}

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 right-16">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedPackage.title}</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span className="text-lg">{selectedPackage.destination}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.duration}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Group Size</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.groupSize}</p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">Rating</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.rating} ({selectedPackage.reviews} reviews)</p>
                </div>

                <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-100">
                  <div className="flex items-center gap-2 text-cyan-600 mb-1">
                    <Plane className="w-5 h-5" />
                    <span className="font-semibold">Departure</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.departure}</p>
                </div>

                <div className={`p-4 rounded-2xl border ${getDifficultyColor(selectedPackage.difficulty).replace('text-', 'bg-').replace('-400', '-50').replace('bg-', 'bg-').replace('-500/20', '-100')} ${getDifficultyColor(selectedPackage.difficulty).replace('bg-', 'border-').replace('/20', '')}`}>
                  <div className={`flex items-center gap-2 mb-1 ${getDifficultyColor(selectedPackage.difficulty).split(' ')[0]}`}>
                    <Info className="w-5 h-5" />
                    <span className="font-semibold">Difficulty</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.difficulty}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-2 text-orange-600 mb-1">
                    {getCategoryIcon(selectedPackage.category)}
                    <span className="font-semibold">Category</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedPackage.category}</p>
                </div>
              </div>

              {/* Includes Section */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  What's Included
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPackage.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights Section */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Trip Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPackage.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Extras */}
              {selectedPackage.optionalExtras && selectedPackage.optionalExtras.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-blue-500" />
                    Optional Extras
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPackage.optionalExtras.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing and Book Button */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Starting from</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-emerald-600">
                        {selectedPackage.currency}{selectedPackage.price.toLocaleString()}
                      </span>
                      <span className="line-through text-gray-400 text-lg">
                        {selectedPackage.currency}{selectedPackage.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">per person</p>
                  </div>
                  {selectedPackage.discount > 0 && (
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                        Save {selectedPackage.discount}%
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-500 hover:to-teal-500 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Book This Package Now
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <BookingForm
          selectedPackage={selectedPackage}
          onClose={handleCloseBooking}
          onSubmit={handleBookingSubmit}
        />
      )}

        <button className=" px-10 font-medium py-6  rounded-full  bg-stone-900 text-amber-50 hover:scale-105 hover:bg-orange-600 transition duration-200">View All Tours</button>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default TravelPackageCards