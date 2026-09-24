import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {

  // Booking details-a store panna state
  const [booking, setBooking] = useState(null);

  // Page open aagumbodhu localStorage-la irundhu booking-a eduka
  useEffect(() => {

    const savedBooking =
      JSON.parse(
        localStorage.getItem("booking")
      );

    // Booking irundha state-la save panna
    setBooking(savedBooking);

  }, []);

  // Booking illa-na message kaata
  if (!booking) {
    return (
      <section className="py-5">

        <div className="container text-center">

          <h2 className="fw-bold text-success">
            My Bookings
          </h2>

          <p className="text-muted mt-3">
            You don't have any bookings yet.
          </p>

          <Link
            to="/traveller-dashboard"
            className="btn btn-success mt-2"
          >
            Find Storage
          </Link>

        </div>

      </section>
    );
  }

  // Booking irundha booking details display panna
  return (
    <section className="py-5">

      <div className="container">

        {/* Page heading */}
        <div className="mb-4">

          <h2 className="fw-bold text-success">
            My Bookings
          </h2>

          <p className="text-muted">
            View your luggage storage booking details.
          </p>

        </div>

        {/* Booking details card */}
        <div className="row">

          <div className="col-md-7 col-lg-6">

            <div className="card border-0 shadow-sm p-4">

              {/* Storage name */}
              <h4 className="fw-bold">
                {booking.storageName}
              </h4>

              {/* Storage location */}
              <p className="text-muted">
                📍 {booking.location}
              </p>

              <hr />

              {/* Number of bags */}
              <p>
                <strong>Number of Bags:</strong>{" "}
                {booking.bags}
              </p>

              {/* Start date */}
              <p>
                <strong>Start Date:</strong>{" "}
                {booking.startDate}
              </p>

              {/* End date */}
              <p>
                <strong>End Date:</strong>{" "}
                {booking.endDate}
              </p>

              {/* Price */}
              <p>
                <strong>Price:</strong>{" "}
                Rs. {booking.price} / bag
              </p>

              {/* Booking status */}
              <p className="mb-0">
                <strong>Status:</strong>{" "}
                <span className="badge bg-success">
                  Confirmed
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MyBookings;