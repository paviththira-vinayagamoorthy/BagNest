import { useEffect, useState } from "react";

function Profile() {

  // Logged-in user details-a store panna state
  const [user, setUser] = useState(null);

  // Page open aagumbodhu localStorage-la irundhu user details eduka
  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    // User details irundha state-la save panna
    setUser(savedUser);

  }, []);

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
                  {user.name}
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