import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { apiFetch, saveSession } from "../../api/api";

function Login() {
  const navigate = useNavigate();

  // ?redirect=/booking/3 (StorageDetails-la irunthu varum)
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Backend: POST /auth/login
      const data = await apiFetch("/auth/login", {
        method: "POST",
        auth: false,
        body: {
          username_or_email: email.trim(),
          password,
        },
      });

      // token + user save pannrom
      saveSession(data);

      if (data.user.role === "partner") {
        navigate("/partner-dashboard");
        return;
      }

      // Traveller: redirect irundha (safe path-na) angeye poganum
      const redirect = searchParams.get("redirect");

      if (
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
      ) {
        navigate(redirect);
      } else {
        navigate("/traveller-dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="login-card">
              <h2 className="login-title">Welcome back</h2>

              <p className="login-description">
                Login to continue with BagNest.
              </p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="login-label">Email</label>

                  <input
                    type="email"
                    className="form-control login-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="login-label">Password</label>

                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control login-input"
                      placeholder="Enter your password"
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

                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="login-register">
                <span>Don't have an account?</span>

                <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
