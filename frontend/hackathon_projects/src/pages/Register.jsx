import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  function handleRegister(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    // User enter panna registration details-a oru object-la store panna
    const user = {
      name,
      email,
      password,
      role
    };

    // Registered user details-a browser localStorage-la save panna
    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    // Registration mudinjathukku apram Login page-ku pogum
    navigate("/login");
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

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
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