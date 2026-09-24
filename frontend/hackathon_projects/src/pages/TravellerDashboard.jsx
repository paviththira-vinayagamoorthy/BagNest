function TravellerDashboard() {
  // Traveller dashboard main section
  return (
    <section className="py-5">

      {/* Dashboard content-a center-la maintain panna container */}
      <div className="container">

        {/* Dashboard heading */}
        <div className="mb-4">
          <h2 className="fw-bold text-success">
            Traveller Dashboard
          </h2>

          <p className="text-muted">
            Find and manage your luggage storage.
          </p>
        </div>

        {/* Dashboard summary cards */}
        <div className="row g-4">

          {/* Find storage card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold">
                Find Storage
              </h5>

              <p className="text-muted">
                Find a safe place to store your bags.
              </p>

              <button className="btn btn-success">
                Find Storage
              </button>
            </div>
          </div>

          {/* My bookings card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold">
                My Bookings
              </h5>

              <p className="text-muted">
                View your luggage storage bookings.
              </p>

              <button className="btn btn-outline-success">
                My Bookings
              </button>
            </div>
          </div>

          {/* Profile card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="fw-bold">
                My Profile
              </h5>

              <p className="text-muted">
                View your account information.
              </p>

              <button className="btn btn-outline-success">
                Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TravellerDashboard;