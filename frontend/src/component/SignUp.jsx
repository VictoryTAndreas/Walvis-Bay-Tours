import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlane,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Age: "",
    city: "",
    country: "",
    pincode: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Generic safe handler that allows smooth typing for numeric fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Age: allow empty or up to 3 digits
    if (name === "Age") {
      if (value === "" || /^[0-9]{0,3}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Pincode: allow empty or up to 6 digits
    if (name === "pincode") {
      if (value === "" || /^[0-9]{0,6}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Default
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic email regex for client-side validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!formData.Age.trim()) {
      toast.error("Please enter your age.");
      return false;
    }
    const ageNumber = Number(formData.Age);
    if (Number.isNaN(ageNumber) || ageNumber < 18 || ageNumber > 120) {
      toast.error("Age must be a number between 18 and 120.");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return false;
    }
    if (!formData.country.trim()) {
      toast.error("Please enter your country.");
      return false;
    }
    if (!formData.pincode.trim() || formData.pincode.length < 4) {
      // Accepting 4-6 length pincodes (many countries vary). Adjust if you want exactly 6.
      toast.error("Please enter a valid pincode (at least 4 digits).");
      return false;
    }
    if (!formData.password) {
      toast.error("Please create a password.");
      return false;
    }
    // Optionally: add password strength rules here
    return true;
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    // prevent double submit
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        Age: Number(formData.Age), // safe conversion after validation
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        payload,
        { timeout: 15000 }
      );

      // Consider checking response.status or response.data for real success criteria
      if (response && (response.status === 200 || response.status === 201)) {
        toast.success("Account created successfully!");
        navigate("/signin");
      } else {
        // fallback error message
        toast.error("Unable to create account — please try again.");
      }
    } catch (err) {
      // Better error feedback (server message if present)
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error || null;
      if (serverMsg) {
        toast.error(String(serverMsg));
      } else if (err?.code === "ECONNABORTED") {
        toast.error("Request timed out. Check your connection and try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      // Optionally log to monitoring service here
      // console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // InputGroup forwards additional input props through inputProps

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2021&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden border border-white/40 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
        <div className="h-2 w-full bg-gradient-to-r from-[#F26E21] via-[#ff884d] to-[#ffb088]" />

        <div className="p-8 sm:p-10 lg:p-12">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-[#F26E21]/15 rounded-2xl mb-4 text-[#F26E21] shadow-inner">
              <FaPlane className="text-2xl transform -rotate-45" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Join{" "}
              <span className="text-[#F26E21] drop-shadow-sm">TravelMate</span>
            </h1>

            <p className="text-gray-600 text-lg">
              Your next great adventure begins here.
            </p>
          </div>

          {/* Inputs */}
          <form onSubmit={handleSignUpClick} className="space-y-6">
            {/* GLOBAL INPUT STYLING */}
            <style>{`
            input {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              padding: 14px 16px;
              border-radius: 0.75rem;
              width: 100%;
              color: #1e293b;
              font-weight: 500;
              transition: all 0.25s ease;
            }
            input:focus {
              background: #ffffff;
              border-color: #F26E21;
              box-shadow: 0 0 0 4px rgba(242, 110, 33, 0.25);
            }
            input::placeholder {
              color: #94a3b8;
            }
          `}</style>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>

            {/* Email + Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Age
                </label>
                <input
                  type="text"
                  name="Age"
                  placeholder="25"
                  value={formData.Age}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  City
                </label>
                <input
                  name="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Country
                </label>
                <input
                  name="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={handleOnChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                  Pincode
                </label>
                <input
                  name="pincode"
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleOnChange}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="
                w-full bg-gradient-to-r from-[#F26E21] to-[#ff884d]
                hover:shadow-[0_8px_25px_rgba(242,110,33,0.4)]
                text-white font-bold py-4 rounded-xl
                transition-all duration-300
                hover:scale-[1.02]
                disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                       7.962 0 014 12H0c0 3.042 1.135 5.824 3
                       7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#F26E21] font-bold hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
