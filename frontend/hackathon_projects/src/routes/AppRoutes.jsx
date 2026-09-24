import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

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

    </Routes>
  );
}

export default AppRoutes;