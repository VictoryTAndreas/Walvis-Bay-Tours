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

export default function Experience() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);

  const experiences = [
    {
      id: 1,
      slug: "serene-beach-paradise-in-maldives",
      title: "Serene Beach Paradise in Maldives",
      description: "Escape to crystal-clear turquoise waters and pristine white sand beaches. Experience luxury overwater villas, world-class snorkeling, and unforgettable sunsets. This tropical paradise offers the perfect blend of relaxation and adventure with vibrant coral reefs and exotic marine life.",
      location: "Maldives",
      duration: "7 Days / 6 Nights",
      groupSize: "2-8 People",
      rating: 4.9,
      reviews: 342,
      price: "$2,499",
      imageGradient: "from-cyan-400 via-blue-500 to-blue-600",
      highlights: ["Overwater Bungalow", "Scuba Diving", "Spa Treatment", "Island Hopping"]
    },
    {
      id: 2,
      slug: "himalayan-mountain-trekking-adventure",
      title: "Himalayan Mountain Trekking Adventure",
      description: "Challenge yourself with an exhilarating trek through the majestic Himalayas. Witness breathtaking mountain vistas, ancient monasteries, and authentic Sherpa culture. This adventure combines physical challenge with spiritual discovery in one of the world's most stunning landscapes.",
      location: "Nepal, Everest Region",
      duration: "12 Days / 11 Nights",
      groupSize: "6-12 People",
      rating: 4.8,
      reviews: 289,
      price: "$1,899",
      imageGradient: "from-slate-400 via-slate-600 to-slate-800",
      highlights: ["Base Camp Trek", "Sherpa Villages", "Mountain Views", "Cultural Tours"]
    },
    {
      id: 3,
      slug: "african-safari-wildlife-expedition",
      title: "African Safari Wildlife Expedition",
      description: "Embark on an unforgettable journey through the African savanna. Witness the Big Five in their natural habitat, camp under starlit skies, and experience the raw beauty of nature. Professional guides ensure close encounters with lions, elephants, and countless other species.",
      location: "Tanzania, Serengeti",
      duration: "10 Days / 9 Nights",
      groupSize: "4-10 People",
      rating: 5.0,
      reviews: 456,
      price: "$3,299",
      imageGradient: "from-amber-500 via-orange-600 to-red-700",
      highlights: ["Big Five Safari", "Luxury Camps", "Hot Air Balloon", "Maasai Culture"]
    },
    {
      id: 4,
      slug: "ancient-temples-of-southeast-asia",
      title: "Ancient Temples of Southeast Asia",
      description: "Discover the mystical temples of Angkor Wat and immerse yourself in Southeast Asian culture. Explore ancient ruins, vibrant markets, and lush jungles. Experience traditional cuisine, silk weaving workshops, and the warm hospitality of local communities.",
      location: "Cambodia & Thailand",
      duration: "9 Days / 8 Nights",
      groupSize: "2-15 People",
      rating: 4.7,
      reviews: 521,
      price: "$1,599",
      imageGradient: "from-green-600 via-emerald-700 to-teal-800",
      highlights: ["Angkor Wat", "Floating Markets", "Cooking Classes", "Elephant Sanctuary"]
    },
    {
      id: 5,
      slug: "northern-lights-arctic-experience",
      title: "Northern Lights Arctic Experience",
      description: "Chase the magical Aurora Borealis in the Arctic wilderness. Stay in glass igloos, experience husky sledding, and witness nature's most spectacular light show. This once-in-a-lifetime adventure combines stunning natural phenomena with thrilling winter activities.",
      location: "Norway, Tromsø",
      duration: "6 Days / 5 Nights",
      groupSize: "2-6 People",
      rating: 4.9,
      reviews: 267,
      price: "$2,799",
      imageGradient: "from-indigo-500 via-purple-600 to-pink-700",
      highlights: ["Aurora Viewing", "Glass Igloo", "Dog Sledding", "Snowmobiling"]
    },
    {
      id: 6,
      slug: "mediterranean-coastal-cruise",
      title: "Mediterranean Coastal Cruise",
      description: "Sail through the stunning Mediterranean coastline visiting historic cities and hidden coves. Enjoy gourmet dining, azure waters, and charming coastal villages. This luxury cruise offers the perfect combination of culture, relaxation, and scenic beauty.",
      location: "Greece & Croatia",
      duration: "8 Days / 7 Nights",
      groupSize: "10-20 People",
      rating: 4.8,
      reviews: 398,
      price: "$2,199",
      imageGradient: "from-blue-400 via-cyan-500 to-teal-600",
      highlights: ["Island Hopping", "Wine Tasting", "Historic Sites", "Beach Time"]
    },
    {
      id: 7,
      slug: "amazon-rainforest-expedition",
      title: "Amazon Rainforest Expedition",
      description: "Venture deep into the world's largest rainforest for an eco-adventure. Discover incredible biodiversity, indigenous communities, and hidden waterfalls. Stay in eco-lodges and explore pristine jungle with expert naturalist guides.",
      location: "Brazil, Amazon Basin",
      duration: "11 Days / 10 Nights",
      groupSize: "4-8 People",
      rating: 4.6,
      reviews: 178,
      price: "$2,399",
      imageGradient: "from-green-500 via-lime-600 to-emerald-700",
      highlights: ["Jungle Trekking", "Wildlife Spotting", "Canoe Trips", "Indigenous Villages"]
    },
    {
      id: 8,
      slug: "japanese-cultural-immersion",
      title: "Japanese Cultural Immersion",
      description: "Experience the perfect blend of ancient tradition and modern innovation. Visit historic temples, witness cherry blossoms, stay in traditional ryokans, and explore bustling Tokyo. This journey offers deep insights into Japanese culture and hospitality.",
      location: "Japan, Tokyo to Kyoto",
      duration: "14 Days / 13 Nights",
      groupSize: "2-12 People",
      rating: 5.0,
      reviews: 612,
      price: "$3,499",
      imageGradient: "from-pink-400 via-rose-500 to-red-600",
      highlights: ["Cherry Blossoms", "Tea Ceremony", "Mount Fuji", "Traditional Ryokan"]
    },
    {
      id: 9,
      slug: "desert-dunes-adventure-in-dubai",
      title: "Desert Dunes Adventure in Dubai",
      description: "Experience the golden sands of the Arabian desert with thrilling dune bashing, camel rides, and luxury desert camps. Combine adventure with world-class shopping and modern architecture in this unique destination.",
      location: "UAE, Dubai",
      duration: "5 Days / 4 Nights",
      groupSize: "2-10 People",
      rating: 4.7,
      reviews: 445,
      price: "$1,799",
      imageGradient: "from-yellow-500 via-orange-600 to-amber-700",
      highlights: ["Dune Bashing", "Burj Khalifa", "Desert Safari", "Luxury Shopping"]
    },
    {
      id: 10,
      slug: "patagonian-glacier-trek",
      title: "Patagonian Glacier Trek",
      description: "Explore the dramatic landscapes of Patagonia with towering glaciers, pristine lakes, and rugged mountains. This adventure offers world-class trekking, ice climbing, and wildlife viewing in one of Earth's last wild frontiers.",
      location: "Argentina & Chile",
      duration: "10 Days / 9 Nights",
      groupSize: "6-10 People",
      rating: 4.9,
      reviews: 234,
      price: "$2,899",
      imageGradient: "from-blue-300 via-cyan-400 to-sky-500",
      highlights: ["Glacier Hiking", "Wildlife Viewing", "Mountain Climbing", "Pristine Lakes"]
    }
  ];

  const visibleExperiences = experiences.slice(0, visibleCount);
  const hasMore = visibleCount < experiences.length;

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, experiences.length));
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-orange-50 via-white to-stone-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Discover Your Next
            <span className="block text-orange-500 mt-2">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Curated travel experiences that transform ordinary trips into extraordinary memories. 
            From serene beaches to mountain peaks, we bring the world closer to you.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 rounded-full"></div>
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
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500">
                    {/* Gradient placeholder for image */}
                    <div className={`h-96 bg-gradient-to-br ${experience.imageGradient} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
                      <div className="relative z-10 text-white text-center p-8">
                        <MapPin className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <p className="text-2xl font-bold">{experience.location}</p>
                      </div>
                    </div>
                    
                    {/* Floating Rating Badge */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                      <span className="font-bold text-stone-900">{experience.rating}</span>
                      <span className="text-stone-500 text-sm">({experience.reviews})</span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-6 left-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-xl">
                      <p className="text-sm font-medium">Starting from</p>
                      <p className="text-2xl font-bold">{experience.price}</p>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -z-10 ${isEven ? '-right-8' : '-left-8'} top-8 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl`}></div>
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
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 font-medium">Duration</p>
                        <p className="text-base font-semibold text-stone-900">{experience.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-orange-600" />
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
                          className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => navigate(`/experience/${experience.slug}`)}
                    className="group/btn bg-stone-900 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
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
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
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
