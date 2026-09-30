function ManageStorage() {
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

              {/* Storage name */}
              <div className="mb-3">
                <label className="form-label">
                  Storage Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter storage name"
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">
                  Location
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter storage location"
                />
              </div>

              {/* Storage type */}
              <div className="mb-3">
                <label className="form-label">
                  Storage Type
                </label>

                <select className="form-select">
                  <option value="">Select storage type</option>
                  <option value="hotel">Hotel</option>
                  <option value="cafe">Cafe</option>
                  <option value="hostel">Hostel</option>
                  <option value="shop">Storage Shop</option>
                  <option value="travel-shop">Travel Shop</option>
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
                />
              </div>

              {/* Available bags */}
              <div className="mb-3">
                <label className="form-label">
                  Available Bags
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter available bag count"
                  min="1"
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
                />
              </div>

              {/* Save storage */}
              <button
                type="button"
                className="btn btn-primary-custom"
              >
                Save Storage
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageStorage;