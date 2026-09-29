import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-7 col-lg-6">

            <div className="register-card">

              <h2 className="register-title">
                Create your BagNest account
              </h2>

              <p className="register-description">
                Create an account to use BagNest.
              </p>

              <form>

                {/* Account type */}

                <div className="mb-3">
                  <label className="register-label">
                    Register as
                  </label>

                  <select
                    className="form-select register-input"
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

                {/* Full name */}

                <div className="mb-3">
                  <label className="register-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control register-input"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}

                <div className="mb-3">
                  <label className="register-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control register-input"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}

                <div className="mb-3">
                  <label className="register-label">
                    Password
                  </label>

                  <div className="password-wrapper">

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control register-input"
                      placeholder="Create a password"
                    />

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

                {/* Confirm password */}

                <div className="mb-4">
                  <label className="register-label">
                    Confirm Password
                  </label>

                  <div className="password-wrapper">

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control register-input"
                      placeholder="Confirm your password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>

                  </div>
                </div>

                {/* Create account */}

                <button
                  type="submit"
                  className="register-button"
                >
                  Create Account
                </button>

              </form>

              {/* Login link */}

              <div className="login-register">

                <span>
                  Already have an account?
                </span>

                <Link to="/login">
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;