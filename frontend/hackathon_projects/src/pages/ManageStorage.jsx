import { useState } from "react";
import storageData from "../data/storageData";

function ManageStorage() {

  // Storage list-a state-la store panna
  const [storages, setStorages] = useState(storageData);

  // New storage name-a store panna
  const [name, setName] = useState("");

  // New storage location-a store panna
  const [location, setLocation] = useState("");

  // New storage price-a store panna
  const [price, setPrice] = useState("");

  // New storage capacity-a store panna
  const [available, setAvailable] = useState("");

  // New storage add panna function
  function handleAddStorage(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    // New storage object create panna
    const newStorage = {
      id: storages.length + 1,
      name,
      location,
      price,
      available
    };

    // Existing storage list-oda new storage-a add panna
    setStorages([
      ...storages,
      newStorage
    ]);

    // Form fields-a clear panna
    setName("");
    setLocation("");
    setPrice("");
    setAvailable("");
  }

  return (
    <section className="py-5">

      <div className="container">

        {/* Page heading */}
        <div className="mb-4">

          <h2 className="fw-bold text-success">
            Manage Storage
          </h2>

          <p className="text-muted">
            Add and manage your storage locations.
          </p>

        </div>

        {/* Add storage form */}
        <div className="card border-0 shadow-sm p-4 mb-5">

          <h5 className="fw-bold mb-4">
            Add New Storage
          </h5>

          <form onSubmit={handleAddStorage}>

            <div className="row g-3">

              {/* Storage name */}
              <div className="col-md-6">

                <label className="form-label">
                  Storage Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter storage name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

              </div>

              {/* Storage location */}
              <div className="col-md-6">

                <label className="form-label">
                  Location
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />

              </div>

              {/* Storage price */}
              <div className="col-md-6">

                <label className="form-label">
                  Price Per Bag
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

              </div>

              {/* Storage capacity */}
              <div className="col-md-6">

                <label className="form-label">
                  Available Bags
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter available bags"
                  value={available}
                  onChange={(e) => setAvailable(e.target.value)}
                  required
                />

              </div>

            </div>

            {/* Add storage button */}
            <button
              type="submit"
              className="btn btn-success mt-4"
            >
              Add Storage
            </button>

          </form>

        </div>

        {/* Existing storage section */}
        <div className="mb-4">

          <h4 className="fw-bold">
            Storage Locations
          </h4>

          <p className="text-muted">
            Current storage locations.
          </p>

        </div>

        {/* Storage list */}
        <div className="row g-4">

          {storages.map((storage) => (

            <div
              className="col-md-4"
              key={storage.id}
            >

              <div className="card border-0 shadow-sm h-100 p-4">

                <h5 className="fw-bold text-success">
                  {storage.name}
                </h5>

                <p className="text-muted">
                  📍 {storage.location}
                </p>

                <p>
                  <strong>
                    Rs. {storage.price}
                  </strong>{" "}
                  / bag
                </p>

                <p className="mb-0">
                  Available: {storage.available} bags
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ManageStorage;