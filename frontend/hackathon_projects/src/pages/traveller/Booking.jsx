import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { apiFetch, shortTime } from "../../api/api";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [bags, setBags] = useState(1);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Backend: GET /storage/{id}
  useEffect(() => {
    apiFetch(`/storage/${id}`, { auth: false })
      .then(setStorage)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (loadError || !storage) {
    return (
      <div className="container py-5">
        <h2>Storage not found</h2>
        <Link to="/explore-storage">Back to Explore Storage</Link>
      </div>
    );
  }

  const totalPrice = storage.price_per_bag * Number(bags || 0);

  // Backend: POST /bookings
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: {
          storage_id: Number(id),
          bags_count: Number(bags),
          // Timezone conversion illama local time-ah anuppurom
          // (opening / closing hours check-ku ithu thevai)
          start_time: `${date}T${startTime}:00`,
          end_time: `${date}T${endTime}:00`,
        },
      });

      navigate("/my-bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold">Book Storage</h1>

      <p className="text-muted">Complete your booking details.</p>

      <div className="card p-4 mt-4">
        <h3>{storage.name}</h3>

        <p className="text-muted">
          {storage.address}, {storage.city}
        </p>

        <p>
          <strong>Price:</strong> LKR {storage.price_per_bag} / bag
        </p>

        <p>
          <strong>Opening Hours:</strong>{" "}
          {shortTime(storage.opening_time)} -{" "}
          {shortTime(storage.closing_time)}
        </p>

        <p>
          <strong>Capacity:</strong> {storage.capacity} bags
        </p>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Number of bags */}
          <div className="mb-3">
            <label className="form-label">Number of Bags</label>

            <input
              type="number"
              className="form-control"
              placeholder="Enter number of bags"
              min="1"
              max={storage.capacity}
              value={bags}
              onChange={(event) => setBags(event.target.value)}
              required
            />

            <small className="text-muted">
              You can book up to {storage.capacity} bags. Availability
              is checked for your selected time.
            </small>
          </div>

          {/* Booking date */}
          <div className="mb-3">
            <label className="form-label">Booking Date</label>

            <input
              type="date"
              className="form-control"
              value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          {/* Start time */}
          <div className="mb-3">
            <label className="form-label">Start Time</label>

            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </div>

          {/* End time */}
          <div className="mb-3">
            <label className="form-label">End Time</label>

            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </div>

          <p className="fw-bold mb-4">
            Total: LKR {totalPrice.toFixed(2)}
          </p>

          <button
            type="submit"
            className="btn btn-primary-custom"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
