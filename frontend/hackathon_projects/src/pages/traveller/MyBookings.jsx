import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiFetch } from "../../services/api";

function MyBookings() {
  // Backend-la irundhu bookings store panna
  const [bookings, setBookings] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Cancel loading state
  const [cancellingId, setCancellingId] = useState(null);

  // Error message store panna
  const [errorMessage, setErrorMessage] = useState("");

  // Success message store panna
  const [successMessage, setSuccessMessage] = useState("");

  // My bookings fetch pannra function
  async function fetchBookings() {
    try {
      setErrorMessage("");

      // Logged-in traveller bookings fetch pannrom
      const data = await apiFetch("/bookings/my");

      // Backend response save pannrom
      setBookings(data);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to load bookings."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Page load aagumbothu bookings fetch pannrom
  useEffect(() => {
    fetchBookings();
  }, []);

  // Booking cancel handle pannrom
  async function handleCancelBooking(bookingId) {
    // User confirmation
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    // Old messages clear pannrom
    setErrorMessage("");
    setSuccessMessage("");

    // Current booking cancel loading
    setCancellingId(bookingId);

    try {
      // Backend cancel API call
      await apiFetch(
        `/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
        }
      );

      // Success message
      setSuccessMessage(
        "Booking cancelled successfully."
      );

      // Updated bookings list fetch pannrom
      await fetchBookings();

    } catch (error) {
      // Backend error show pannrom
      setErrorMessage(
        error.message || "Failed to cancel booking."
      );

    } finally {
      // Cancel loading stop pannrom
      setCancellingId(null);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="booking-page py-5">

        <div className="container">

          <h1 className="page-title">
            My Bookings
          </h1>

          <p className="text-muted">
            Loading your bookings...
          </p>

        </div>

      </div>
    );
  }

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

        {/* Success message */}
        {successMessage && (
          <div className="alert alert-success mt-4">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">
            {errorMessage}
          </div>
        )}

        {/* No bookings */}
        {!errorMessage &&
          bookings.length === 0 && (
            <div className="row mt-4">

              <div className="col-md-6 col-lg-4">

                <div className="empty-state">

                  <h4>
                    No bookings yet
                  </h4>

                  <p>
                    You have not made any storage
                    bookings yet.
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
          )}

        {/* Booking list */}
        {!errorMessage &&
          bookings.length > 0 && (
            <div className="row mt-4">

              {bookings.map((booking) => {

                // Booking status check pannrom
                const isCancelled =
                  booking.status === "CANCELLED";

                return (
                  <div
                    className="col-md-6 col-lg-4 mb-4"
                    key={booking.id}
                  >

                    <div className="card p-4 h-100">

                      <h4 className="fw-bold">
                        Booking #{booking.id}
                      </h4>

                      <p>
                        <strong>
                          Storage ID:
                        </strong>{" "}
                        {booking.storage_id}
                      </p>

                      <p>
                        <strong>
                          Bags:
                        </strong>{" "}
                        {booking.bags_count}
                      </p>

                      <p>
                        <strong>
                          Start:
                        </strong>{" "}
                        {booking.start_time}
                      </p>

                      <p>
                        <strong>
                          End:
                        </strong>{" "}
                        {booking.end_time}
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {booking.status}
                      </p>

                      {/* Cancel button */}
                      {!isCancelled && (
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-2"
                          onClick={() =>
                            handleCancelBooking(
                              booking.id
                            )
                          }
                          disabled={
                            cancellingId ===
                            booking.id
                          }
                        >
                          {cancellingId ===
                          booking.id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </div>

    </div>
  );
}

export default MyBookings;