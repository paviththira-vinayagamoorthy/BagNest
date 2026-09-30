import { useEffect, useState } from "react";

import { apiFetch } from "../../services/api";

function Reports() {
  // Revenue report data
  const [revenueReport, setRevenueReport] = useState(null);

  // Occupancy report data
  const [occupancyReport, setOccupancyReport] =
    useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Reports fetch pannrom
  useEffect(() => {
    async function fetchReports() {
      try {
        // Revenue and occupancy reports parallel-aa fetch pannrom
        const [revenueData, occupancyData] =
          await Promise.all([
            apiFetch("/reports/revenue"),
            apiFetch("/reports/occupancy"),
          ]);

        setRevenueReport(revenueData);
        setOccupancyReport(occupancyData);

      } catch (error) {
        setErrorMessage(
          error.message || "Failed to load reports."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  return (
    <div className="page-section py-5">

      <div className="container">

        {/* Page heading */}
        <h1 className="page-title">
          Reports
        </h1>

        <p className="page-description">
          View your storage and booking summary.
        </p>

        {/* Loading */}
        {isLoading && (
          <p className="text-muted mt-4">
            Loading reports...
          </p>
        )}

        {/* Error */}
        {errorMessage && (
          <div className="alert alert-danger mt-4">
            {errorMessage}
          </div>
        )}

        {/* Report content */}
        {!isLoading &&
          !errorMessage &&
          revenueReport &&
          occupancyReport && (
            <>
              {/* Report summary */}
              <div className="row mt-4">

                {/* Total bookings */}
                <div className="col-md-6 col-lg-3 mb-4">

                  <div className="bag-card p-4">

                    <h6 className="text-muted">
                      Total Bookings
                    </h6>

                    <h2 className="fw-bold mt-2">
                      {revenueReport.total_bookings}
                    </h2>

                    <p className="text-muted mb-0">
                      All bookings
                    </p>

                  </div>

                </div>

                {/* Total bags */}
                <div className="col-md-6 col-lg-3 mb-4">

                  <div className="bag-card p-4">

                    <h6 className="text-muted">
                      Bags Stored
                    </h6>

                    <h2 className="fw-bold mt-2">
                      {revenueReport.total_bags}
                    </h2>

                    <p className="text-muted mb-0">
                      Total bags
                    </p>

                  </div>

                </div>

                {/* Storage capacity */}
                <div className="col-md-6 col-lg-3 mb-4">

                  <div className="bag-card p-4">

                    <h6 className="text-muted">
                      Total Capacity
                    </h6>

                    <h2 className="fw-bold mt-2">
                      {occupancyReport.total_capacity}
                    </h2>

                    <p className="text-muted mb-0">
                      Available storage capacity
                    </p>

                  </div>

                </div>

                {/* Revenue */}
                <div className="col-md-6 col-lg-3 mb-4">

                  <div className="bag-card p-4">

                    <h6 className="text-muted">
                      Total Revenue
                    </h6>

                    <h2 className="fw-bold mt-2">
                      LKR{" "}
                      {revenueReport.total_revenue}
                    </h2>

                    <p className="text-muted mb-0">
                      Booking revenue
                    </p>

                  </div>

                </div>

              </div>

              {/* Occupancy summary */}
              <div className="row mt-2">

                <div className="col-md-8 col-lg-7">

                  <div className="bag-card p-4">

                    <h4 className="mb-4">
                      Storage Summary
                    </h4>

                    <p>
                      <strong>
                        Report Date:
                      </strong>{" "}
                      {occupancyReport.report_date}
                    </p>

                    <p>
                      <strong>
                        Storage Locations:
                      </strong>{" "}
                      {occupancyReport.total_storage_locations}
                    </p>

                    <p>
                      <strong>
                        Total Capacity:
                      </strong>{" "}
                      {occupancyReport.total_capacity}
                    </p>

                    <p>
                      <strong>
                        Booked Bags:
                      </strong>{" "}
                      {occupancyReport.total_booked_bags}
                    </p>

                    <p className="mb-0">
                      <strong>
                        Occupancy:
                      </strong>{" "}
                      {occupancyReport.overall_occupancy_percentage}%
                    </p>

                  </div>

                </div>

              </div>
            </>
          )}

      </div>

    </div>
  );
}

export default Reports;