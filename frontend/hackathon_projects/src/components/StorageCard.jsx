import { Link } from "react-router-dom";

function StorageCard({ storage }) {

  // Oru storage location-a card format-la kaata
  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body">

        {/* Storage name */}
        <h5 className="fw-bold text-success">
          {storage.name}
        </h5>

        {/* Storage location */}
        <p className="text-muted mb-2">
          📍 {storage.address}, {storage.city}
        </p>

        {/* Storage price */}
        <p className="mb-2">
          <strong>Rs. {storage.price_per_bag}</strong> / bag
        </p>

        {/* Storage capacity */}
        <p className="mb-3">
          Capacity: {storage.capacity} bags
        </p>

        {/* Storage booking page-ku pogum button */}
        <Link
          to={`/booking/${storage.id}`}
          className="btn btn-success w-100"
        >
          Book Storage
        </Link>

      </div>
    </div>
  );
}

export default StorageCard;