import { Navigate } from "react-router-dom";

import { getToken } from "../api/api";

// role = "traveller" or "partner"
function ProtectedRoute({ role, children }) {
  const token = getToken();
  const userType = localStorage.getItem("userType");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (role && userType !== role) {
    return (
      <Navigate
        to={
          userType === "partner"
            ? "/partner-dashboard"
            : "/traveller-dashboard"
        }
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
