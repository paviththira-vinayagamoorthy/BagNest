
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
    to: "/manage-storage",
    icon: ":department_store:",
    title: "Manage Storage",
    text: "Add, import or remove your locations.",
  },
  {
    to: "/partner-bookings",
    icon: ":luggage:",
    title: "Bookings",
    text: "Check travellers in and out.",
  },
  {
    to: "/reports",
    icon: ":bar_chart:",
    title: "Reports",
    text: "Revenue, occupancy and downloads.",
  },
  {
    to: "/partner-profile",
    icon: ":bust_in_silhouette:",
    title: "Profile",
    text: "Manage your account details.",
  },
  {
    to: "/partner-notifications",
    icon: ":bell:",
    title: "Notifications",
    text: "See your latest updates.",
  },
];

const STATUS_STYLE = {
  CONFIRMED: "text-bg-success",
  CHECKED_IN: "text-bg-primary",
  CHECKED_OUT: "text-bg-secondary",
  CANCELLED: "text-bg-danger",
};

function PartnerDashboard() {
  const user = getUser();

  const [storages, setStorages] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Backend: GET /storage/mine and GET /bookings/partner
  useEffect(() => {
    apiFetch("/storage/mine")
      .then(setStorages)
      .catch(() => setStorages([]));

    apiFetch("/bookings/partner")
      .then(setBookings)
      .catch(() => setBookings([]));
  }, []);

  const waiting = bookings.filter((b) => b.status === "CONFIRMED").length;
  const stored = bookings.filter((b) => b.status === "CHECKED_IN").length;

  const revenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + b.total_price, 0);

  const stats = [
    { icon: ":department_store:", label: "Storage Locations", value: storages.length },
    { icon: ":hourglass_flowing_sand:", label: "Waiting Check-in", value: waiting },
    { icon: ":luggage:", label: "Currently Stored", value: stored },
    {
      icon: ":moneybag:",
      label: "Total Revenue",
      value: `LKR ${revenue.toLocaleString()}`,
    },
  ];

  return (
    <div className="dash-page">
      <div className="container">
        {/* Welcome banner */}
        <div className="dash-hero d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h1>Welcome, {user?.full_name || "Partner"} :wave:</h1>
            <p>Here is how your storage business is doing.</p>
          </div>

          <Link to="/manage-storage" className="dash-hero-btn">
            + Add Storage
          </Link>
        </div>

        {/* Stats */}
        <div className="row g-3 mt-2">
          {stats.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.label}>
              <div className="dash-stat">
                <div className="dash-stat-icon">{item.icon}</div>

                <div>
                  <p className="dash-stat-label">{item.label}</p>
                  <p className="dash-stat-value">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent bookings */}
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="dash-section-title">Recent Bookings</h4>

          <Link to="/partner-bookings">View all →</Link>
        </div>

        <div className="dash-list">
          {bookings.length === 0 && (
            <div className="dash-list-item">
              <small>No bookings yet.</small>
            </div>
          )}

          {bookings.slice(0, 5).map((b) => (
            <div className="dash-list-item" key={b.id}>
              <div>
                <strong>{b.traveller_name}</strong> · {b.storage_name}
                <br />
                <small>
                  {formatDate(b.start_time)}, {formatTime(b.start_time)} -{" "}
                  {formatTime(b.end_time)} · {b.bags_count} bag(s)
                </small>
              </div>

              <span
                className={`badge ${
                  STATUS_STYLE[b.status] || "text-bg-secondary"
                }`}
              >
                {b.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h4 className="dash-section-title">Quick Actions</h4>

        <div className="row g-3">
          {ACTIONS.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.to}>
              <Link to={item.to} className="dash-action">
                <div className="dash-action-icon">{item.icon}</div>
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

export default PartnerDashboard;