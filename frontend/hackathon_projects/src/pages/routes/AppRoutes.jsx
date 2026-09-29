import { Routes, Route } from "react-router-dom";

import LandingPage from "../public/LandingPage";
import Login from "../public/Login";
import Register from "../public/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;