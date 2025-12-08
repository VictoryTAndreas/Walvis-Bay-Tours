"use client";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Plane, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide navbar on dashboard
  const hideNavbar = location.pathname.startsWith("/Dashboard");

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Optional: Add scroll effect to darken navbar when scrolling down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideNavbar) return null;

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
      transition-all duration-500 ease-in-out
      ${isMobileMenuOpen ? "rounded-[2rem]" : "rounded-full"}
      border border-white/20 shadow-2xl backdrop-blur-xl
      ${scrolled ? "bg-stone-900/90" : "bg-stone-900/60"}
      w-[95%] md:w-[85%] lg:w-[1000px] 
      px-6 py-3 text-white`}
    >
      <div className="flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center space-x-3 group select-none">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Plane className="h-6 w-6 text-white transform rotate-45" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
              TravelMate
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-400">
              Explore Together
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/experience", label: "Experience" },
            { to: "/#", label: "Destinations" },
            { to: "/offers", label: "Offers" },
            { to: "/find-travel-mate", label: "Find Mate" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative px-4 py-2 rounded-full text-sm font-medium text-stone-300 hover:text-white transition-all duration-300 hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* --- DESKTOP AUTH --- */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="text-sm font-semibold text-white hover:bg-orange-500 transition-colors px-4.5 border border-amber-50 rounded-2xl py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-stone-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-orange-500/20"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/Dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
            >
              <User className="h-5 w-5 text-white" />
            </button>
          )}
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <button
          className="md:hidden p-2 text-stone-200 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* --- MOBILE MENU WRAPPER --- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100 mt-6 pb-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {/* Mobile Links */}
          {[
            { to: "/experience", label: "Experience" },
            { to: "/#", label: "Destinations" },
            { to: "/offers", label: "Offers" },
            { to: "/find-travel-mate", label: "Find Travel Mate" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block w-full p-3 text-center rounded-xl bg-white/5 hover:bg-orange-600/20 text-stone-200 hover:text-orange-400 border border-white/5 hover:border-orange-500/30 transition-all duration-300"
            >
              {label}
            </Link>
          ))}

          {/* Mobile Auth */}
          <div className="mt-4 flex flex-col gap-3">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/signin")}
                  className="py-3 rounded-xl border hover:bg-orange-500 border-white text-white font-semibold  transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="py-3 rounded-xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/Dashboard")}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-800 border border-white/10 hover:border-orange-500/50 text-white transition-all"
              >
                <User className="h-5 w-5" />
                <span>Go to Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
