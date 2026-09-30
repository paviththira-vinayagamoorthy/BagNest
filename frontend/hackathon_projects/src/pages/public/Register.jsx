
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiFetch } from "../../api/api";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("traveller");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    setError("");

    if (!/^[A-Za-z0-9_]{3,50}$/.test(username.trim())) {
      setError(
        "Username must be 3-50 characters: letters, numbers or underscore only."
      );
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Backend: POST /auth/register
      await apiFetch("/auth/register", {
        method: "POST",
        auth: false,
        body: {
          username: username.trim(),
          email: email.trim(),
          full_name: fullName.trim(),
          password,
          role,
        },
      });

      // Registration complete aana Login page-ku pogum
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister}>
                {/* Account type */}
                <div className="mb-3">
                  <label className="register-label">Register as</label>

                  <select
                    className="form-select register-input"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="traveller">Traveller</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>

                {/* Full name */}
                <div className="mb-3">
                  <label className="register-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control register-input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    minLength={2}
                    required
                  />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label className="register-label">Username</label>

                  <input
                    type="text"
                    className="form-control register-input"
                    placeholder="Choose a username (you can login with it)"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    minLength={3}
                    maxLength={50}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="register-label">Email</label>

                  <input
                    type="email"
                    className="form-control register-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="register-label">Password</label>

                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control register-input"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
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
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
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

                <button
                  type="submit"
                  className="register-button"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="login-register">
                <span>Already have an account?</span>

                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;