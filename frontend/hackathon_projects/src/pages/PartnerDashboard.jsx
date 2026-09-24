// Different pages-ku navigate panna Link import panrom
import { Link } from "react-router-dom";

function PartnerDashboard() {

  // Partner dashboard main section
  return (
    <section className="py-5">

      {/* Dashboard content-a center-la maintain panna container */}
      <div className="container">

        {/* Dashboard heading */}
        <div className="mb-4">
          <h2 className="fw-bold text-success">
            Partner Dashboard
          </h2>

          <p className="text-muted">
            Manage your storage locations and bookings.
          </p>
        </div>

        {/* Partner dashboard summary cards */}
        <div className="row g-4">

          {/* Storage management card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                Manage Storage
              </h5>

              <p className="text-muted">
                Add and manage your luggage storage locations.
              </p>

              {/* Manage Storage page-ku navigate panna */}
              <Link
                to="/manage-storage"
                className="btn btn-success"
              >
                Manage Storage
              </Link>

            </div>
          </div>

          {/* Booking management card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                Bookings
              </h5>

              <p className="text-muted">
                View and manage traveller bookings.
              </p>

              {/* Partner Bookings page-ku navigate panna */}
              <Link
                to="/partner-bookings"
                className="btn btn-outline-success"
              >
                View Bookings
              </Link>

            </div>
          </div>

          {/* Reports card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                Reports
              </h5>

              <p className="text-muted">
                View storage and booking reports.
              </p>

              {/* Reports page-ku navigate panna */}
              <Link
                to="/reports"
                className="btn btn-outline-success"
              >
                View Reports
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PartnerDashboard;