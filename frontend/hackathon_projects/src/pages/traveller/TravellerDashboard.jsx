import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiFetch } from "../../services/api";

function TravellerDashboard() {
  // User bookings store panna
  const [bookings, setBookings] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // My bookings fetch pannrom
  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await apiFetch("/bookings/my");

        setBookings(data);
      } catch (error) {
        setErrorMessage(
          error.message || "Failed to load dashboard data."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, []);

  // Total bookings
  const totalBookings = bookings.length;

  // Cancelled bookings
  const cancelledBookings = bookings.filter(
    (booking) =>
      booking.status === "CANCELLED"
  ).length;

  // Active bookings
  const activeBookings = bookings.filter(
    (booking) =>
      booking.status !== "CANCELLED"
  ).length;

  return (
    <div className="dashboard-page py-5">

      <div className="container">

        {/* Dashboard heading */}
        <h1 className="page-title">
          Traveller Dashboard
        </h1>

        <p className="page-description">
          Welcome to your BagNest dashboard.
        </p>

        {/* Loading */}
        {isLoading && (
          <p className="text-muted mt-4">
            Loading your dashboard...
          </p>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">
            {errorMessage}
          </div>
        )}

        {/* Booking summary */}
        {!isLoading && !errorMessage && (
          <div className="row mt-4">

            {/* Total bookings */}
            <div className="col-md-4 mb-4">

              <div className="dashboard-card">

                <h4>
                  Total Bookings
                </h4>

                <h2 className="fw-bold">
                  {totalBookings}
                </h2>

                <p className="mb-0">
                  All your storage bookings.
                </p>

              </div>

            </div>

            {/* Active bookings */}
            <div className="col-md-4 mb-4">

              <div className="dashboard-card">

                <h4>
                  Active Bookings
                </h4>

                <h2 className="fw-bold">
                  {activeBookings}
                </h2>

                <p className="mb-0">
                  Your active storage bookings.
                </p>

              </div>

            </div>

            {/* Cancelled bookings */}
            <div className="col-md-4 mb-4">

              <div className="dashboard-card">

                <h4>
                  Cancelled Bookings
                </h4>

                <h2 className="fw-bold">
                  {cancelledBookings}
                </h2>

                <p className="mb-0">
                  Your cancelled bookings.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Dashboard options */}
        <div className="row mt-2">

          {/* Explore Storage */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Explore Storage
              </h4>

              <p>
                Find a safe place to store your luggage.
              </p>

              <Link
                to="/explore-storage"
                className="btn btn-primary-custom"
              >
                Explore Storage
              </Link>

            </div>

          </div>

          {/* My Bookings */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                My Bookings
              </h4>

              <p>
                View your luggage storage bookings.
              </p>

              <Link
                to="/my-bookings"
                className="btn btn-primary-custom"
              >
                My Bookings
              </Link>

            </div>

          </div>

          {/* My Profile */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                My Profile
              </h4>

              <p>
                View and manage your traveller profile.
              </p>

              <Link
                to="/traveller-profile"
                className="btn btn-primary-custom"
              >
                View Profile
              </Link>

            </div>

          </div>

          {/* Notifications */}
          <div className="col-md-4 mb-4">

            <div className="dashboard-card">

              <h4>
                Notifications
              </h4>

              <p>
                Check your booking notifications.
              </p>

              <Link
                to="/notifications"
                className="btn btn-primary-custom"
              >
                Notifications
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TravellerDashboard;