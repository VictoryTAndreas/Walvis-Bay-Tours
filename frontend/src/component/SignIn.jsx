import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaPlane,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Optional chaining in case auth context isn't fully set up yet
  const { login } = useAuth() || { login: () => {} };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        formData
      );
      if (response) {
        login(response.data);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Background Image with Overlay - Same as SignUp */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#F26E21] to-[#ff9f66]"></div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-[#F26E21]/10 rounded-2xl mb-4 text-[#F26E21]">
              <FaPlane className="text-3xl transform -rotate-45" />
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-2 ">
              Sign in to plan your next adventure.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#F26E21" size={48} />
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="block text-2xl font-semibold text-gray-700 ml-1">
                    Email
                  </label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F26E21] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block text-2xl font-semibold text-gray-700 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F26E21] transition-colors" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10 transition-all duration-300 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-800">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="mr-2 w-4 h-4 text-[#F26E21] border-gray-300 rounded focus:ring-[#F26E21]"
                    />
                    Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[#F26E21] font-semibold hover:text-[#d65a13] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#F26E21] hover:bg-[#d65a13] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-orange-500/50"
                >
                  Sign In
                </button>
              </form>

              {/* Footer */}
              <p className="mt-8 text-center text-gray-500 text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#F26E21] font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Sign up here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
