import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  apiFetch,
  formatDate,
  formatTime,
  getUser,
} from "../../api/api";

const ACTIONS = [
  {
    to: "/explore-storage",
    icon: "🔍",
    title: "Explore Storage",
    text: "Find a safe place for your luggage.",
  },
  {
    to: "/my-bookings",
    icon: "🧳",
    title: "My Bookings",
    text: "View or cancel your bookings.",
  },
  {
    to: "/traveller-profile",
    icon: "👤",
    title: "Profile",
    text: "Manage your account details.",
  },
  {
    to: "/notifications",
    icon: "🔔",
    title: "Notifications",
    text: "See your latest updates.",
  },
];

function TravellerDashboard() {
  const user = getUser();

  const [bookings, setBookings] = useState([]);

  // Backend: GET /bookings/my
  useEffect(() => {
    apiFetch("/bookings/my")
      .then(setBookings)
      .catch(() => setBookings([]));
  }, []);

  const active = bookings.filter(
    (b) =>
      b.status === "CONFIRMED" ||
      b.status === "CHECKED_IN"
  );

  const totalSpent = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce(
      (sum, b) => sum + b.total_price,
      0
    );

  // Adutha booking: innum mudiyaadha, earliest one
  const now = new Date();

  const nextBooking = active
    .filter(
      (b) => new Date(b.end_time) > now
    )
    .sort(
      (a, b) =>
        new Date(a.start_time) -
        new Date(b.start_time)
    )[0];

  const stats = [
    {
      icon: "📦",
      label: "Total Bookings",
      value: bookings.length,
    },
    {
      icon: "✅",
      label: "Active Bookings",
      value: active.length,
    },
    {
      icon: "💰",
      label: "Total Spent",
      value: `LKR ${totalSpent.toLocaleString()}`,
    },
  ];

  return (
    <div className="dash-page">
      <div className="container">

        {/* Welcome banner */}
        <div className="dash-hero d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h1>
              Hi, {user?.full_name || "Traveller"} 👋
            </h1>

            <p>
              Store your bags and explore without limits.
            </p>
          </div>

          <Link
            to="/explore-storage"
            className="dash-hero-btn"
          >
            Book Storage
          </Link>
        </div>

        {/* Stats */}
        <div className="row g-3 mt-2">
          {stats.map((item) => (
            <div
              className="col-md-4"
              key={item.label}
            >
              <div className="dash-stat">

                <div className="dash-stat-icon">
                  {item.icon}
                </div>

                <div>
                  <p className="dash-stat-label">
                    {item.label}
                  </p>

                  <p className="dash-stat-value">
                    {item.value}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Next booking */}
        <h4 className="dash-section-title">
          Next Booking
        </h4>

        {nextBooking ? (
          <div className="dash-list">
            <div className="dash-list-item">

              <div>
                <strong>
                  {nextBooking.storage_name}
                </strong>

                <br />

                <small>
                  {formatDate(nextBooking.start_time)},{" "}
                  {formatTime(nextBooking.start_time)} -{" "}
                  {formatTime(nextBooking.end_time)} ·{" "}
                  {nextBooking.bags_count} bag(s)
                </small>
              </div>

              <span className="badge text-bg-success">
                #{nextBooking.reference_code}
              </span>

            </div>
          </div>
        ) : (
          <div className="dash-list">
            <div className="dash-list-item">
              <small>
                No upcoming bookings. Explore storage to book.
              </small>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <h4 className="dash-section-title">
          Quick Actions
        </h4>

        <div className="row g-3">
          {ACTIONS.map((item) => (
            <div
              className="col-md-6 col-lg-3"
              key={item.to}
            >
              <Link
                to={item.to}
                className="dash-action"
              >
                <div className="dash-action-icon">
                  {item.icon}
                </div>

                <h5>{item.title}</h5>

                <p>{item.text}</p>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TravellerDashboard;