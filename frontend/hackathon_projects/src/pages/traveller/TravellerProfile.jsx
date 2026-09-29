function TravellerProfile() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Profile heading */}
        <h1 className="page-title">
          My Profile
        </h1>

        <p className="page-description">
          View and manage your BagNest profile.
        </p>

        {/* Profile card */}
        <div className="row mt-4">

          <div className="col-md-8 col-lg-6">

            <div className="bag-card p-4">

              <h4 className="mb-4">
                Traveller Information
              </h4>

              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Account Type
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="Traveller"
                  readOnly
                />
              </div>

              <button
                type="button"
                className="btn btn-primary-custom"
              >
                Update Profile
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TravellerProfile;