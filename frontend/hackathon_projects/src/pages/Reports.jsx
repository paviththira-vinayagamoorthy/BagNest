import { useEffect, useState } from "react";
import API_URL from "../api/api";

function Reports() {

  // Revenue report data-a store panna state
  const [report, setReport] = useState(null);

  // Page loading state
  const [loading, setLoading] = useState(true);

  // Backend-la irundhu revenue report fetch panna
  useEffect(() => {

    async function fetchReport() {

      try {

        // Login pannumbodhu save panna user details-a eduka
        const user =
          JSON.parse(
            localStorage.getItem("user")
          );

        // Access token illana report access panna mudiyadhu
        if (!user || !user.access_token) {
          setLoading(false);
          return;
        }

        // Backend revenue report API call
        const response = await fetch(
          `${API_URL}/reports/revenue`,
          {
            headers: {
              "Authorization": `Bearer ${user.access_token}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {

          // Backend report data-a state-la save panrom
          setReport(data);

        } else {

          console.error(
            data.detail || "Unable to fetch report"
          );

        }

      } catch (error) {

        console.error(
          "Unable to connect to backend:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    fetchReport();

  }, []);

  // Report loading aagumbodhu
  if (loading) {
    return (
      <section className="py-5">

        <div className="container text-center">

          <p className="text-muted">
            Loading report...
          </p>

        </div>

      </section>
    );
  }

  // Report data available illa-na
  if (!report) {
    return (
      <section className="py-5">

        <div className="container text-center">

          <h2 className="fw-bold text-success">
            Reports
          </h2>

          <p className="text-muted mt-3">
            No report data available.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="py-5">

      <div className="container">

        {/* Page heading */}
        <div className="mb-4">

          <h2 className="fw-bold text-success">
            Reports
          </h2>

          <p className="text-muted">
            View booking, revenue and luggage reports.
          </p>

        </div>

        {/* Report summary cards */}
        <div className="row g-4 mb-5">

          {/* Total bookings */}
          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100 p-4">

              <h6 className="text-muted">
                Total Bookings
              </h6>

              <h2 className="fw-bold text-success">
                {report.total_bookings}
              </h2>

            </div>

          </div>

          {/* Total bags */}
          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100 p-4">

              <h6 className="text-muted">
                Total Bags
              </h6>

              <h2 className="fw-bold text-success">
                {report.total_bags}
              </h2>

            </div>

          </div>

          {/* Total revenue */}
          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100 p-4">

              <h6 className="text-muted">
                Total Revenue
              </h6>

              <h2 className="fw-bold text-success">
                Rs. {report.total_revenue}
              </h2>

            </div>

          </div>

        </div>

        {/* Booking report */}
        <div className="card border-0 shadow-sm p-4">

          <h5 className="fw-bold mb-4">
            Booking Report
          </h5>

          {report.bookings &&
          report.bookings.length > 0 ? (

            <div className="table-responsive">

              <table className="table">

                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Bags</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {report.bookings.map((booking, index) => (

                    <tr key={index}>

                      <td>
                        {booking.reference_code ||
                          booking.id ||
                          "Booking"}
                      </td>

                      <td>
                        {booking.bags_count}
                      </td>

                      <td>
                        Rs. {booking.total_price}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          {booking.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-muted mb-0">
              No booking data available.
            </p>

          )}

        </div>

      </div>

    </section>
  );
}

export default Reports;