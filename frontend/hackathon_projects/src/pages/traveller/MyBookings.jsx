import { Link } from "react-router-dom";

function MyBookings() {
  return (
    <div className="booking-page py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          My Bookings
        </h1>

        <p className="page-description">
          View your luggage storage bookings.
        </p>

        {/* Booking list */}
        <div className="row mt-4">

          <div className="col-md-6 col-lg-4 mb-4">

            <div className="empty-state">

              <h4>
                No bookings yet
              </h4>

              <p>
                You have not made any storage bookings yet.
              </p>

              <Link
                to="/explore-storage"
                className="btn btn-primary-custom"
              >
                Explore Storage
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyBookings;