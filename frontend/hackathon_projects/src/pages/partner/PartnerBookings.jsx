import { useEffect, useState } from "react";

import { apiFetch, formatDate, formatTime } from "../../api/api";

const STATUS_STYLE = {
  CONFIRMED: "text-bg-success",
  CHECKED_IN: "text-bg-primary",
  CHECKED_OUT: "text-bg-secondary",
  CANCELLED: "text-bg-danger",
};

function PartnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend: GET /bookings/partner
  async function loadBookings() {
    try {
      const data = await apiFetch("/bookings/partner");
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

  // action = "check-in" or "check-out"
  // Backend: PUT /bookings/{id}/check-in  |  /check-out
  async function handleAction(bookingId, action) {
    setError("");

    try {
      await apiFetch(`/bookings/${bookingId}/${action}`, {
        method: "PUT",
      });

      loadBookings();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-section py-5">
      <div className="container">
        <h1 className="page-title">Partner Bookings</h1>

        <p className="page-description">
          View and manage traveller bookings for your storage.
        </p>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {loading && <p>Loading bookings...</p>}

        {!loading && bookings.length === 0 && (
          <p className="text-muted">
            No bookings for your storage yet.
          </p>
        )}

        <div className="row mt-4">
          {bookings.map((booking) => (
            <div
              className="col-md-6 col-lg-5 mb-4"
              key={booking.id}
            >
              <div className="bag-card p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h4 className="mb-0">
                    #{booking.reference_code}
                  </h4>

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
                  <strong>Traveller:</strong>{" "}
                  {booking.traveller_name}
                </p>

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

                <p className="mb-4">
                  <strong>Total:</strong> LKR{" "}
                  {booking.total_price.toFixed(2)}
                </p>

                {/* Status-ku yetha button */}
                <div className="d-flex gap-2">
                  {booking.status === "CONFIRMED" && (
                    <button
                      type="button"
                      className="btn btn-primary-custom"
                      onClick={() =>
                        handleAction(booking.id, "check-in")
                      }
                    >
                      Check In
                    </button>
                  )}

                  {booking.status === "CHECKED_IN" && (
                    <button
                      type="button"
                      className="btn btn-primary-custom"
                      onClick={() =>
                        handleAction(booking.id, "check-out")
                      }
                    >
                      Check Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnerBookings;
