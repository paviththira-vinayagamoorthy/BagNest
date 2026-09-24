import { useState } from "react";

function CheckInOut() {

  // Booking reference-a store panna state
  const [bookingId, setBookingId] = useState("");

  // Check-in / Check-out status-a store panna state
  const [status, setStatus] = useState("");

  // Check-in button handle panna function
  function handleCheckIn() {

    // Booking ID irundha check-in status set panna
    if (bookingId) {
      setStatus("Checked In");
    }
  }

  // Check-out button handle panna function
  function handleCheckOut() {

    // Booking ID irundha check-out status set panna
    if (bookingId) {
      setStatus("Checked Out");
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

              {/* Booking reference input */}
              <div className="mb-4">

                <label className="form-label">
                  Booking Reference
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter booking reference"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
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
                  <strong>Status:</strong> {status}
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