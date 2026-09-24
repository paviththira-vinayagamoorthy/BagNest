import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Register() {

  // Login page-ku navigate panna useNavigate use panrom
  const navigate = useNavigate();

  // Register form values-a store panna states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("traveller");

  // Password show/hide panna state
  const [showPassword, setShowPassword] = useState(false);

  // Register form submit-a handle panna function
  async function handleRegister(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    try {

      // Backend-ku register details send panrom
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: email,
            email: email,
            full_name: name,
            password: password,
            role: role
          })
        }
      );

      // Backend response-a JSON-aa convert panrom
      const data = await response.json();

      // Registration successful
      if (response.ok) {

        alert("Registration successful!");

        // Login page-ku navigate panrom
        navigate("/login");

      } else {

        // Backend error message kaata
        alert(data.detail || "Registration failed");
      }

    } catch (error) {

      // Backend connect aagala na error kaata
      alert("Unable to connect to backend");

    }
  }

  // BagNest new user registration page
  return (
    <section className="py-5">
      <div className="container py-5">

        {/* Register form-a center-la kaata */}
        <div className="row justify-content-center">

          {/* Register card-ku responsive width */}
          <div className="col-md-6 col-lg-5">

            {/* User registration details kaata card */}
            <div className="card border-0 shadow-sm p-4">

              {/* Register heading */}
              <div className="text-center mb-4">

                <h2 className="fw-bold text-success">
                  Create Your Account
                </h2>

                <p className="text-muted">
                  Join BagNest and store your bags easily.
                </p>

              </div>

              {/* New account details enter panna form */}
              <form onSubmit={handleRegister}>

                {/* Full Name */}
                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>

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
                      placeholder="Create a password"
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

                {/* User role select panna */}
                <div className="mb-3">

                  <label className="form-label">
                    Register As
                  </label>

                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >

                    <option value="traveller">
                      Traveller
                    </option>

                    <option value="partner">
                      Storage Partner
                    </option>

                  </select>

                </div>

                {/* Create account button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Create Account
                </button>

              </form>

              {/* Existing users-ku login option */}
              <p className="text-center mt-4 mb-0">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-success fw-semibold"
                >
                  Login
                </Link>

              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Register;