import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // Login success aana next page-ku navigate panna use pannrom
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-7 col-lg-5">

            <div className="login-card">

              <h2 className="login-title">
                Welcome back
              </h2>

              <p className="login-description">
                Login to continue with BagNest.
              </p>

              {/* Login form */}
              <form
                onSubmit={(event) => {
                  // Form submit aagumbothu page refresh aagama stop pannrom
                  event.preventDefault();

                  // Ippo temporary-aa Traveller Dashboard-ku pogum
                  navigate("/traveller-dashboard");
                }}
              >

                {/* Account type */}
                <div className="mb-3">

                  <label className="login-label">
                    Login as
                  </label>

                  <select
                    className="form-select login-input"
                    defaultValue="traveller"
                  >
                    <option value="traveller">
                      Traveller
                    </option>

                    <option value="partner">
                      Partner
                    </option>
                  </select>

                </div>

                {/* Email */}
                <div className="mb-3">

                  <label className="login-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control login-input"
                    placeholder="Enter your email"
                  />

                </div>

                {/* Password */}
                <div className="mb-4">

                  <label className="login-label">
                    Password
                  </label>

                  <div className="password-wrapper">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control login-input"
                      placeholder="Enter your password"
                    />

                    {/* Password show / hide button */}
                    <button
                      type="button"
                      className="password-toggle"
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
                  className="login-button"
                >
                  Login
                </button>

              </form>

              {/* Register page link */}
              <div className="login-register">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register">
                  Register
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;