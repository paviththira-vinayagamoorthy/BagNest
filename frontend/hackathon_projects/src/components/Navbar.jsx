import { Link } from "react-router-dom";

function Navbar() {
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
        <div className="d-flex gap-3">

          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>

          <Link
            className="nav-link"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="nav-link"
            to="/register"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;