import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
      <div className="container py-2">

        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <span className="brand-mark">
            B
          </span>

          <span className="brand-name">
            Bag<span>Nest</span>
          </span>
        </Link>


        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bagNestNavbar"
          aria-controls="bagNestNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="bagNestNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/explore-storage"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Explore Storage
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Login
              </NavLink>
            </li>


            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link
                to="/register"
                className="btn btn-primary-custom px-4"
              >
                Get Started
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;