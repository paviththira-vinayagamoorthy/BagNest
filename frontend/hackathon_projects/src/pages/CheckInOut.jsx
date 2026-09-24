import { useState } from "react";
import API_URL from "../api/api";

function CheckInOut() {

  // Booking ID-a store panna state
  const [bookingId, setBookingId] = useState("");

  // Check-in / Check-out status-a store panna state
  const [status, setStatus] = useState("");

  // Check-in button handle panna function
  async function handleCheckIn() {

    if (!bookingId) {
      return;
    }

    try {

      // Login pannumbodhu save panna user details-a eduka
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user || !user.access_token) {
        alert("Please login first.");
        return;
      }

      // Backend check-in API call
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/check-in`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${user.access_token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {

        setStatus(
          data.checkin_status || "Checked In"
        );

      } else {

        alert(
          data.detail ||
          "Check-in failed"
        );

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to backend.");

    }
  }

  // Check-out button handle panna function
  async function handleCheckOut() {

    if (!bookingId) {
      return;
    }

    try {

      // Login pannumbodhu save panna user details-a eduka
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user || !user.access_token) {
        alert("Please login first.");
        return;
      }

      // Backend check-out API call
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/check-out`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${user.access_token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {

        setStatus(
          data.checkin_status || "Checked Out"
        );

      } else {

        alert(
          data.detail ||
          "Check-out failed"
        );

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to backend.");

    }
  }

  return (
    <section className="py-5">

      <div className="container">

        {/* Page heading */}
        <div className="mb-4">

          <h2 className="fw-bold text-success">
            Check-in / Check-out
          </h2>

          <p className="text-muted">
            Manage traveller luggage check-in and check-out.
          </p>

        </div>

        {/* Check-in / Check-out card */}
        <div className="row justify-content-center">

          <div className="col-md-7 col-lg-6">

            <div className="card border-0 shadow-sm p-4">

              {/* Booking ID input */}
              <div className="mb-4">

                <label className="form-label">
                  Booking ID
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter booking ID"
                  value={bookingId}
                  onChange={(e) =>
                    setBookingId(e.target.value)
                  }
                />

              </div>

              {/* Check-in button */}
              <button
                type="button"
                className="btn btn-success w-100 mb-3"
                onClick={handleCheckIn}
              >
                Check In
              </button>

              {/* Check-out button */}
              <button
                type="button"
                className="btn btn-outline-success w-100"
                onClick={handleCheckOut}
              >
                Check Out
              </button>

              {/* Current status */}
              {status && (
                <div className="alert alert-success mt-4 mb-0">
                  <strong>Status:</strong>{" "}
                  {status}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CheckInOut;