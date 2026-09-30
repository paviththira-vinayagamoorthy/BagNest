function PartnerProfile() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Partner Profile
        </h1>

        <p className="page-description">
          View and manage your BagNest partner profile.
        </p>

        {/* Profile form */}
        <div className="row mt-4">

          <div className="col-md-8 col-lg-6">

            <div className="bag-card p-4">

              <h4 className="mb-4">
                Partner Information
              </h4>

              {/* Business name */}
              <div className="mb-3">
                <label className="form-label">
                  Business Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter business name"
                />
              </div>

              {/* Owner name */}
              <div className="mb-3">
                <label className="form-label">
                  Owner Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter owner name"
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
                  placeholder="Enter email"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Business location */}
              <div className="mb-4">
                <label className="form-label">
                  Business Location
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter business location"
                />
              </div>

              {/* Update profile */}
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

export default PartnerProfile;