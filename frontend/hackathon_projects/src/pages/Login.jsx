import { useState } from "react";
// text-a link aa maatha Link import panrom
import { Link } from "react-router-dom";

function Login() {

  // Login form values-a store panna states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login form submit-a handle panna function
  function handleLogin(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    // Register pannina user details-a localStorage-la irundhu eduka
    const registeredUser =
      JSON.parse(
        localStorage.getItem("registeredUser")
      );

    // Enter panna email and password-a registered details-oda compare panna
    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {

      // Login successful-na user details-a localStorage-la save panna
      localStorage.setItem(
        "user",
        JSON.stringify(registeredUser)
      );
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

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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