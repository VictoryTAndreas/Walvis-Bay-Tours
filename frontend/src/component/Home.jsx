// import "../index.css";//the correct path to your index.css is
import TravelPackageCards from "./TravelPackageCards";
import {
  Globe,
  Award,
  Headset,
  Banknote,
  Star,
  Map,
  ArrowRight,
} from "lucide-react";
import useInView from "../hook/useInView";
import "swiper/css";
import "swiper/css/navigation";
import img7 from "../assets/img7.jpeg";
import bgV from "../assets/bgV.mp4";
import { Link } from "react-router-dom";

const Home = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  const features = [
    {
      Icon: Globe,
      title: "Diverse Destinations",
      description:
        "Explore a wide range of destinations, from marine cruises to tournship tours.",
    },
    {
      Icon: Award,
      title: "Expertly Curated",
      description:
        "Our packages are carefully crafted by travel experts for unforgettable experiences.",
    },
    {
      Icon: Headset,
      title: "24/7 Support",
      description:
        "Enjoy peace of mind with our dedicated support team available around the clock.",
    },
    {
      Icon: Map,
      title: "National Reach",
      description:
        "Access exclusive spots and hidden gems accross Namibia.",
    },
    {
      Icon: Star,
      title: "Premium Experience",
      description:
        "Luxury accommodations and VIP transport options for the discerning traveler.",
    },
    {
      Icon: Banknote,
      title: "Best Prices",
      description:
        "We match prices to ensure you get the best value for your dream vacation.",
    },
  ];
  return (
    <div className="bg-white min-h-screen text-stone-900 font-sans">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        {/* Using a placeholder video URL for demonstration. Replace src with your {bgV} import */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={bgV} type="video/mp4" />
        </video>

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6">
          <div className="text-white text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
              WHERE TO GO NEXT?
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-xl mx-auto drop-shadow-md">
              Let us help you map your perfect getaway and discover
              unforgettable adventures across Namibia!
            </p>
            <Link
              to={"/signin"}
              className="px-8 py-3 sm:px-10 sm:py-4 border border-white text-white font-semibold rounded-full bg-stone-950/30 backdrop-blur-md hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* {trvel with confidance } */}

      <section className="grid grid-cols-1 md:grid-cols-2 justify-center px-20 py-12 gap-3 m-2 ">
        <div
          ref={ref}
          className={`flex flex-col   py-12 gap-10 m-2 
      ${isVisible ? "slide-left" : "opacity-0"}
    `}
        >
          <h1 className="text-4xl uppercase lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1]">
            Explore the coast with{" "}
            <span className="text-blue-600">Confidence</span>
          </h1>

          <p className="text-2xl font-medium font-sans">
            Life is short and the world is wide. We curate journeys that go
            beyond the ordinary, ensuring every step you take is filled with
            wonder and safety.
          </p>

          <p className="text-2xl font-medium font-sans">
            From hidden gems in the coastal to silent retreats in nature, we
            handle the details so you can handle the memories.
          </p>

          <div className="pt-4">
            <button className="group mb-10 bg-stone-900 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full  lg:max-w-none px-4 sm:px-0 ">
          <div className="relative group flex justify-center">
            {/* Image border decoration */}
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-400 to-stone-300 rounded-2xl sm:rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <img
              src={img7}
              alt="Travel Destination"
              className="relative w-full h-72 sm:h-80 md:h-[500px] object-cover rounded-2xl sm:rounded-4xl shadow-2xl transform transition duration-500 hover:scale-[1.01]"
            />

            {/* Floating Card Overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-3 sm:gap-4 animate-fade-in-up sm:max-w-xs">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full text-blue-900 shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-stone-500 font-semibold uppercase tracking-wide">
                  Current Status
                </p>
                <p className="text-sm sm:text-base text-stone-900 font-bold truncate">
                  Accepting Bookings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 lg:py-32 bg-stone-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
              Why Choose Us for Your Next Adventure
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-stone-600">
              We don't just plan trips; we curate experiences. Here is why
              thousands of travelers trust us with their memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ Icon, title, description }, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-stone-100 group-hover:bg-blue-500 rounded-2xl flex items-center justify-center mb-6 text-stone-900 group-hover:text-white transition-colors duration-300 shadow-inner group-hover:shadow-blue-300/40">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>

                  <p className="text-stone-600 text-base leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Package Cards Section */}
      <section className="py- bg-white">
        <TravelPackageCards />
      </section>
    </div>
  );
};

export default Home;
