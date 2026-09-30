function PartnerNotifications() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Notifications
        </h1>

        <p className="page-description">
          Stay updated about your storage and bookings.
        </p>

        {/* Notification list */}
        <div className="row mt-4">

          {/* New booking notification */}
          <div className="col-md-8 col-lg-7 mb-3">

            <div className="bag-card p-4">

              <h5 className="fw-bold">
                New Booking Received
              </h5>

              <p className="text-muted mb-2">
                A traveller has made a new luggage storage
                booking at your storage location.
              </p>

              <small className="text-muted">
                Today
              </small>

            </div>

          </div>

          {/* Booking cancellation notification */}
          <div className="col-md-8 col-lg-7 mb-3">

            <div className="bag-card p-4">

              <h5 className="fw-bold">
                Booking Cancelled
              </h5>

              <p className="text-muted mb-2">
                A traveller has cancelled a storage booking.
              </p>

              <small className="text-muted">
                Yesterday
              </small>

            </div>

          </div>

          {/* Storage reminder */}
          <div className="col-md-8 col-lg-7 mb-3">

            <div className="bag-card p-4">

              <h5 className="fw-bold">
                Storage Reminder
              </h5>

              <p className="text-muted mb-2">
                Check today's upcoming luggage storage bookings.
              </p>

              <small className="text-muted">
                2 days ago
              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PartnerNotifications;