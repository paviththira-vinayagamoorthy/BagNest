function PartnerBookings() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Partner Bookings
        </h1>

        <p className="page-description">
          View and manage traveller bookings for your storage.
        </p>

        {/* Booking list */}
        <div className="row mt-4">

          {/* Booking card */}
          <div className="col-md-6 col-lg-5 mb-4">

            <div className="bag-card p-4">

              <div className="d-flex justify-content-between align-items-start mb-3">

                <h4 className="mb-0">
                  Booking #BN001
                </h4>

                <span className="badge text-bg-success">
                  Confirmed
                </span>

              </div>

              <p className="mb-2">
                <strong>Traveller:</strong> John Silva
              </p>

              <p className="mb-2">
                <strong>Storage:</strong> Green Leaf Cafe
              </p>

              <p className="mb-2">
                <strong>Date:</strong> 15 May 2026
              </p>

              <p className="mb-2">
                <strong>Time:</strong> 10:00 AM - 4:00 PM
              </p>

              <p className="mb-4">
                <strong>Bags:</strong> 2
              </p>

              {/* Booking actions */}
              <div className="d-flex gap-2">

                <button
                  type="button"
                  className="btn btn-primary-custom"
                >
                  View Details
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Cancel Booking
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PartnerBookings;