import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { clearSession } from "../api/api";

function Navbar() {
  // Logout aana Login page-ku poganum
  const navigate = useNavigate();

  // Current page/path-ah check pannrom
  const location = useLocation();

  // User login pannirukkaa-nu temporary-aa check pannrom
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // Login / logout navigation change aagumbothu
  // Navbar login state-ah update pannrom
  useEffect(() => {
    setIsLoggedIn(
      Boolean(localStorage.getItem("token"))
    );
  }, [location.pathname]);

  // Logout handle pannrom
  function handleLogout() {
    // Logout confirmation kekkrom
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    // User OK kudutha
    if (confirmLogout) {

      // Token, user, login state ellam remove pannrom
      clearSession();

      // Navbar-la immediately Login / Get Started varanum
      setIsLoggedIn(false);

      // Login page-ku pogum
      navigate("/login");
    }
  }

  return (
    <nav className="navbar border-bottom">

      <div className="container">

        {/* BagNest logo */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          BagNest
        </Link>

        {/* Navigation links */}
        <div className="d-flex gap-3 align-items-center">

          {/* Home */}
          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>

          {/* Explore Storage */}
          <Link
            className="nav-link"
            to="/explore-storage"
          >
            Explore Storage
          </Link>

          {/* Login pannala-na */}
          {!isLoggedIn ? (
            <>
              {/* Login */}
              <Link
                className="nav-link"
                to="/login"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                className="btn btn-primary-custom"
                to="/register"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Role-ku yetha Dashboard link */}
              <Link
                className="nav-link"
                to={
                  localStorage.getItem("userType") === "partner"
                    ? "/partner-dashboard"
                    : "/traveller-dashboard"
                }
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                type="button"
                className="btn btn-primary-custom"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;