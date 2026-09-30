import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiFetch, formatDate, formatTime } from "../../api/api";

// Booking status -> Bootstrap badge colour
const STATUS_STYLE = {
  CONFIRMED: "text-bg-success",
  CHECKED_IN: "text-bg-primary",
  CHECKED_OUT: "text-bg-secondary",
  CANCELLED: "text-bg-danger",
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend: GET /bookings/my
  async function loadBookings() {
    try {
      const data = await apiFetch("/bookings/my");
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // Backend: PUT /bookings/{id}/cancel
  async function handleCancel(bookingId) {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await apiFetch(`/bookings/${bookingId}/cancel`, {
        method: "PUT",
      });

      loadBookings();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="booking-page py-5">
      <div className="container">
        <h1 className="page-title">My Bookings</h1>

        <p className="page-description">
          View your luggage storage bookings.
        </p>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {loading && <p>Loading bookings...</p>}

        <div className="row mt-4">
          {/* Booking illa-na empty state */}
          {!loading && bookings.length === 0 && (
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="empty-state">
                <h4>No bookings yet</h4>

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
          )}

          {bookings.map((booking) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={booking.id}
            >
              <div className="bag-card p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="mb-0">
                    #{booking.reference_code}
                  </h5>

                  <span
                    className={`badge ${
                      STATUS_STYLE[booking.status] ||
                      "text-bg-secondary"
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                </div>

                <p className="mb-2">
                  <strong>Storage:</strong> {booking.storage_name}
                </p>

                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {formatDate(booking.start_time)}
                </p>

                <p className="mb-2">
                  <strong>Time:</strong>{" "}
                  {formatTime(booking.start_time)} -{" "}
                  {formatTime(booking.end_time)}
                </p>

                <p className="mb-2">
                  <strong>Bags:</strong> {booking.bags_count}
                </p>

                <p className="mb-3">
                  <strong>Total:</strong> LKR{" "}
                  {booking.total_price.toFixed(2)}
                </p>

                {booking.status === "CONFIRMED" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
