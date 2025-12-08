import { useState, useRef } from "react";
import {
  useNavigate,
} from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  FileText,
  Tag,
  Hourglass,
  Activity,
  Image as ImageIcon,
  UploadCloud,
  X,
  Plane,
  MoveLeft,
} from "lucide-react";
import axios from "axios";
import toast  from "react-hot-toast";

// Helper component moved outside to prevent re-renders
const InputGroup = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  ...props
}) => (
  <div className="space-y-1">
    <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F26E21] transition-colors duration-300 pointer-events-none">
        {Icon && <Icon size={18} />}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10 transition-all duration-300 placeholder:text-gray-400 font-medium text-sm shadow-sm"
        {...props}
      />
    </div>
  </div>
);

export const CreateTrip = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    destination: "",
    travelDate: "",
    timeSlot: "",
    minAge: 0,
    maxAge: 0,
    grpSize: 0,
    decp: "",
    Categories: "",
    Duration: "",
    Difficulty: "Medium", // Default value
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.destination || !formData.travelDate || !formData.Duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for file upload
      const data = new FormData();

      // send JSON as string
      data.append("data", JSON.stringify(formData));

      // send image file
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/plans/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Trip created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to create trip";
      toast.error(String(errorMsg));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Background with darker overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[3px]"></div>
      </div>
      <div
        className="fixed left-16 inset-0 top-9 z-30 max-w-20 h-20"
        onClick={() => navigate("/Dashboard/profile")}
      >
        <p className="border-2  rounded-bl-4xl bg-orange-500 text-white px-6 py-3 max-w-20 hover:scale-105 transition duration-150 hover:bg-orange-600">
          {" "}
          <MoveLeft />{" "}
        </p>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 animate-fade-in-up">
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#F26E21] to-[#ff9f66]"></div>

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-[#F26E21]/10 rounded-xl flex items-center justify-center text-[#F26E21]">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                Create New Trip
              </h1>
              <p className="text-gray-500 text-sm">
                Plan your next adventure details below
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Main Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputGroup
                  label="Destination"
                  icon={MapPin}
                  name="destination"
                  value={formData.destination}
                  onChange={handleOnChange}
                  placeholder="e.g. Paris, France"
                  required
                />
              </div>

              <InputGroup
                label="Travel Date"
                icon={Calendar}
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleOnChange}
                required
              />

              <InputGroup
                label="Duration"
                icon={Hourglass}
                name="Duration"
                value={formData.Duration}
                onChange={handleOnChange}
                placeholder="e.g. 5 Days, 4 Nights"
                required
              />
            </div>

            {/* 2. Group & Age Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputGroup
                label="Group Size"
                icon={Users}
                type="number"
                name="grpSize"
                value={formData.grpSize}
                onChange={handleOnChange}
                placeholder="Total seats"
                required
              />
              <InputGroup
                label="Min Age"
                icon={Users}
                type="number"
                name="minAge"
                value={formData.minAge}
                onChange={handleOnChange}
                placeholder="18"
                required
              />
              <InputGroup
                label="Max Age"
                icon={Users}
                type="number"
                name="maxAge"
                value={formData.maxAge}
                onChange={handleOnChange}
                placeholder="60"
                required
              />
            </div>

            {/* 3. Specifics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Time Slot"
                icon={Clock}
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleOnChange}
                placeholder="e.g. 09:00 AM Start"
                required
              />

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">
                  Difficulty
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Activity size={18} />
                  </div>
                  <select
                    name="Difficulty"
                    value={formData.Difficulty}
                    onChange={handleOnChange}
                    className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10 transition-all duration-300 font-medium text-sm appearance-none cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Description & Categories */}
            <div className="space-y-6">
              <InputGroup
                label="Category (Optional)"
                icon={Tag}
                name="Categories"
                value={formData.Categories}
                onChange={handleOnChange}
                placeholder="e.g. Trekking, Beach, Cultural"
              />

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">
                  Description
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#F26E21] transition-colors duration-300 pointer-events-none">
                    <FileText size={18} />
                  </div>
                  <textarea
                    name="decp"
                    value={formData.decp}
                    onChange={handleOnChange}
                    placeholder="Describe the trip itinerary, highlights, and requirements..."
                    rows="4"
                    required
                    className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#F26E21] focus:ring-4 focus:ring-[#F26E21]/10 transition-all duration-300 placeholder:text-gray-400 font-medium text-sm shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wide">
                Cover Image
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                  ${
                    imagePreview
                      ? "border-[#F26E21] bg-orange-50"
                      : "border-gray-300 hover:border-[#F26E21] hover:bg-gray-50"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold flex items-center gap-2">
                        <UploadCloud size={20} /> Change Image
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg z-20"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      Click to upload trip image
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (max. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    destination: "",
                    travelDate: "",
                    timeSlot: "",
                    minAge: "",
                    maxAge: "",
                    grpSize: "",
                    decp: "",
                    Categories: "",
                    Duration: "",
                    Difficulty: "Medium",
                  })
                }
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] bg-[#F26E21] hover:bg-[#d65a13] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 
                           transform transition-all duration-300 hover:scale-[1.01] hover:shadow-orange-500/50 
                           disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Create Trip Plan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
