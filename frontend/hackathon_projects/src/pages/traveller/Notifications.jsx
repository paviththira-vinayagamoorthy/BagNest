function Notifications() {
  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Notifications
        </h1>

        <p className="page-description">
          Stay updated about your BagNest bookings.
        </p>

        {/* Notification list */}
        <div className="row mt-4">

          {/* Booking notification */}
          <div className="col-md-8 col-lg-7 mb-3">

            <div className="bag-card p-4">

              <h5 className="fw-bold">
                Booking Confirmed
              </h5>

              <p className="text-muted mb-2">
                Your luggage storage booking at Green Leaf Cafe
                has been confirmed.
              </p>

              <small className="text-muted">
                Today
              </small>

            </div>

          </div>

          {/* Booking reminder */}
          <div className="col-md-8 col-lg-7 mb-3">

            <div className="bag-card p-4">

              <h5 className="fw-bold">
                Booking Reminder
              </h5>

              <p className="text-muted mb-2">
                Remember to bring your luggage to the selected
                storage location at your booking time.
              </p>

              <small className="text-muted">
                Yesterday
              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;