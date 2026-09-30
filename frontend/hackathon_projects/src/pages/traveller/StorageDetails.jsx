import {Link,useNavigate,useParams,} from "react-router-dom";

import storageData from "../../data/storageData";

function StorageDetails() {
  // URL-la irukkura storage ID-ah edukkrom
  const { id } = useParams();

  // Page navigation-ku use pannrom
  const navigate = useNavigate();

  // Selected storage-ah find panrom
  const storage = storageData.find(
    (item) => item.id === Number(id)
  );

  // Storage kidaikkalana
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
      navigate(`/login?redirect=/booking/${storage.id}`);
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
        {storage.location}
      </p>

      {/* Storage details */}
      <div className="card p-4 mt-4">

        <p>
          <strong>Type:</strong>{" "}
          {storage.type}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          ★ {storage.rating}
        </p>

        <p>
          <strong>Price:</strong>{" "}
          LKR {storage.price} / bag
        </p>

        <p>
          <strong>Available Bags:</strong>{" "}
          {storage.availableBags}
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