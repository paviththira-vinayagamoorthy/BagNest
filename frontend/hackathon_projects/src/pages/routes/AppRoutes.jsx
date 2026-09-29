import { Routes, Route } from "react-router-dom";

import LandingPage from "../public/LandingPage";
import Login from "../public/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;