import SidebarMenu from "../Profile/SidebarMenu";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/Dashboard/profile";

  return (
    <div className="flex min-h-screen bg-amber-50">
      <SidebarMenu />

      {/* Use padding-left on md+ instead of hard margin so small screens don't overflow */}
      <div
        className={`w-full bg-amber-50 min-w-0
          pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-56 md:pr-8
          ${isProfilePage ? "" : "pt-2"}`}
      >
        <div className="max-w-7xl mx-auto mt-12 md:mt-0 md:pl-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
