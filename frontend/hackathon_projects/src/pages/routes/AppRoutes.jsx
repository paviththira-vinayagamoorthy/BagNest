import { Routes, Route } from "react-router-dom";

import LandingPage from "../public/LandingPage";
import Login from "../public/Login";
import Register from "../public/Register";
import ExploreStorage from "../traveller/ExploreStorage";
import StorageDetails from "../traveller/StorageDetails";

function AppRoutes() {
  return (
    <Routes>
        {/* path=url path define panrom, element=entha page show aaganum endu sollurom */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore-storage" element={<ExploreStorage />}/>
      <Route path="/storage/:id" element={<StorageDetails />}/>
    </Routes>
  );
}

export default AppRoutes;