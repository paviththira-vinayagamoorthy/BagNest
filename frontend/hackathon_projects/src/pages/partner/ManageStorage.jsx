import { useState } from "react";

import { apiFetch } from "../../services/api";

function ManageStorage() {
  // Form values
  const [storageName, setStorageName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [storageType, setStorageType] = useState("");
  const [pricePerBag, setPricePerBag] = useState("");
  const [capacity, setCapacity] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  // UI states
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Storage save pannra function
  async function handleSaveStorage(event) {
    event.preventDefault();

    // Old messages clear pannrom
    setErrorMessage("");
    setSuccessMessage("");

    // Button loading state
    setIsLoading(true);

    try {
      // Backend create storage API
      await apiFetch("/storage", {
        method: "POST",

        body: JSON.stringify({
          name: storageName,
          address: address,
          city: city,
          capacity: Number(capacity),
          price_per_bag: Number(pricePerBag),
          opening_time: openingTime,
          closing_time: closingTime,
        }),
      });

      // Success message
      setSuccessMessage(
        "Storage location added successfully."
      );

      // Form clear pannrom
      setStorageName("");
      setAddress("");
      setCity("");
      setStorageType("");
      setPricePerBag("");
      setCapacity("");
      setOpeningTime("");
      setClosingTime("");

    } catch (error) {
      // Backend error show pannrom
      setErrorMessage(
        error.message || "Failed to save storage."
      );
    } finally {
      // Loading stop pannrom
      setIsLoading(false);
    }
  }

  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Manage Storage
        </h1>

        <p className="page-description">
          Add and manage your luggage storage location.
        </p>

        {/* Storage form */}
        <div className="row mt-4">

          <div className="col-md-8 col-lg-7">

            <div className="bag-card p-4">

              <h4 className="mb-4">
                Storage Information
              </h4>

              {/* Success message */}
              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}

              {/* Error message */}
              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSaveStorage}>

                {/* Storage name */}
                <div className="mb-3">

                  <label className="form-label">
                    Storage Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter storage name"
                    value={storageName}
                    onChange={(event) =>
                      setStorageName(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Address */}
                <div className="mb-3">

                  <label className="form-label">
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter storage address"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    required
                  />

                </div>

                {/* City */}
                <div className="mb-3">

                  <label className="form-label">
                    City
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city"
                    value={city}
                    onChange={(event) =>
                      setCity(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Storage type */}
                <div className="mb-3">

                  <label className="form-label">
                    Storage Type
                  </label>

                  <select
                    className="form-select"
                    value={storageType}
                    onChange={(event) =>
                      setStorageType(event.target.value)
                    }
                  >
                    <option value="">
                      Select storage type
                    </option>

                    <option value="hotel">
                      Hotel
                    </option>

                    <option value="cafe">
                      Cafe
                    </option>

                    <option value="hostel">
                      Hostel
                    </option>

                    <option value="shop">
                      Storage Shop
                    </option>

                    <option value="travel-shop">
                      Travel Shop
                    </option>
                  </select>

                </div>

                {/* Price */}
                <div className="mb-3">

                  <label className="form-label">
                    Price per Bag
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price in LKR"
                    min="0"
                    value={pricePerBag}
                    onChange={(event) =>
                      setPricePerBag(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Capacity */}
                <div className="mb-3">

                  <label className="form-label">
                    Available Bags
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter available bag count"
                    min="1"
                    value={capacity}
                    onChange={(event) =>
                      setCapacity(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Opening time */}
                <div className="mb-3">

                  <label className="form-label">
                    Opening Time
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    value={openingTime}
                    onChange={(event) =>
                      setOpeningTime(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Closing time */}
                <div className="mb-4">

                  <label className="form-label">
                    Closing Time
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    value={closingTime}
                    onChange={(event) =>
                      setClosingTime(event.target.value)
                    }
                    required
                  />

                </div>

                {/* Save storage */}
                <button
                  type="submit"
                  className="btn btn-primary-custom"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Saving..."
                    : "Save Storage"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageStorage;