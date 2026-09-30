import { useEffect, useState } from "react";

import { apiFetch } from "../../services/api";
import StorageCard from "../../components/StorageCard";

function ExploreStorage() {
  // Backend-la irundhu varra storage data store panna
  const [storageData, setStorageData] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Error message store panna
  const [errorMessage, setErrorMessage] = useState("");

  // Page load aagumbothu backend-la storage data fetch pannrom
  useEffect(() => {
    async function fetchStorage() {
      try {
        // GET /storage API call
        const data = await apiFetch("/storage");

        // Backend data state-la save pannrom
        setStorageData(data);
      } catch (error) {
        // API error vandha message show pannrom
        setErrorMessage(
          error.message || "Failed to load storage."
        );
      } finally {
        // Loading stop pannrom
        setIsLoading(false);
      }
    }

    fetchStorage();
  }, []);

  return (
    <div className="explore-page">
      <div className="container">

        {/* Page heading kaaga */}
        <h1 className="explore-title">
          Explore Storage
        </h1>

        {/* Page description kaaga */}
        <p className="explore-description">
          Find a safe place to store your luggage.
        </p>

        {/* Loading message */}
        {isLoading && (
          <p className="text-muted">
            Loading storage...
          </p>
        )}

        {/* Backend error message */}
        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        {/* Storage data empty-aa irundha */}
        {!isLoading &&
          !errorMessage &&
          storageData.length === 0 && (
            <div className="alert alert-info">
              No storage locations available.
            </div>
          )}

        {/* Storage cards display panna */}
        {!isLoading &&
          !errorMessage &&
          storageData.length > 0 && (
            <div className="row">

              {storageData.map((storage) => (
                <div
                  className="col-md-6 col-lg-4 mb-4"
                  key={storage.id}
                >
                  <StorageCard storage={storage} />
                </div>
              ))}

            </div>
          )}

      </div>
    </div>
  );
}

export default ExploreStorage;