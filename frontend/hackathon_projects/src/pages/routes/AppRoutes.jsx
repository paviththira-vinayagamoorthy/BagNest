import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../../components/ProtectedRoute";

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
import Reports from "../partner/Reports";
import PartnerProfile from "../partner/PartnerProfile";
import PartnerNotifications from "../partner/PartnerNotifications";

function AppRoutes() {
  return (
    <Routes>
        {/* path=url path define panrom, element=entha page show aaganum endu sollurom */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore-storage" element={<ExploreStorage />}/>
      <Route path="/storage/:id" element={<StorageDetails />}/>
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute role="traveller">
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/traveller-dashboard"
        element={
          <ProtectedRoute role="traveller">
            <TravellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute role="traveller">
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/traveller-profile"
        element={
          <ProtectedRoute role="traveller">
            <TravellerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute role="traveller">
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner-dashboard"
        element={
          <ProtectedRoute role="partner">
            <PartnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-storage"
        element={
          <ProtectedRoute role="partner">
            <ManageStorage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner-bookings"
        element={
          <ProtectedRoute role="partner">
            <PartnerBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute role="partner">
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner-profile"
        element={
          <ProtectedRoute role="partner">
            <PartnerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner-notifications"
        element={
          <ProtectedRoute role="partner">
            <PartnerNotifications />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;