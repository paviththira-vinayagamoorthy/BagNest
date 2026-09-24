import { useEffect, useState } from "react";

function Reports() {

  // Booking details-a store panna state
  const [booking, setBooking] = useState(null);

  // Page open aagumbodhu booking details-a localStorage-la irundhu eduka
  useEffect(() => {

    const savedBooking =
      JSON.parse(
        localStorage.getItem("booking")
      );

    // Booking irundha state-la save panna
    setBooking(savedBooking);

  }, []);

  // Booking irundha report values calculate panna
  const totalBookings = booking ? 1 : 0;

  const totalBags = booking
    ? Number(booking.bags)
    : 0;

  const totalRevenue = booking
    ? Number(booking.price) * Number(booking.bags)
    : 0;

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
                {totalBookings}
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
                {totalBags}
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
                Rs. {totalRevenue}
              </h2>

            </div>

          </div>

        </div>

        {/* Booking report */}
        <div className="card border-0 shadow-sm p-4">

          <h5 className="fw-bold mb-4">
            Booking Report
          </h5>

          {booking ? (

            <div className="table-responsive">

              <table className="table">

                <thead>
                  <tr>
                    <th>Storage</th>
                    <th>Bags</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>

                    <td>
                      {booking.storageName}
                    </td>

                    <td>
                      {booking.bags}
                    </td>

                    <td>
                      {booking.startDate}
                    </td>

                    <td>
                      {booking.endDate}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        Confirmed
                      </span>
                    </td>

                  </tr>

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