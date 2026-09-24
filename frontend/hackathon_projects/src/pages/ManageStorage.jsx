import { useEffect, useState } from "react";
import API_URL from "../api/api";

function ManageStorage() {

  // Storage list-a state-la store panna
  const [storages, setStorages] = useState([]);

  // New storage values-a store panna states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [pricePerBag, setPricePerBag] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  // Backend-la irundhu storage locations fetch panna
  useEffect(() => {

    async function fetchStorages() {

      try {

        const response = await fetch(
          `${API_URL}/storage`
        );

        const data = await response.json();

        if (response.ok) {
          setStorages(data);
        }

      } catch (error) {

        console.error(
          "Unable to fetch storage:",
          error
        );

      }
    }

    fetchStorages();

  }, []);

  // New storage add panna function
  async function handleAddStorage(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    try {

      // Login pannumbodhu save panna user details-a eduka
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      // Access token illana storage add panna mudiyadhu
      if (!user || !user.access_token) {

        alert("Please login as a storage partner.");

        return;
      }

      // Backend-ku new storage details send panrom
      const response = await fetch(
        `${API_URL}/storage`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.access_token}`
          },

          body: JSON.stringify({
            name: name,
            address: address,
            city: city,
            capacity: Number(capacity),
            price_per_bag: Number(pricePerBag),
            opening_time: openingTime,
            closing_time: closingTime
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Storage added successfully!");

        // New storage-a list-la add panrom
        setStorages([
          ...storages,
          data
        ]);

        // Form fields clear panrom
        setName("");
        setAddress("");
        setCity("");
        setCapacity("");
        setPricePerBag("");
        setOpeningTime("");
        setClosingTime("");

      } else {

        alert(
          data.detail ||
          "Unable to add storage"
        );

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to backend.");

    }
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
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>

              {/* Storage address */}
              <div className="col-md-6">

                <label className="form-label">
                  Address
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  required
                />

              </div>

              {/* Storage city */}
              <div className="col-md-6">

                <label className="form-label">
                  City
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
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
                  value={pricePerBag}
                  onChange={(e) =>
                    setPricePerBag(e.target.value)
                  }
                  required
                />

              </div>

              {/* Storage capacity */}
              <div className="col-md-6">

                <label className="form-label">
                  Capacity
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter storage capacity"
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(e.target.value)
                  }
                  required
                />

              </div>

              {/* Opening time */}
              <div className="col-md-6">

                <label className="form-label">
                  Opening Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={openingTime}
                  onChange={(e) =>
                    setOpeningTime(e.target.value)
                  }
                  required
                />

              </div>

              {/* Closing time */}
              <div className="col-md-6">

                <label className="form-label">
                  Closing Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={closingTime}
                  onChange={(e) =>
                    setClosingTime(e.target.value)
                  }
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
                  📍 {storage.address}, {storage.city}
                </p>

                <p>
                  <strong>
                    Rs. {storage.price_per_bag}
                  </strong>{" "}
                  / bag
                </p>

                <p className="mb-0">
                  Capacity: {storage.capacity} bags
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