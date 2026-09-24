import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Storage card-a dashboard-la use panna import panrom
import StorageCard from "../components/StorageCard";

// FastAPI backend URL
import API_URL from "../api/api";

function TravellerDashboard() {

  // Backend-la irundhu storage data store panna state
  const [storageData, setStorageData] = useState([]);

  // Backend storage data fetch panna function
  useEffect(() => {

    async function fetchStorage() {

      try {

        // Backend-la irundhu storage locations fetch panrom
        const response = await fetch(
          `${API_URL}/storage`
        );

        const data = await response.json();

        // Storage data state-la save panrom
        setStorageData(data);

      } catch (error) {

        console.error(
          "Unable to fetch storage data:",
          error
        );

      }
    }

    fetchStorage();

  }, []);

  // Traveller dashboard main section
  return (
    <section className="py-5">

      {/* Dashboard content-a center-la maintain panna container */}
      <div className="container">

        {/* Dashboard heading */}
        <div className="mb-4">
          <h2 className="fw-bold text-success">
            Traveller Dashboard
          </h2>

          <p className="text-muted">
            Find and manage your luggage storage.
          </p>
        </div>

        {/* Dashboard summary cards */}
        <div className="row g-4 mb-5">

          {/* Find storage card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                Find Storage
              </h5>

              <p className="text-muted">
                Find a safe place to store your bags.
              </p>

              <a
                href="#available-storage"
                className="btn btn-success"
              >
                Find Storage
              </a>

            </div>
          </div>

          {/* My bookings card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                My Bookings
              </h5>

              <p className="text-muted">
                View your luggage storage bookings.
              </p>

              <Link
                to="/my-bookings"
                className="btn btn-outline-success"
              >
                My Bookings
              </Link>

            </div>
          </div>

          {/* Profile card */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold">
                My Profile
              </h5>

              <p className="text-muted">
                View your account information.
              </p>

              <Link
                to="/profile"
                className="btn btn-outline-success"
              >
                Profile
              </Link>

            </div>
          </div>

        </div>

        {/* Available storage section */}
        <div
          id="available-storage"
          className="mb-4"
        >
          <h3 className="fw-bold">
            Available Storage
          </h3>

          <p className="text-muted">
            Choose a storage location for your luggage.
          </p>
        </div>

        {/* Storage cards-a row-la display panna */}
        <div className="row g-4">

          {/* Backend-la irundhu varra storage data display pannum */}
          {storageData.map((storage) => (

            <div
              className="col-md-4"
              key={storage.id}
            >

              <StorageCard storage={storage} />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default TravellerDashboard;