import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
} from "react-router-dom";
import {
  User,
  Mail,
  MapPin,
  Globe,
  Hash,
  Camera,
  Save,
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// Helper Input Component
const InputGroup = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F26E21] transition-colors duration-300 pointer-events-none">
        {Icon && <Icon size={16} />}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none 
          ${
            disabled
              ? "opacity-60 cursor-not-allowed bg-gray-100"
              : "focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10"
          } 
          transition-all duration-300 placeholder:text-gray-400 font-medium text-sm shadow-sm`}
      />
    </div>
  </div>
);

export const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Age: "",
    city: "",
    country: "",
    pincode: "",
  });

  // Load Initial Data
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          // Populate form with existing data
          setFormData({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            Age: parsedUser.Age || "",
            // Handle nested Address safely
            city: parsedUser.Address?.city || "",
            country: parsedUser.Address?.country || "",
            pincode: parsedUser.Address?.pincode || "",
          });

          // Set existing image as preview
          if (parsedUser.profileImage) {
            setImagePreview(parsedUser.profileImage);
          }
        }
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };

    loadUserData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();

      // Structure data to match backend expectation
      const payload = {
        name: formData.name,
        Age: Number(formData.Age),
      };

      // Append JSON data as a string
      data.append("data", JSON.stringify(payload));

      // Append Image if selected
      if (imageFile) {
        data.append("image", imageFile);
      }

      // Updated to PATCH request and new endpoint
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");

        // Update local storage with new data from response
        const updatedUser = response.data.user || response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser.data));

        navigate("/Dashboard/profile");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 animate-fade-in-up">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#F26E21] to-[#ff9f66] p-1"></div>

        <div className="p-6 sm:p-10">
          {/* Navigation & Title */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-extrabold text-stone-900">
              Edit Profile
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Profile Image Section */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg ring-2 ring-orange-100 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center text-orange-300">
                      <Camera size={40} />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Upload className="mb-1" size={20} />
                    <span className="text-xs font-bold">Change</span>
                  </div>
                </div>

                {/* Camera Icon Badge */}
                <div className="absolute bottom-1 right-1 bg-[#F26E21] text-white p-2 rounded-full shadow-md border-2 border-white">
                  <Camera size={14} />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-stone-400 mt-3 font-medium">
                Click to upload new photo
              </p>
            </div>

            {/* 2. Personal Information */}
            <div className="bg-stone-50/50 p-6 rounded-2xl border border-stone-100 space-y-6">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
                <User size={16} className="text-[#F26E21]" /> Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Full Name"
                  icon={User}
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                />

                <InputGroup
                  label="Age"
                  icon={User}
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleOnChange}
                />

                <div className="md:col-span-2">
                  <InputGroup
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    disabled={true} // Usually email isn't editable directly
                  />
                  <p className="text-[10px] text-stone-400 mt-1 ml-1">
                    *Email cannot be changed directly for security reasons.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Address Information */}
            <div className="bg-stone-50/50 p-6 rounded-2xl border border-stone-100 space-y-6">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-200 pb-2">
                <MapPin size={16} className="text-[#F26E21]" /> Address Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InputGroup
                  label="City"
                  icon={MapPin}
                  name="city"
                  value={formData.city}
                  onChange={handleOnChange}
                />

                <InputGroup
                  label="Country"
                  icon={Globe}
                  name="country"
                  value={formData.country}
                  onChange={handleOnChange}
                />

                <InputGroup
                  label="Pincode"
                  icon={Hash}
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-white border border-stone-200 text-stone-600 font-bold py-3.5 rounded-xl hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] bg-[#F26E21] hover:bg-[#d65a13] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 
                           transform transition-all duration-300 hover:scale-[1.01] hover:shadow-orange-500/50 
                           disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
