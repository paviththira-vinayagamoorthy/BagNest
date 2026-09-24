function LandingPage() {
  // BagNest landing page
  return (
    <section className="py-5">

      <div className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-6">

            {/* Main heading */}
            <h1 className="display-4 fw-bold">
              Store Your Bags.
            </h1>

            <h2 className="text-success fw-bold">
              Travel Freely.
            </h2>

            <p className="lead mt-3">
              Find a safe and convenient place to store your luggage
              while you explore.
            </p>

            {/* Landing page buttons */}
            <div className="mt-4">

              <button className="btn btn-success px-4 me-2">
                Find Storage
              </button>

              <button className="btn btn-outline-success px-4">
                Get Started
              </button>

            </div>

          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">

            {/* Temporary luggage visual */}
            <div className="p-5 bg-white rounded shadow-sm">
              <h3 className="text-success">
                🧳
              </h3>

              <p className="mb-0">
                Safe luggage storage
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LandingPage;