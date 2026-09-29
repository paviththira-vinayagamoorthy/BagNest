import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // Logout complete aana Login page-ku poganum
  const navigate = useNavigate();

  // Logout confirmation handle pannrom
  function handleLogout() {
    // User kitta confirmation kekkrom
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    // User Logout click pannina Login page-ku pogum
    if (confirmLogout) {
      navigate("/login");
    }
  }

  // BagNest main navigation bar
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

          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>

          <Link
            className="nav-link"
            to="/explore-storage"
          >
            Explore Storage
          </Link>

          <Link
            className="nav-link"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="btn btn-primary-custom"
            to="/register"
          >
            Get Started
          </Link>

          {/* Logout button */}
          <button
            type="button"
            className="btn btn-primary-custom"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;