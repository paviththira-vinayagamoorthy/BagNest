import { useNavigate } from "react-router-dom";

function StorageCard({ storage }) {
  const navigate = useNavigate();

  // Storage details paakka login check pannrom
  function handleViewStorage() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    // Login pannala na Login page-ku pogum
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Login aagirundha storage details-ku pogum
    navigate(`/storage/${storage.id}`);
  }

  return (
    <div className="storage-card">

      <div className="storage-card-top">

        <span className="storage-type">
          Storage
        </span>

        <span className="storage-rating">
          ★ {storage.rating || "N/A"}
        </span>

      </div>

      <div className="storage-placeholder">
        BAG
      </div>

      <div className="storage-card-body">

        <h3>{storage.name}</h3>

        <p className="storage-location">
          {storage.city}
        </p>

        <div className="storage-meta">

          <div>
            <span>Price</span>

            <strong>
              LKR {storage.price_per_bag} / bag
            </strong>
          </div>

          <div>
            <span>Capacity</span>

            <strong>
              {storage.capacity} bags
            </strong>
          </div>

        </div>

        <button
          type="button"
          className="storage-card-button"
          onClick={handleViewStorage}
        >
          View Storage
        </button>

      </div>
    </div>
  );
}

export default StorageCard;