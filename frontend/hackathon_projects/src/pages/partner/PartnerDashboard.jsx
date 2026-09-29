import { Link } from "react-router-dom";

function PartnerDashboard() {
  return (
    <div className="dashboard-page py-5">

      <div className="container">

        {/* Dashboard heading */}
        <h1 className="page-title">
          Partner Dashboard
        </h1>

        <p className="page-description">
          Manage your storage location and bookings.
        </p>

        {/* Dashboard options */}
        <div className="row mt-4">

          {/* Manage Storage */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Manage Storage
              </h4>

              <p>
                Add and manage your luggage storage details.
              </p>

              <Link
                to="/manage-storage"
                className="btn btn-primary-custom"
              >
                Manage Storage
              </Link>

            </div>

          </div>

          {/* Partner Bookings */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Bookings
              </h4>

              <p>
                View and manage traveller bookings.
              </p>

              <Link
                to="/partner-bookings"
                className="btn btn-primary-custom"
              >
                View Bookings
              </Link>

            </div>

          </div>

          {/* Reports */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Reports
              </h4>

              <p>
                View storage and booking reports.
              </p>

              <Link
                to="/reports"
                className="btn btn-primary-custom"
              >
                View Reports
              </Link>

            </div>

          </div>

          {/* Partner Profile */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                My Profile
              </h4>

              <p>
                View and manage your partner profile.
              </p>

              <Link
                to="/partner-profile"
                className="btn btn-primary-custom"
              >
                View Profile
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
                Check your storage and booking notifications.
              </p>

              <Link
                to="/partner-notifications"
                className="btn btn-primary-custom"
              >
                Notifications
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PartnerDashboard;