import { useEffect, useState } from "react";

import { apiFetch, downloadFile } from "../../api/api";

// Empty values-a remove panni query string build pannum
function buildQuery(params) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) search.append(key, value);
  });

  const text = search.toString();

  return text ? `?${text}` : "";
}

function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportDate, setReportDate] = useState("");

  const [revenue, setRevenue] = useState(null);
  const [occupancy, setOccupancy] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Backend: GET /reports/revenue and /reports/occupancy
  async function loadReports() {
    setLoading(true);
    setError("");

    try {
      const [revenueData, occupancyData] = await Promise.all([
        apiFetch(
          `/reports/revenue${buildQuery({
            start_date: startDate,
            end_date: endDate,
          })}`
        ),
        apiFetch(
          `/reports/occupancy${buildQuery({
            report_date: reportDate,
          })}`
        ),
      ]);

      setRevenue(revenueData);
      setOccupancy(occupancyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
    // Page open aanathum oru thadava mattum load pannrom
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // type = "revenue" | "occupancy" | "checkins"
  // format = "csv" | "pdf"
  async function handleDownload(type, format) {
    setError("");

    const query =
      type === "occupancy"
        ? buildQuery({ report_date: reportDate })
        : buildQuery({
            start_date: startDate,
            end_date: endDate,
          });

    try {
      await downloadFile(
        `/reports/${type}/${format}${query}`,
        `${type}.${format}`
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const confirmedCount = revenue
    ? revenue.bookings.filter((item) => item.status === "CONFIRMED")
        .length
    : 0;

  return (
    <div className="page-section py-5">
      <div className="container">
        <h1 className="page-title">Reports</h1>

        <p className="page-description">
          View your storage and booking summary.
        </p>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* ---------- Filters ---------- */}
        <div className="bag-card p-4 mt-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Occupancy Date</label>
              <input
                type="date"
                className="form-control"
                value={reportDate}
                onChange={(event) => setReportDate(event.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-primary-custom w-100"
                onClick={loadReports}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {loading && <p className="mt-4">Loading reports...</p>}

        {revenue && (
          <>
            {/* ---------- Summary cards ---------- */}
            <div className="row mt-4">
              <div className="col-md-6 col-lg-3 mb-4">
                <div className="bag-card p-4">
                  <h6 className="text-muted">Total Bookings</h6>
                  <h2 className="fw-bold mt-2">
                    {revenue.total_bookings}
                  </h2>
                  <p className="text-muted mb-0">
                    Excluding cancelled
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="bag-card p-4">
                  <h6 className="text-muted">Confirmed</h6>
                  <h2 className="fw-bold mt-2">{confirmedCount}</h2>
                  <p className="text-muted mb-0">
                    Waiting for check-in
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="bag-card p-4">
                  <h6 className="text-muted">Bags Stored</h6>
                  <h2 className="fw-bold mt-2">
                    {revenue.total_bags}
                  </h2>
                  <p className="text-muted mb-0">Total bags</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 mb-4">
                <div className="bag-card p-4">
                  <h6 className="text-muted">Total Revenue</h6>
                  <h2 className="fw-bold mt-2">
                    LKR {revenue.total_revenue.toLocaleString()}
                  </h2>
                  <p className="text-muted mb-0">Booking revenue</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ---------- Occupancy per storage ---------- */}
        {occupancy && (
          <div className="bag-card p-4 mb-4">
            <h4 className="mb-4">
              Storage Occupancy ({occupancy.report_date})
            </h4>

            {occupancy.storage.length === 0 && (
              <p className="text-muted mb-0">
                You have no storage locations yet.
              </p>
            )}

            {occupancy.storage.map((item) => (
              <div
                className="border-bottom pb-3 mb-3"
                key={item.storage_id}
              >
                <p className="mb-1">
                  <strong>{item.storage_name}</strong> ({item.city})
                </p>

                <p className="mb-0 text-muted">
                  Capacity {item.capacity} | Max booked{" "}
                  {item.max_booked_bags} | Available{" "}
                  {item.available_capacity} |{" "}
                  {item.occupancy_percentage}% occupied
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ---------- Downloads ---------- */}
        <div className="bag-card p-4">
          <h4 className="mb-3">Download Reports</h4>

          {[
            ["revenue", "Revenue"],
            ["occupancy", "Occupancy"],
            ["checkins", "Check-ins"],
          ].map(([type, label]) => (
            <div
              className="d-flex align-items-center gap-2 mb-2"
              key={type}
            >
              <span style={{ width: 110 }}>{label}</span>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleDownload(type, "csv")}
              >
                CSV
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleDownload(type, "pdf")}
              >
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;
