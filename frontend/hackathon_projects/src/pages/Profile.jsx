import { useEffect, useState } from "react";
import API_URL from "../api/api";

function Profile() {

  // Logged-in user details-a store panna state
  const [user, setUser] = useState(null);

  // Page loading state
  const [loading, setLoading] = useState(true);

  // Page open aagumbodhu backend-la irundhu user details eduka
  useEffect(() => {

    async function fetchProfile() {

      try {

        // Login pannumbodhu save panna user details-a eduka
        const savedUser =
          JSON.parse(
            localStorage.getItem("user")
          );

        // Access token illana profile fetch panna mudiyadhu
        if (!savedUser || !savedUser.access_token) {
          setLoading(false);
          return;
        }

        // Backend /auth/me API call
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            headers: {
              "Authorization":
                `Bearer ${savedUser.access_token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {

          // Backend user details-a state-la save panrom
          setUser(data);

        } else {

          console.error(
            data.detail ||
            "Unable to fetch profile"
          );

        }

      } catch (error) {

        console.error(
          "Unable to connect to backend:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    fetchProfile();

  }, []);

  // Profile loading aagumbodhu
  if (loading) {
    return (
      <section className="py-5">

        <div className="container text-center">

          <p className="text-muted">
            Loading profile...
          </p>

        </div>

      </section>
    );
  }

  // User details illa-na message kaata
  if (!user) {
    return (
      <section className="py-5">

        <div className="container text-center">

          <h2 className="fw-bold text-success">
            My Profile
          </h2>

          <p className="text-muted mt-3">
            No profile information available.
          </p>

        </div>

      </section>
    );
  }

  // User profile details display panna
  return (
    <section className="py-5">

      {/* Profile content-a center-la maintain panna container */}
      <div className="container">

        {/* Page heading */}
        <div className="mb-4">

          <h2 className="fw-bold text-success">
            My Profile
          </h2>

          <p className="text-muted">
            View your BagNest account information.
          </p>

        </div>

        {/* Profile details card */}
        <div className="row">

          <div className="col-md-6">

            <div className="card border-0 shadow-sm p-4">

              {/* User name */}
              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <p className="mb-0">
                  {user.full_name}
                </p>

              </div>

              {/* User email */}
              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <p className="mb-0">
                  {user.email}
                </p>

              </div>

              {/* User role */}
              <div>

                <label className="form-label">
                  Account Type
                </label>

                <p className="mb-0 text-capitalize">
                  {user.role}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Profile;