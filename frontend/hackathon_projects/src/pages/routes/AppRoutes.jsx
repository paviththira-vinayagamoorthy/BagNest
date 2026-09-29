import { Routes, Route } from "react-router-dom";

import LandingPage from "../public/LandingPage";
import Login from "../public/Login";
import Register from "../public/Register";
import ExploreStorage from "../traveller/ExploreStorage";
import StorageDetails from "../traveller/StorageDetails";
import Booking from "../traveller/Booking";
import TravellerDashboard from "../traveller/TravellerDashboard";
import MyBookings from "../traveller/MyBookings";
import TravellerProfile from "../traveller/TravellerProfile";
import Notifications from "../traveller/Notifications";
import PartnerDashboard from "../partner/PartnerDashboard";
import ManageStorage from "../partner/ManageStorage";
import PartnerBookings from "../partner/PartnerBookings";

function AppRoutes() {
  return (
    <Routes>
        {/* path=url path define panrom, element=entha page show aaganum endu sollurom */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore-storage" element={<ExploreStorage />}/>
      <Route path="/storage/:id" element={<StorageDetails />}/>
      <Route path="/booking/:id" element={<Booking />}/>
      <Route path="/traveller-dashboard" element={<TravellerDashboard />}/>
      <Route path="/my-bookings" element={<MyBookings />}/>
      <Route path="/traveller-profile" element={<TravellerProfile />}/>
      <Route path="/notifications" element={<Notifications />}/>
      <Route path="/partner-dashboard" element={<PartnerDashboard />}/>
      <Route path="/manage-storage" element={<ManageStorage />}/>
      <Route path="/partner-bookings" element={<PartnerBookings />}/>
    </Routes>
  );
}

export default AppRoutes;