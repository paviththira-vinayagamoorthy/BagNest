function TravellerDashboard() {
  return (
    <div className="container py-5">

      {/* Dashboard heading */}
      <h1 className="fw-bold">
        Traveller Dashboard
      </h1>

      <p className="text-muted">
        Welcome to your BagNest dashboard.
      </p>

      {/* Dashboard options */}
      <div className="row mt-4">

        <div className="col-md-4 mb-3">
          <div className="card p-4 h-100">
            <h4>Explore Storage</h4>

            <p className="text-muted">
              Find a safe place to store your luggage.
            </p>

            <a
              href="/explore-storage"
              className="btn btn-primary-custom"
            >
              Explore Storage
            </a>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-4 h-100">
            <h4>My Bookings</h4>

            <p className="text-muted">
              View your luggage storage bookings.
            </p>

            <button
              className="btn btn-primary-custom"
              disabled
            >
              My Bookings
            </button>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-4 h-100">
            <h4>Notifications</h4>

            <p className="text-muted">
              Check your booking notifications.
            </p>

            <button
              className="btn btn-primary-custom"
              disabled
            >
              Notifications
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default TravellerDashboard;