import React, { useEffect } from "react";
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

// Import images from assets
import maldivesImg from "../../assets/maldives.png";
import himalayasImg from "../../assets/himalayas.png";
import safariImg from "../../assets/safari.png";
import tokyoImg from "../../assets/tokyo.png";

const ExpBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experiencesData = {
    "serene-beach-paradise-in-maldives": {
      title: "Serene Beach Paradise in Maldives",
      location: "Maldives, Indian Ocean",
      rating: 4.9,
      reviews: 342,
      duration: "7 Days / 6 Nights",
      groupSize: "2-8 People",
      price: "$2,499",
      image: maldivesImg,
      description: "Escape to crystal-clear turquoise waters and pristine white sand beaches. Experience luxury overwater villas, world-class snorkeling, and unforgettable sunsets. This tropical paradise offers the perfect blend of relaxation and adventure with vibrant coral reefs and exotic marine life.",
      highlights: ["Luxury Overwater Villa Stay", "Guided Snorkeling Expedition", "Private Sunset Dinner Cruise", "Traditional Maldivian Spa Treatment"],
      itinerary: [
        { day: 1, title: "Arrival & Tropical Welcome", detail: "Arrive at Malé International Airport and enjoy a scenic speedboat or seaplane transfer to your resort. Check into your overwater villa and enjoy a welcome sunset cocktail." },
        { day: 2, title: "Underwater Wonderlands", detail: "Morning guided snorkeling at the house reef. Discover vibrant coral gardens and swim alongside sea turtles and tropical fish." },
        { day: 3, title: "Island Hopping Adventure", detail: "Visit local inhabited islands to experience Maldivian culture and enjoy a traditional beach picnic on an uninhabited sandbank." },
        { day: 4, title: "Wellness & Relaxation", detail: "Indulge in a 90-minute signature spa treatment using locally sourced coconut oils, followed by an afternoon of leisure on your private deck." }
      ],
      includes: ["All meals (Breakfast, Lunch, Dinner)", "Roundtrip Seaplane Transfers", "All Snorkeling Equipment", "Welcome Gift Pack"],
      excludes: ["International Flights", "Personal Travel Insurance", "Alcoholic Beverages beyond credit", "Optional Diving Tours"]
    },
    "himalayan-mountain-trekking-adventure": {
      title: "Himalayan Mountain Trekking Adventure",
      location: "Nepal, Everest Region",
      rating: 4.8,
      reviews: 289,
      duration: "12 Days / 11 Nights",
      groupSize: "6-12 People",
      price: "$1,899",
      image: himalayasImg,
      description: "Challenge yourself with an exhilarating trek through the majestic Himalayas. Witness breathtaking mountain vistas, ancient monasteries, and authentic Sherpa culture. This adventure combines physical challenge with spiritual discovery in one of the world's most stunning landscapes.",
      highlights: ["Everest Base Camp Perspective", "Tengboche Monastery Visit", "Namche Bazaar Exploration", "Suspension Bridge Crossing"],
      itinerary: [
        { day: 1, title: "Kathmandu Arrival", detail: "Briefing and final gear check in the historic capital of Nepal." },
        { day: 2, title: "Flight to Lukla", detail: "Experience one of the most scenic flights in the world to Lukla (2,860m) and begin the trek to Phakding." },
        { day: 3, title: "Namche Bazaar Trek", detail: "The gateway to the high Himalayas. Pass through pine forests and cross high suspension bridges." }
      ],
      includes: ["Professional Sherpa Guides", "All Teahouse Accommodations", "Trekking Permits", "Porters for Luggage"],
      excludes: ["International Airfare", "Tips for Porter/Guides", "Cold Drinks and Hot Showers", "Rescue Insurance"]
    },
    "african-safari-wildlife-expedition": {
      title: "African Safari Wildlife Expedition",
      location: "Tanzania, Serengeti",
      rating: 5.0,
      reviews: 456,
      duration: "10 Days / 9 Nights",
      groupSize: "4-10 People",
      price: "$3,299",
      image: safariImg,
      description: "Embark on an unforgettable journey through the African savanna. Witness the Big Five in their natural habitat, camp under starlit skies, and experience the raw beauty of nature. Professional guides ensure close encounters with lions, elephants, and countless other species.",
      highlights: ["Big Five Game Drives", "Great Migration Viewing", "Maasai Village Visit", "Bush Breakfast under Acacia Trees"],
      itinerary: [
        { day: 1, title: "Arusha Arrival", detail: "Meet your guide and stay in a boutique lodge on the outskirts of Arusha." },
        { day: 2, title: "Tarangire National Park", detail: "Explore the 'Land of Giants' famous for its massive elephant herds and baobab trees." }
      ],
      includes: ["4x4 Custom Safari Vehicle", "All Park Entrance Fees", "Professional Wildlife Naturalist", "Full Board Lodge Stay"],
      excludes: ["International Flights", "Alcoholic Drinks", "Visa Fees", "Balloon Safari Upgrade"]
    },
    "japanese-cultural-immersion": {
        title: "Japanese Cultural Immersion",
        location: "Japan, Tokyo to Kyoto",
        rating: 5.0,
        reviews: 612,
        duration: "14 Days / 13 Nights",
        groupSize: "2-12 People",
        price: "$3,499",
        image: tokyoImg,
        description: "Experience the perfect blend of ancient tradition and modern innovation. Visit historic temples, witness cherry blossoms, stay in traditional ryokans, and explore bustling Tokyo. This journey offers deep insights into Japanese culture and hospitality.",
        highlights: ["Traditional Tea Ceremony", "Shinkansen Bullet Train", "Kyoto Temple Tour", "Tokyo Robot Cafe Experience"],
        itinerary: [
          { day: 1, title: "Tokyo Arrival", detail: "Arrival at Narita/Haneda, airport transfer and evening neon tour of Shinjuku." },
          { day: 2, title: "Old meets New", detail: "Morning visit to Meiji Shrine followed by an afternoon in the futuristic district of Akihabara." }
        ],
        includes: ["All Accommodations", "JR Pass for Transport", "Professional Bilingual Guide", "Selected Meals"],
        excludes: ["International Airfare", "Travel Insurance", "Subway Fares within Cities", "Pocket WiFi Rental"]
      }
  };

  const experience = experiencesData[slug] || experiencesData["serene-beach-paradise-in-maldives"];

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      {/* Navigation Header */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-stone-100 shadow-sm">
        <button 
          onClick={() => navigate("/experience")}
          className="flex items-center gap-2 text-stone-600 hover:text-orange-500 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Experiences
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
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Bestseller
            </span>
            <div className="flex items-center gap-1 text-white">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="font-bold">{experience.rating}</span>
              <span className="opacity-70 text-sm">({experience.reviews} reviews)</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {experience.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span className="font-medium">{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="font-medium">{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
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
                <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
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
                    <div className="bg-orange-100 p-2 rounded-lg shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-orange-600" />
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
                    <div className="absolute left-0 top-1 w-12 h-12 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg">
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
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
              
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
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-stone-700">Select Date</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-stone-300" />
                </div>
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="font-bold text-stone-700">Guests</span>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-lg border border-stone-200 font-bold">2</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Book Experience Now
              </button>
              
              <p className="text-center text-stone-500 text-sm font-medium">
                Free cancellation up to 48 hours before
              </p>

              <div className="space-y-4 pt-4 border-t border-stone-50">
                <div className="flex items-center gap-3 text-stone-600">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
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
    </div>
  );
};

export default ExpBlog;
