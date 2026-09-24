import { useState } from "react";
// Login success aana page change panna navigate import panrom
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api/api";

function Login() {

  // Login form values-a store panna states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password show/hide panna state
  const [showPassword, setShowPassword] = useState(false);

  // Login success aana dashboard-ku navigate panna
  const navigate = useNavigate();

  // Login form submit-a handle panna function
  async function handleLogin(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    try {

      // Backend-ku login details send panrom
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username_or_email: email,
            password: password
          })
        }
      );

      // Backend response-a JSON-aa convert panrom
      const data = await response.json();

      // Login successful
      if (response.ok) {

        // Backend kudutha user details-a localStorage-la save panrom
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // User role-ku etha dashboard-ku navigate panrom
        if (data.user.role === "traveller") {
          navigate("/traveller-dashboard");
        } else {
          navigate("/partner-dashboard");
        }

      } else {

        // Backend error message kaata
        alert(data.detail || "Login failed");
      }

    } catch (error) {

      // Backend connect aagala na error kaata
      alert("Unable to connect to backend");

    }
  }

  // Login page main section
  return (
    <section className="py-5">

      {/* Content-a center-la maintain panna Bootstrap container */}
      <div className="container py-5">

        {/* Login form-a center-la kondu vara row */}
        <div className="row justify-content-center">

          {/* Login card-ku responsive width */}
          <div className="col-md-6 col-lg-5">

            {/* Login details and form display panna card */}
            <div className="card border-0 shadow-sm p-4">

              {/* Login heading and description */}
              <div className="text-center mb-4">

                <h2 className="fw-bold text-success">
                  Welcome Back
                </h2>

                <p className="text-muted">
                  Login to your BagNest account
                </p>

              </div>

              {/* User login details enter panna form */}
              <form onSubmit={handleLogin}>

                {/* Username / Email */}
                <div className="mb-3">

                  <label className="form-label">
                    Username / Email
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username or email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

                {/* Password */}
                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  {/* Password input + show/hide button */}
                  <div className="input-group">

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

              {/* New users registration option */}
              <p className="text-center mt-4 mb-0">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="text-success fw-semibold"
                >
                  Register
                </Link>

              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;