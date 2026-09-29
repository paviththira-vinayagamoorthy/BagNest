import { Link } from "react-router-dom";

function TravellerDashboard() {
  return (
    <div className="dashboard-page py-5">

      <div className="container">

        {/* Dashboard heading */}
        <h1 className="page-title">
          Traveller Dashboard
        </h1>

        <p className="page-description">
          Welcome to your BagNest dashboard.
        </p>

        {/* Dashboard options */}
        <div className="row mt-4">

          {/* Explore Storage */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Explore Storage
              </h4>

              <p>
                Find a safe place to store your luggage.
              </p>

              <Link
                to="/explore-storage"
                className="btn btn-primary-custom"
              >
                Explore Storage
              </Link>

            </div>

          </div>

          {/* My Bookings */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                My Bookings
              </h4>

              <p>
                View your luggage storage bookings.
              </p>

              <Link
                to="/my-bookings"
                className="btn btn-primary-custom"
              >
                My Bookings
              </Link>

            </div>

          </div>

          {/* Notifications */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Notifications
              </h4>

              <p>
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

    </div>
  );
}

export default TravellerDashboard;