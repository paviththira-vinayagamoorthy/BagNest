import { useEffect, useState } from "react";

import { apiFetch } from "../../services/api";

function PartnerProfile() {
  // Logged-in user data
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
            Partner Profile
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

        {/* Page heading */}
        <h1 className="page-title">
          Partner Profile
        </h1>

        <p className="page-description">
          View your BagNest partner profile.
        </p>

        {/* Error */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">
            {errorMessage}
          </div>
        )}

        {/* Profile */}
        {profile && (
          <div className="row mt-4">

            <div className="col-md-8 col-lg-6">

              <div className="bag-card p-4">

                <h4 className="mb-4">
                  Partner Information
                </h4>

                {/* Full name */}
                <div className="mb-3">

                  <label className="form-label">
                    Owner Name
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

                {/* Role */}
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

                {/* Account status */}
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

                {/* Created date */}
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

export default PartnerProfile;