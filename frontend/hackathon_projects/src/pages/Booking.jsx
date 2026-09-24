import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../api/api";

function Booking() {

  // URL-la irukkura storage id-a eduka
  const { id } = useParams();

  // Selected storage-a store panna state
  const [storage, setStorage] = useState(null);

  // Booking form values-a store panna states
  const [bags, setBags] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Storage details backend-la irundhu fetch panna
  useEffect(() => {

    async function fetchStorage() {

      try {

        const response = await fetch(
          `${API_URL}/storage/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setStorage(data);
        }

      } catch (error) {

        console.error(
          "Unable to fetch storage:",
          error
        );

      }
    }

    fetchStorage();

  }, [id]);

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
  async function handleBooking(e) {

    // Form submit aagumbodhu page refresh aagama stop panna
    e.preventDefault();

    try {

      // Date + time-a datetime format-la combine panrom
      const startDateTime =
        `${bookingDate}T${startTime}:00`;

      const endDateTime =
        `${bookingDate}T${endTime}:00`;

      // Login pannumbodhu save panna access token-a eduka
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      // Token illana login page-ku pogum
      if (!user || !user.access_token) {

        alert("Please login before making a booking.");

        navigate("/login");

        return;
      }

      // Backend-ku booking details send panrom
      const response = await fetch(
        `${API_URL}/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.access_token}`
          },

          body: JSON.stringify({
            storage_id: Number(id),
            bags_count: Number(bags),
            start_time: startDateTime,
            end_time: endDateTime
          })
        }
      );

      const data = await response.json();

      // Booking successful
      if (response.ok) {

        alert("Booking confirmed successfully!");

      } else {

        // Backend error message kaata
        alert(
          data.detail ||
          "Booking failed"
        );

      }

    } catch (error) {

      alert("Unable to connect to backend.");

      console.error(error);

    }
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
                  📍 {storage.address}, {storage.city}
                </p>

                <p className="mb-0">
                  <strong>
                    Rs. {storage.price_per_bag}
                  </strong>{" "}
                  / bag
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
                    max="100"
                    placeholder="Enter number of bags"
                    value={bags}
                    onChange={(e) =>
                      setBags(e.target.value)
                    }
                  />

                </div>

                {/* Booking date */}
                <div className="mb-3">

                  <label className="form-label">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={bookingDate}
                    onChange={(e) =>
                      setBookingDate(e.target.value)
                    }
                  />

                </div>

                {/* Start time */}
                <div className="mb-3">

                  <label className="form-label">
                    Start Time
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(e.target.value)
                    }
                  />

                </div>

                {/* End time */}
                <div className="mb-3">

                  <label className="form-label">
                    End Time
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    value={endTime}
                    onChange={(e) =>
                      setEndTime(e.target.value)
                    }
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