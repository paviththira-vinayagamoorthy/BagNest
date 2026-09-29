import { Link, useParams } from "react-router-dom";
import storageData from "../../data/storageData";

function StorageDetails() {
  const { id } = useParams();

  // Selected storage-ah find panrom
  const storage = storageData.find(
    (item) => item.id === Number(id)
  );

  // Storage kidaikkalana
  if (!storage) {
    return (
      <div className="container py-5">
        <h2>Storage not found</h2>

        <Link to="/explore-storage">
          Back to Explore Storage
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Storage name */}
      <h1 className="fw-bold">
        {storage.name}
      </h1>

      {/* Storage location */}
      <p className="text-muted">
        {storage.location}
      </p>

      {/* Storage details */}
      <div className="card p-4 mt-4">

        <p>
          <strong>Type:</strong> {storage.type}
        </p>

        <p>
          <strong>Rating:</strong> ★ {storage.rating}
        </p>

        <p>
          <strong>Price:</strong> LKR {storage.price} / bag
        </p>

        <p>
          <strong>Available Bags:</strong>{" "}
          {storage.availableBags}
        </p>

        {/* Booking button */}
        <Link
          to={`/booking/${storage.id}`}
          className="btn btn-primary-custom"
        >
          Book Now
        </Link>

      </div>

      {/* Back button */}
      <Link
        to="/explore-storage"
        className="btn btn-link mt-3"
      >
        Back to Explore Storage
      </Link>

    </div>
  );
}

export default StorageDetails;