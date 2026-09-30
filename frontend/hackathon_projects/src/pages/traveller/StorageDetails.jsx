import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { apiFetch, shortTime } from "../../api/api";

function StorageDetails() {
  // URL-la irukkura storage ID
  const { id } = useParams();

  const navigate = useNavigate();

  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend: GET /storage/{id}
  useEffect(() => {
    apiFetch(`/storage/${id}`, { auth: false })
      .then(setStorage)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );
  }

  // Storage kidaikkalana
  if (error || !storage) {
    return (
      <div className="container py-5">
        <h2>Storage not found</h2>

        <Link to="/explore-storage">
          Back to Explore Storage
        </Link>
      </div>
    );
  }

  // Book Now click pannumbothu login check pannrom
  function handleBookNow() {
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    // Login pannala-na Login page-ku pogum, back vara redirect
    if (!isLoggedIn) {
      navigate(`/login?redirect=/booking/${storage.id}`);
      return;
    }

    // Partner book panna mudiyaadhu
    if (localStorage.getItem("userType") !== "traveller") {
      alert("Only travellers can book storage.");
      return;
    }

    navigate(`/booking/${storage.id}`);
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold">{storage.name}</h1>

      <p className="text-muted">
        {storage.address}, {storage.city}
      </p>

      <div className="card p-4 mt-4">
        <p>
          <strong>Type:</strong> {storage.storage_type}
        </p>

        <p>
          <strong>Opening Hours:</strong>{" "}
          {shortTime(storage.opening_time)} -{" "}
          {shortTime(storage.closing_time)}
        </p>

        <p>
          <strong>Price:</strong> LKR {storage.price_per_bag} / bag
        </p>

        <p>
          <strong>Capacity:</strong> {storage.capacity} bags
        </p>

        <button
          type="button"
          className="btn btn-primary-custom"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>

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
