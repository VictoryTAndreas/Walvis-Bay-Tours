import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  ChevronDown
} from "lucide-react";
import cruise from "../../assets/cruise.jpeg";
import wich from "../../assets/wich.jpeg";
import kaya from "../../assets/kaya.avif";

export default function Experience() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);

  const experiences = [
    {
  id: 1,
  slug: "walvis-bay-boat-cruise-adventure",
  title: "Walvis Bay Boat Cruise Experience",
  description: "Embark on a spectacular 3-hour marine adventure in Walvis Bay Lagoon. Cruise alongside playful dolphins, encounter friendly Cape fur seals, and watch pelicans up close. Indulge in fresh oysters and champagne while enjoying breathtaking views of the bay and surrounding dunes. This unforgettable journey offers the perfect introduction to Namibia's rich marine life.",
  location: "Walvis Bay, Namibia",
  duration: "3 Hours",
  groupSize: "2-12 People",
  rating: 4.9,
  reviews: 187,
  image: cruise,
  price: "N$1,400",
  imageGradient: cruise,
  highlights: ["Dolphin Watching", "Fresh Oysters & Champagne", "Pelican Encounters", "Seal Colony Visit", "Marine Wildlife", "Scenic Bay Views"]
},
   {
  id: 2,
  slug: "sandwich-harbour-4x4-desert-adventure",
  title: "Sandwich Harbour 4X4 Desert Adventure",
  description: "Experience the thrill of dune driving on an exhilarating half-day 4x4 tour to Sandwich Harbour. Navigate through towering sand dunes that meet the Atlantic Ocean, witness incredible desert-adapted wildlife, and enjoy a scenic picnic in the dunes. Our experienced guides ensure a safe and unforgettable journey through one of Namibia's most spectacular coastal landscapes, with comfortable 7-seater vehicles never packed to full capacity for your comfort.",
  location: "Walvis Bay, Namibia",
  duration: "Half Day",
  groupSize: "4-7 People",
  rating: 4.8,
  reviews: 203,
  image: wich,
  price: "N$2,800",
  imageGradient: "from-amber-400 via-orange-500 to-stone-700",
  highlights: ["Dune Driving Experience", "Sandwich Harbour Lagoon", "Picnic in the Dunes", "Desert Wildlife", "Shipwreck Views", "Flamingo Sightings"]
},
    {
  id: 3,
  slug: "walvis-bay-kayaking-marine-wildlife",
  title: "Walvis Bay Kayaking Marine Wildlife Tour",
  description: "Paddle through the calm waters of Walvis Bay lagoon on an intimate half-day kayaking adventure. Get up close with playful Cape fur seals, watch pelicans glide overhead, and spot flamingos feeding in the shallows. Perfect for beginners and nature lovers alike, this guided tour offers a unique perspective on Namibia's rich marine ecosystem while visiting local oyster farms and enjoying the stunning coastal scenery.",
  location: "Walvis Bay, Namibia",
  duration: "Half Day",
  groupSize: "2-8 People",
  rating: 4.7,
  reviews: 156,
  image: kaya,
  price: "N$1,600",
  imageGradient: "from-teal-400 via-blue-500 to-cyan-600",
  highlights: ["Kayak with Seals", "Pelican Sightings", "Flamingo Viewing", "Oyster Farm Visit", "Marine Wildlife", "Beginner Friendly"]
},
  ];

  const visibleExperiences = experiences.slice(0, visibleCount);
  const hasMore = visibleCount < experiences.length;

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, experiences.length));
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-stone-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Discover Your Next
            <span className="block text-blue-500 mt-2">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Curated travel experiences that transform ordinary trips into extraordinary memories. 
            From serene beaches to mountain peaks, we bring the world closer to you.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Experiences Section - Zig Zag Layout */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {visibleExperiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={experience.id}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 mb-32 items-center group`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                    {/* Gradient placeholder for image */}
                    {/* Image with gradient overlay */}
                        <div className="relative h-96 overflow-hidden">
                        <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <MapPin className="w-8 h-8 mb-2 opacity-90" />
                        <p className="text-2xl font-bold">{experience.location}</p>
                        </div>
                        </div>
                    
                    {/* Floating Rating Badge */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
                      <span className="font-bold text-stone-900">{experience.rating}</span>
                      <span className="text-stone-500 text-sm">({experience.reviews})</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-6 left-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl">
                      <p className="text-sm font-medium">Starting from</p>
                      <p className="text-2xl font-bold">{experience.price}</p>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -z-10 ${isEven ? '-right-8' : '-left-8'} top-8 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl`}></div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
                      {experience.title}
                    </h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 font-medium">Duration</p>
                        <p className="text-base font-semibold text-stone-900">{experience.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 font-medium">Group Size</p>
                        <p className="text-base font-semibold text-stone-900">{experience.groupSize}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-stone-900 uppercase tracking-wider">Experience Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => navigate(`/experience/${experience.slug}`)}
                    className="group/btn bg-stone-900 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                  >
                    Explore This Experience
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleViewMore}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              View More Experiences
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {/* All Loaded Message */}
        {!hasMore && experiences.length > 4 && (
          <div className="text-center mt-16">
            <div className="inline-block bg-stone-100 px-8 py-4 rounded-full">
              <p className="text-stone-600 font-medium">
                🎉 You've explored all our amazing experiences!
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-stone-300 mb-10 leading-relaxed">
            Join thousands of travelers who have discovered their dream destinations with us. 
            Let's create unforgettable memories together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              Plan My Trip
            </button>
            <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
