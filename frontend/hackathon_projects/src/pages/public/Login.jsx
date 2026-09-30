import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { apiFetch } from "../../services/api";

function Login() {
  // Login success aana correct page-ku navigate panna
  const navigate = useNavigate();

  // URL-la irukkura redirect value read panna
  const [searchParams] = useSearchParams();

  // Password show / hide panna
  const [showPassword, setShowPassword] = useState(false);

  // Login as-la select panna user type
  const [userType, setUserType] = useState("traveller");

  // Email store panna
  const [email, setEmail] = useState("");

  // Password store panna
  const [password, setPassword] = useState("");

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Login form submit
  async function handleLogin(event) {
    event.preventDefault();

    // Previous error clear pannrom
    setErrorMessage("");

    // Login button loading state
    setIsLoading(true);

    try {
      // Backend login API call
      const data = await apiFetch("/auth/login", {
        method: "POST",

        body: JSON.stringify({
          username_or_email: email,
          password: password,
        }),
      });

      // Backend kudutha access token save pannrom
      localStorage.setItem(
        "accessToken",
        data.access_token
      );

      // Login state save pannrom
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Backend-la irundhu actual role save pannrom
      localStorage.setItem(
        "userType",
        data.user.role
      );

      // URL-la redirect irukka check pannrom
      const redirectPath = searchParams.get(
        "redirect"
      );

      // Redirect irundha andha page-ku pogum
      if (redirectPath) {
        navigate(redirectPath);
        return;
      }

      // Traveller login
      if (data.user.role === "traveller") {
        navigate("/traveller-dashboard");
        return;
      }

      // Partner login
      if (data.user.role === "partner") {
        navigate("/partner-dashboard");
        return;
      }

      // Admin login
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
        return;
      }

      // Unknown role
      setErrorMessage(
        "Your account role is not supported."
      );

    } catch (error) {
      // Backend error message show pannrom
      setErrorMessage(
        error.message || "Login failed."
      );
    } finally {
      // Loading stop pannrom
      setIsLoading(false);
    }
  }

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
              <form onSubmit={handleLogin}>

                {/* Account type */}
                <div className="mb-3">

                  <label className="login-label">
                    Login as
                  </label>

                  <select
                    className="form-select login-input"
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

                {/* Email */}
                <div className="mb-3">

                  <label className="login-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control login-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
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
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                    />

                    {/* Password show / hide */}
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

                {/* Backend error */}
                {errorMessage && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Logging in..."
                    : "Login"}
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