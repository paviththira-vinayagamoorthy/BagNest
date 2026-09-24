import { useParams, Link } from "react-router-dom";
import storageData from "../data/storageData";
import { useState } from "react";

function Booking() {

  // URL-la irukkura storage id-a eduka
  const { id } = useParams();

  // Booking form values-a store panna states
  const [bags, setBags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Storage id-ku match aagura storage-a find panna
  const storage = storageData.find(
    (item) => item.id === Number(id)
  );

  // Storage kidaikkala-na message kaata
  if (!storage) {
    return (
      <section className="py-5">
        <div className="container text-center">

          <h3 className="text-danger">
            Storage not found
          </h3>

          <Link
            to="/traveller-dashboard"
            className="btn btn-success mt-3"
          >
            Back to Dashboard
          </Link>

        </div>
      </section>
    );
  }

  // Booking form submit-a handle panna function
  function handleBooking(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    // User booking details-a oru object-la store panna
    const booking = {
      storageId: storage.id,
      storageName: storage.name,
      location: storage.location,
      price: storage.price,
      bags,
      startDate,
      endDate
    };

    // Booking details-a browser localStorage-la save panna
    localStorage.setItem(
      "booking",
      JSON.stringify(booking)
    );

    // Booking successful message
    alert("Booking confirmed successfully!");
  }

  // Booking page main section
  return (
    <section className="py-5">

      {/* Booking content-a center-la maintain panna container */}
      <div className="container">

        {/* Booking card */}
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">

            <div className="card border-0 shadow-sm p-4">

              {/* Selected storage details */}
              <div className="mb-4">
                <h2 className="fw-bold text-success">
                  Book Storage
                </h2>

                <h5 className="mt-3">
                  {storage.name}
                </h5>

                <p className="text-muted mb-1">
                  📍 {storage.location}
                </p>

                <p className="mb-0">
                  <strong>Rs. {storage.price}</strong> / bag
                </p>
              </div>

              {/* Booking details form */}
              <form onSubmit={handleBooking}>

                {/* Number of bags */}
                <div className="mb-3">
                  <label className="form-label">
                    Number of Bags
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    placeholder="Enter number of bags"
                    value={bags}
                    onChange={(e) => setBags(e.target.value)}
                  />
                </div>

                {/* Start date */}
                <div className="mb-3">
                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                {/* End date */}
                <div className="mb-3">
                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                {/* Booking button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Confirm Booking
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Booking;