import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
// Traveller dashboard-a route-la use panna import panrom
import TravellerDashboard from "../pages/TravellerDashboard";
// Partner dashboard-a route-la use panna import panrom
import PartnerDashboard from "../pages/PartnerDashboard";

function AppRoutes() {
  // Website-la entha URL-ku entha page kaatanum nu define panrom
  return (
    <Routes>

      {/* "/" URL pona Landing Page kaatum */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* "/login" URL pona Login Page kaatum */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* "/register" URL pona Register Page kaatum */}
     <Route
        path="/register"
         element={<Register />}
    />

    {/* Traveller dashboard URL */}
        <Route
           path="/traveller-dashboard"
           element={<TravellerDashboard />}
        />      

    {/* "/partner-dashboard" URL pona Partner Dashboard kaatum */}
      <Route
        path="/partner-dashboard"
        element={<PartnerDashboard />}
    />
 

    </Routes>
  );
}

export default AppRoutes;