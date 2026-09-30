import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { apiFetch } from "../../services/api";

function StorageDetails() {
  // URL-la irukkura storage ID-ah edukkrom
  const { id } = useParams();

  // Page navigation-ku use pannrom
  const navigate = useNavigate();

  // Backend-la irundhu varra storage data
  const [storage, setStorage] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Error message store panna
  const [errorMessage, setErrorMessage] = useState("");

  // Page load aagumbothu specific storage fetch pannrom
  useEffect(() => {
    async function fetchStorage() {
      try {
        // GET /storage/{storage_id}
        const data = await apiFetch(`/storage/${id}`);

        // Backend data state-la save pannrom
        setStorage(data);
      } catch (error) {
        // Backend error message show pannrom
        setErrorMessage(
          error.message || "Failed to load storage."
        );
      } finally {
        // Loading stop pannrom
        setIsLoading(false);
      }
    }

    fetchStorage();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container py-5">
        <p className="text-muted">
          Loading storage details...
        </p>
      </div>
    );
  }

  // Storage fetch error
  if (errorMessage) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {errorMessage}
        </div>

        <Link to="/explore-storage">
          Back to Explore Storage
        </Link>

      </div>
    );
  }

  // Storage data kidaikkalana
  if (!storage) {
    return (
      <div className="container py-5">

        <h2>
          Storage not found
        </h2>

        <Link to="/explore-storage">
          Back to Explore Storage
        </Link>

      </div>
    );
  }

  // Book Now click pannumbothu login check pannrom
  function handleBookNow() {
    // User login pannirukkaa-nu check pannrom
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    // Login pannala-na Login page-ku pogum
    // Storage ID-ah remember pannrom
    if (!isLoggedIn) {
      navigate(
        `/login?redirect=/booking/${storage.id}`
      );
      return;
    }

    // Already login pannirundha Booking page-ku pogum
    navigate(`/booking/${storage.id}`);
  }

  return (
    <div className="container py-5">

      {/* Storage name */}
      <h1 className="fw-bold">
        {storage.name}
      </h1>

      {/* Storage location */}
      <p className="text-muted">
        {storage.city}
      </p>

      {/* Storage details */}
      <div className="card p-4 mt-4">

        <p>
          <strong>Address:</strong>{" "}
          {storage.address}
        </p>

        <p>
          <strong>Price:</strong>{" "}
          LKR {storage.price_per_bag} / bag
        </p>

        <p>
          <strong>Capacity:</strong>{" "}
          {storage.capacity} bags
        </p>

        <p>
          <strong>Opening Time:</strong>{" "}
          {storage.opening_time}
        </p>

        <p>
          <strong>Closing Time:</strong>{" "}
          {storage.closing_time}
        </p>

        {/* Booking button */}
        <button
          type="button"
          className="btn btn-primary-custom"
          onClick={handleBookNow}
        >
          Book Now
        </button>

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