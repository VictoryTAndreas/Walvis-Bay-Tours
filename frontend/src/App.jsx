import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home";
import FindTravelMate from "./component/FindTravelMate";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Profile from "./component/Dashboard/Profile";
import Settings from "./component/Dashboard/Settings";
import Friends from "./component/Dashboard/Friends";
import CurrentPlan from "./component/Dashboard/CurrentPlan";
import DashboardLayout from "./component/Dashboard/DashboardLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OffersPage from "./component/OfferPage";
import Experience from "./component/ExperiencePage/Experience";
import ExpBlog from "./component/ExperiencePage/ExpBlog";
import CurrentPlans from "./component/ui/TravelPlan";
import MainLayout from "./component/MainLayout";
import ChatPage from "./component/Chat/ChatPage";
import { CreateTrip } from "./component/CreateTrip";
import { EditProfile } from "./component/EditProfle";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      
      <ToastContainer position="bottom-right" autoClose={1000} />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-travel-mate" element={<FindTravelMate />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/:slug" element={<ExpBlog />} />
          <Route path="/currentPlan" element={<CurrentPlans />} />
        </Route>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/tripCreate" element={<CreateTrip />} />
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="currentPlan" element={<CurrentPlan />} />
          <Route path="userFriends" element={<Friends />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
