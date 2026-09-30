import { useEffect, useState } from "react";

import { apiFetch } from "../../api/api";
import StorageCard from "../../components/StorageCard";

function ExploreStorage() {
  const [storages, setStorages] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend: GET /storage?city=...
  async function loadStorage(searchCity = "") {
    setLoading(true);
    setError("");

    try {
      const query = searchCity.trim()
        ? `?city=${encodeURIComponent(searchCity.trim())}`
        : "";

      const data = await apiFetch(`/storage${query}`, {
        auth: false,
      });

      setStorages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Page open aanathum ella storage-um load pannrom
  useEffect(() => {
    loadStorage();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    loadStorage(city);
  }

  return (
    <div className="explore-page">
      <div className="container">
        <h1 className="explore-title">Explore Storage</h1>

        <p className="explore-description">
          Find a safe place to store your luggage.
        </p>

        {/* City search */}
        <form
          className="d-flex gap-2 mb-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search by city (e.g. Jaffna)"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary-custom"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading storage locations...</p>}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && storages.length === 0 && (
          <p className="text-muted">
            No storage locations found.
          </p>
        )}

        <div className="row">
          {storages.map((storage) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={storage.id}
            >
              <StorageCard storage={storage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreStorage;
