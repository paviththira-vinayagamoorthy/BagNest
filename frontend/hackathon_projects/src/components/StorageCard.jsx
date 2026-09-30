import { Link } from "react-router-dom";

import { shortTime } from "../api/api";

// Backend StorageResponse fields:
// id, name, address, city, capacity, price_per_bag,
// opening_time, closing_time, storage_type, active
function StorageCard({ storage }) {
  return (
    <div className="storage-card">
      <div className="storage-card-top">
        <span className="storage-type">
          {storage.storage_type}
        </span>

        <span className="storage-rating">
          {shortTime(storage.opening_time)} -{" "}
          {shortTime(storage.closing_time)}
        </span>
      </div>

      <div className="storage-placeholder">
        BAG
      </div>

      <div className="storage-card-body">
        <h3>{storage.name}</h3>

        <p className="storage-location">
          {storage.address}, {storage.city}
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
