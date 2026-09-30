import { useEffect, useState } from "react";

import { apiFetch } from "../../services/api";

function TravellerProfile() {
  // Logged-in traveller data
  const [profile, setProfile] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Profile fetch pannrom
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiFetch("/auth/me");

        setProfile(data);
      } catch (error) {
        setErrorMessage(
          error.message || "Failed to load profile."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="page-section py-5">

        <div className="container">

          <h1 className="page-title">
            My Profile
          </h1>

          <p className="text-muted">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Profile heading */}
        <h1 className="page-title">
          My Profile
        </h1>

        <p className="page-description">
          View your BagNest profile.
        </p>

        {/* Error */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">
            {errorMessage}
          </div>
        )}

        {/* Profile information */}
        {profile && (
          <div className="row mt-4">

            <div className="col-md-8 col-lg-6">

              <div className="bag-card p-4">

                <h4 className="mb-4">
                  Traveller Information
                </h4>

                {/* Full Name */}
                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.full_name}
                    readOnly
                  />

                </div>

                {/* Username */}
                <div className="mb-3">

                  <label className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.username}
                    readOnly
                  />

                </div>

                {/* Email */}
                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    readOnly
                  />

                </div>

                {/* Account Type */}
                <div className="mb-3">

                  <label className="form-label">
                    Account Type
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.role}
                    readOnly
                  />

                </div>

                {/* Account Status */}
                <div className="mb-3">

                  <label className="form-label">
                    Account Status
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={
                      profile.active
                        ? "Active"
                        : "Inactive"
                    }
                    readOnly
                  />

                </div>

                {/* Account Created */}
                <div className="mb-0">

                  <label className="form-label">
                    Account Created
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={profile.created_at}
                    readOnly
                  />

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default TravellerProfile;