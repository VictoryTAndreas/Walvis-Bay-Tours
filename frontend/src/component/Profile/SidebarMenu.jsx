import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCogs, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { LogOut, Plane, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const SidebarMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To highlight active link

  const [dialogBox, setDialogBox] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate("/");
  };

  // Define menu items in an array to map them easily for both Mobile & Desktop
  const menuItems = [
    { path: "/Dashboard/profile", label: "Profile", icon: <FaUser /> },
    {
      path: "/Dashboard/currentPlan",
      label: "Current Plan",
      icon: <FaMapMarkedAlt />,
    },
    { path: "/Dashboard/userFriends", label: "Friends", icon: <FaUsers /> },
    { path: "/Dashboard/settings", label: "Settings", icon: <FaCogs /> },
  ];

  // Helper component for Links to avoid repetition
  const NavItem = ({ item, onClick }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium
        ${
          isActive
            ? "bg-orange-100 text-orange-600"
            : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
        }`}
      >
        <span className="text-xl">{item.icon}</span>
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* =======================================
          MOBILE HEADER (Visible < md screens)
      ======================================== */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-amber-50 border-b border-stone-200 z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-stone-900 text-lg"
        >
          <Plane className="w-6 h-6 text-orange-500" />
          <span>TravelMate</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md hover:bg-stone-200 text-stone-700"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* =======================================
          MOBILE MENU OVERLAY (Dropdown)
      ======================================== */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="absolute top-[60px] left-0 w-full bg-amber-50 border-b border-stone-200 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}

            <hr className="border-stone-200 my-2" />

            <button
              onClick={() => {
                setIsMobileOpen(false);
                setDialogBox(true);
              }}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* =======================================
          DESKTOP SIDEBAR (Visible >= md screens)
      ======================================== */}
      <div className="hidden md:flex h-screen w-64 bg-amber-50 text-stone-900 flex-col p-6 fixed left-0 top-0 border-r border-stone-200 shadow-xl z-40">
        {/* App Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-stone-900 text-2xl font-bold mb-10 transition-colors hover:text-orange-500"
        >
          <Plane className="w-8 h-8 text-orange-500" />
          <span>TravelMate</span>
        </Link>

        {/* Menu */}
        <nav className="flex flex-col space-y-2 flex-1">
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Logout (pushed to bottom) */}
        <div className="mt-auto pt-6 border-t border-stone-200">
          <button
            onClick={() => setDialogBox(true)}
            className="flex items-center space-x-3 text-stone-600 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-lg transition-colors w-full text-left font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* =======================================
          LOGOUT CONFIRMATION DIALOG 
      ======================================== */}
      {dialogBox && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-stone-900/40 flex justify-center items-center z-[60]"
          onClick={() => setDialogBox(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-80 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-stone-800">
              Logging Out?
            </h2>
            <p className="mb-6 text-stone-500">
              Are you sure you want to end your session?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDialogBox(false)}
                className="px-4 py-2 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 shadow-md transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;
