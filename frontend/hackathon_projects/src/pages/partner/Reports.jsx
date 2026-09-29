function Reports() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Reports
        </h1>

        <p className="page-description">
          View your storage and booking summary.
        </p>

        {/* Report summary */}
        <div className="row mt-4">

          {/* Total bookings */}
          <div className="col-md-6 col-lg-3 mb-4">

            <div className="bag-card p-4">

              <h6 className="text-muted">
                Total Bookings
              </h6>

              <h2 className="fw-bold mt-2">
                24
              </h2>

              <p className="text-muted mb-0">
                All bookings
              </p>

            </div>

          </div>

          {/* Confirmed bookings */}
          <div className="col-md-6 col-lg-3 mb-4">

            <div className="bag-card p-4">

              <h6 className="text-muted">
                Confirmed
              </h6>

              <h2 className="fw-bold mt-2">
                18
              </h2>

              <p className="text-muted mb-0">
                Confirmed bookings
              </p>

            </div>

          </div>

          {/* Stored bags */}
          <div className="col-md-6 col-lg-3 mb-4">

            <div className="bag-card p-4">

              <h6 className="text-muted">
                Bags Stored
              </h6>

              <h2 className="fw-bold mt-2">
                42
              </h2>

              <p className="text-muted mb-0">
                Total bags
              </p>

            </div>

          </div>

          {/* Revenue */}
          <div className="col-md-6 col-lg-3 mb-4">

            <div className="bag-card p-4">

              <h6 className="text-muted">
                Total Revenue
              </h6>

              <h2 className="fw-bold mt-2">
                LKR 12,500
              </h2>

              <p className="text-muted mb-0">
                Booking revenue
              </p>

            </div>

          </div>

        </div>

        {/* Report details */}
        <div className="row mt-2">

          <div className="col-md-8 col-lg-7">

            <div className="bag-card p-4">

              <h4 className="mb-4">
                Storage Summary
              </h4>

              <p>
                <strong>Storage Name:</strong>{" "}
                Green Leaf Cafe
              </p>

              <p>
                <strong>Location:</strong>{" "}
                Jaffna Town
              </p>

              <p>
                <strong>Available Bags:</strong>{" "}
                8
              </p>

              <p className="mb-0">
                <strong>Storage Status:</strong>{" "}
                Active
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;