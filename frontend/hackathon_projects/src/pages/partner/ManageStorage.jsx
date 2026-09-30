import { useEffect, useState } from "react";

import { apiFetch, shortTime } from "../../api/api";

const EMPTY_FORM = {
  name: "",
  address: "",
  city: "",
  storage_type: "",
  price_per_bag: "",
  capacity: "",
  opening_time: "",
  closing_time: "",
};

function ManageStorage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [storages, setStorages] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [csvFile, setCsvFile] = useState(null);
  const [csvResult, setCsvResult] = useState(null);

  // Backend: GET /storage/mine
  async function loadStorage() {
    try {
      const data = await apiFetch("/storage/mine");
      setStorages(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Backend: POST /storage
  async function handleSave(event) {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      await apiFetch("/storage", {
        method: "POST",
        body: {
          name: form.name.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          storage_type: form.storage_type || "Other",
          price_per_bag: Number(form.price_per_bag),
          capacity: Number(form.capacity),
          // "09:00" -> "09:00:00"
          opening_time: `${form.opening_time}:00`,
          closing_time: `${form.closing_time}:00`,
        },
      });

      setMessage("Storage saved successfully.");
      setForm(EMPTY_FORM);
      loadStorage();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // Backend: DELETE /storage/{id}
  async function handleDelete(storageId) {
    if (!window.confirm("Delete this storage location?")) return;

    try {
      await apiFetch(`/storage/${storageId}`, {
        method: "DELETE",
      });

      loadStorage();
    } catch (err) {
      setError(err.message);
    }
  }

  // Backend: POST /storage/import-csv
  async function handleCsvUpload() {
    if (!csvFile) {
      setError("Please choose a CSV file first.");
      return;
    }

    setError("");
    setCsvResult(null);

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const result = await apiFetch("/storage/import-csv", {
        method: "POST",
        body: formData,
      });

      setCsvResult(result);
      setCsvFile(null);
      loadStorage();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-section py-5">
      <div className="container">
        <h1 className="page-title">Manage Storage</h1>

        <p className="page-description">
          Add and manage your luggage storage locations.
        </p>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {message && (
          <div className="alert alert-success">{message}</div>
        )}

        <div className="row mt-4">
          {/* ---------- Add storage form ---------- */}
          <div className="col-md-8 col-lg-7 mb-4">
            <form className="bag-card p-4" onSubmit={handleSave}>
              <h4 className="mb-4">Storage Information</h4>

              <div className="mb-3">
                <label className="form-label">Storage Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter storage name"
                  value={form.name}
                  onChange={handleChange}
                  minLength={2}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter street address"
                  value={form.address}
                  onChange={handleChange}
                  minLength={5}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Enter city (e.g. Jaffna)"
                  value={form.city}
                  onChange={handleChange}
                  minLength={2}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Storage Type</label>
                <select
                  name="storage_type"
                  className="form-select"
                  value={form.storage_type}
                  onChange={handleChange}
                >
                  <option value="">Select storage type</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Storage Shop">Storage Shop</option>
                  <option value="Travel Shop">Travel Shop</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price per Bag</label>
                <input
                  type="number"
                  name="price_per_bag"
                  className="form-control"
                  placeholder="Enter price in LKR"
                  min="0"
                  value={form.price_per_bag}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Capacity (bags)</label>
                <input
                  type="number"
                  name="capacity"
                  className="form-control"
                  placeholder="Enter total bag capacity"
                  min="1"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Opening Time</label>
                <input
                  type="time"
                  name="opening_time"
                  className="form-control"
                  value={form.opening_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Closing Time</label>
                <input
                  type="time"
                  name="closing_time"
                  className="form-control"
                  value={form.closing_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary-custom"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Storage"}
              </button>
            </form>
          </div>

          {/* ---------- CSV import ---------- */}
          <div className="col-md-8 col-lg-5 mb-4">
            <div className="bag-card p-4">
              <h4 className="mb-3">Import from CSV</h4>

              <p className="text-muted">
                Columns: name, address, city, capacity,
                price_per_bag, opening_time, closing_time
                (optional: storage_type)
              </p>

              <input
                type="file"
                accept=".csv"
                className="form-control mb-3"
                onChange={(event) =>
                  setCsvFile(event.target.files[0] || null)
                }
              />

              <button
                type="button"
                className="btn btn-primary-custom"
                onClick={handleCsvUpload}
              >
                Upload CSV
              </button>

              {csvResult && (
                <div className="mt-3">
                  <p className="mb-1">
                    <strong>{csvResult.valid_rows}</strong> of{" "}
                    {csvResult.total_rows} rows imported.
                  </p>

                  {csvResult.errors.map((item) => (
                    <p
                      className="text-danger mb-1"
                      key={item.row}
                    >
                      Row {item.row}: {item.error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------- My storage list ---------- */}
        <h4 className="mb-3">My Storage Locations</h4>

        {storages.length === 0 && (
          <p className="text-muted">
            You have not added any storage yet.
          </p>
        )}

        <div className="row">
          {storages.map((storage) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={storage.id}
            >
              <div className="bag-card p-4">
                <h5>{storage.name}</h5>

                <p className="text-muted mb-2">
                  {storage.address}, {storage.city}
                </p>

                <p className="mb-1">
                  <strong>Type:</strong> {storage.storage_type}
                </p>

                <p className="mb-1">
                  <strong>Price:</strong> LKR{" "}
                  {storage.price_per_bag} / bag
                </p>

                <p className="mb-1">
                  <strong>Capacity:</strong> {storage.capacity}
                </p>

                <p className="mb-3">
                  <strong>Hours:</strong>{" "}
                  {shortTime(storage.opening_time)} -{" "}
                  {shortTime(storage.closing_time)}
                </p>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(storage.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageStorage;
