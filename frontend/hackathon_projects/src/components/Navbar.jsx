import { Link } from "react-router-dom";

function Navbar() {
//  bagNest kaana main navigation bar
  return (
    <nav className="navbar bg-white border-bottom">

      <div className="container">

    {/* bagnest logo */}
        <Link
          className="navbar-brand fw-bold text-success"
          to="/"
        >
          BagNest
        </Link>

    {/* navigation link */}
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