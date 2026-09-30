import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { apiFetch } from "../../services/api";

function Booking() {
  // URL-la irukkura storage ID-ah edukkrom
  const { id } = useParams();

  // Booking success aana next page-ku navigate panna
  const navigate = useNavigate();

  // Backend-la irundhu varra storage data
  const [storage, setStorage] = useState(null);

  // Form values
  const [bagsCount, setBagsCount] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // Error / success messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Storage details fetch pannrom
  useEffect(() => {
    async function fetchStorage() {
      try {
        // Specific storage backend-la irundhu edukkrom
        const data = await apiFetch(`/storage/${id}`);

        setStorage(data);
      } catch (error) {
        setErrorMessage(
          error.message || "Failed to load storage."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchStorage();
  }, [id]);

  // Booking form submit
  async function handleBooking(event) {
    event.preventDefault();

    // Old messages clear pannrom
    setErrorMessage("");
    setSuccessMessage("");

    // Date/time values complete-aa irukka check pannrom
    if (
      !bagsCount ||
      !bookingDate ||
      !startTime ||
      !endTime
    ) {
      setErrorMessage(
        "Please complete all booking details."
      );
      return;
    }

    // Start and end datetime create pannrom
    const startDateTime =
      `${bookingDate}T${startTime}`;

    const endDateTime =
      `${bookingDate}T${endTime}`;

    // End time start time-ku munnaadi irukka check pannrom
    if (endDateTime <= startDateTime) {
      setErrorMessage(
        "End time must be after start time."
      );
      return;
    }

    setIsBooking(true);

    try {
      // Backend booking API-ku data send pannrom
      await apiFetch("/bookings", {
        method: "POST",

        body: JSON.stringify({
          storage_id: Number(id),
          bags_count: Number(bagsCount),
          start_time: startDateTime,
          end_time: endDateTime,
        }),
      });

      // Booking successful
      setSuccessMessage(
        "Booking created successfully."
      );

      // Small delay after success
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1000);

    } catch (error) {
      // Backend business logic error show pannrom
      setErrorMessage(
        error.message || "Booking failed."
      );

    } finally {
      setIsBooking(false);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container py-5">
        <p className="text-muted">
          Loading booking details...
        </p>
      </div>
    );
  }

  // Storage fetch failed
  if (!storage) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {errorMessage || "Storage not found."}
        </div>

      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Booking page heading */}
      <h1 className="fw-bold">
        Book Storage
      </h1>

      <p className="text-muted">
        Complete your booking details.
      </p>

      {/* Selected storage */}
      <div className="card p-4 mt-4">

        <h3>
          {storage.name}
        </h3>

        <p className="text-muted">
          {storage.city}
        </p>

        <p>
          <strong>Price:</strong>{" "}
          LKR {storage.price_per_bag} / bag
        </p>

        <p>
          <strong>Capacity:</strong>{" "}
          {storage.capacity} bags
        </p>

        {/* Error message */}
        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {/* Booking form */}
        <form onSubmit={handleBooking}>

          {/* Number of bags */}
          <div className="mb-3">

            <label className="form-label">
              Number of Bags
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter number of bags"
              min="1"
              max={storage.capacity}
              value={bagsCount}
              onChange={(event) =>
                setBagsCount(event.target.value)
              }
              required
            />

            <small className="text-muted">
              Maximum capacity: {storage.capacity} bags.
            </small>

          </div>

          {/* Booking date */}
          <div className="mb-3">

            <label className="form-label">
              Booking Date
            </label>

            <input
              type="date"
              className="form-control"
              value={bookingDate}
              onChange={(event) =>
                setBookingDate(event.target.value)
              }
              required
            />

          </div>

          {/* Start time */}
          <div className="mb-3">

            <label className="form-label">
              Start Time
            </label>

            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(event) =>
                setStartTime(event.target.value)
              }
              required
            />

          </div>

          {/* End time */}
          <div className="mb-4">

            <label className="form-label">
              End Time
            </label>

            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(event) =>
                setEndTime(event.target.value)
              }
              required
            />

          </div>

          {/* Confirm booking */}
          <button
            type="submit"
            className="btn btn-primary-custom"
            disabled={isBooking}
          >
            {isBooking
              ? "Creating Booking..."
              : "Confirm Booking"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Booking;