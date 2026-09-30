import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiFetch } from "../../services/api";

function Register() {
  // Registration success aana Login page-ku navigate panna use pannrom
  const navigate = useNavigate();

  // Password show / hide panna use pannrom
  const [showPassword, setShowPassword] = useState(false);

  // Confirm password show / hide panna use pannrom
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Register as-la select panna role store pannrom
  const [userType, setUserType] = useState("traveller");

  // Full name store panna
  const [fullName, setFullName] = useState("");

  // Email store panna
  const [email, setEmail] = useState("");

  // Password store panna
  const [password, setPassword] = useState("");

  // Confirm password store panna
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // Error message show panna
  const [errorMessage, setErrorMessage] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Register form submit handle pannrom
  async function handleRegister(event) {
    // Page refresh aagama stop pannrom
    event.preventDefault();

    // Previous error message clear pannrom
    setErrorMessage("");

    // Password rendu same-aa irukka check pannrom
    if (password !== confirmPassword) {
      setErrorMessage(
        "Passwords do not match."
      );
      return;
    }

    // Register button loading state
    setIsLoading(true);

    try {
      // Backend register API-ku data send pannrom
      await apiFetch("/auth/register", {
        method: "POST",

        body: JSON.stringify({
          username: email,
          email: email,
          full_name: fullName,
          password: password,
          role: userType,
        }),
      });

      // Registration successful aana Login page-ku pogum
      navigate("/login");

    } catch (error) {
      // Backend error message show pannrom
      setErrorMessage(
        error.message ||
        "Registration failed."
      );

    } finally {
      // Loading stop pannrom
      setIsLoading(false);
    }
  }

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

              {/* Register form */}
              <form onSubmit={handleRegister}>

                {/* Account type */}
                <div className="mb-3">

                  <label className="register-label">
                    Register as
                  </label>

                  <select
                    className="form-select register-input"
                    value={userType}
                    onChange={(event) =>
                      setUserType(event.target.value)
                    }
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
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    required
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
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Password */}
                <div className="mb-3">

                  <label className="register-label">
                    Password
                  </label>

                  <div className="password-wrapper">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control register-input"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                    />

                    {/* Password show / hide button */}
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
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
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control register-input"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      required
                    />

                    {/* Confirm password show / hide button */}
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

                {/* Backend / validation error */}
                {errorMessage && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}

                {/* Create account button */}
                <button
                  type="submit"
                  className="register-button"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Creating Account..."
                    : "Create Account"}
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