import { Link } from "react-router-dom";

function StorageCard({ storage }) {
  return (
    <div className="storage-card">

      <div className="storage-card-top">
        <span className="storage-type">
          {storage.type}
        </span>

        <span className="storage-rating">
          ★ {storage.rating}
        </span>
      </div>

      <div className="storage-placeholder">
        BAG
      </div>

      <div className="storage-card-body">

        <h3>{storage.name}</h3>

        <p className="storage-location">
          {storage.location}
        </p>

        <div className="storage-meta">

          <div>
            <span>Price</span>
            <strong>
              LKR {storage.price} / bag
            </strong>
          </div>

          <div>
            <span>Available</span>
            <strong>
              {storage.availableBags} bags
            </strong>
          </div>

        </div>

        <Link
          to={`/storage/${storage.id}`}
          className="storage-card-button"
        >
          View Storage
        </Link>

      </div>
    </div>
  );
}

export default StorageCard;