import { useParams } from "react-router-dom";
import storageData from "../../data/storageData";

function Booking() {
  const { id } = useParams();

  // Selected storage-ah find panrom
  const storage = storageData.find(
    (item) => item.id === Number(id)
  );

  if (!storage) {
    return (
      <div className="container py-5">
        <h2>Storage not found</h2>
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
          {storage.location}
        </p>

        <p>
          <strong>Price:</strong>{" "}
          LKR {storage.price} / bag
        </p>

        {/* Booking form */}
        <form>

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
            />
          </div>

          {/* Booking date */}
          <div className="mb-3">
            <label className="form-label">
              Booking Date
            </label>

            <input
              type="date"
              className="form-control"
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
            />
          </div>

          {/* Confirm booking */}
          <button
            type="submit"
            className="btn btn-primary-custom"
          >
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default Booking;