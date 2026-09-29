import { Link } from "react-router-dom";

import storageData from "../../data/storageData";
import StorageCard from "../../components/StorageCard";

import heroImage from "../../assets/hero-illustration.jpg";

function LandingPage() {
  return (
    <main className="landing-page">

      {/* Hero */}
      <section className="hero-section">
        <div className="container">

          <div className="row align-items-center g-5">

            {/* Left Content */}
            <div className="col-lg-7">

              <span className="hero-badge">
                Smart luggage storage network
              </span>

              <h1 className="hero-title">
                Travel light.
                <br />
                <span>Explore more.</span>
              </h1>

              <p className="hero-description">
                Find safe and convenient places to store your
                luggage while you explore the city without
                carrying heavy bags everywhere.
              </p>

              <div className="hero-actions">

                <Link
                  to="/explore-storage"
                  className="btn btn-hero-primary"
                >
                  Find Storage
                </Link>

                <Link
                  to="/register"
                  className="btn btn-hero-secondary"
                >
                  Become a Partner
                </Link>

              </div>

              <div className="hero-trust">

                <div>
                  <strong>Safe</strong>
                  <span>Verified locations</span>
                </div>

                <div>
                  <strong>Simple</strong>
                  <span>Easy booking</span>
                </div>

                <div>
                  <strong>Flexible</strong>
                  <span>Pay for what you use</span>
                </div>

              </div>

            </div>


            {/* Right Image */}
            <div className="col-lg-5">

              <div className="hero-image-box">

                <img
                  src={heroImage}
                  alt="BagNest luggage storage"
                  className="hero-image"
                />

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Quick Stats */}
      <section className="stats-section">
        <div className="container">

          <div className="row g-3">

            <div className="col-6 col-lg-3">
              <div className="stat-box">
                <strong>50+</strong>
                <span>Storage Locations</span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-box">
                <strong>1,200+</strong>
                <span>Bags Stored</span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-box">
                <strong>98%</strong>
                <span>Happy Travellers</span>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="stat-box">
                <strong>24/7</strong>
                <span>Booking Access</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Explore Storage Preview */}
      <section className="storage-preview-section">
        <div className="container">

          <div className="section-heading-row">

            <div>

              <span className="section-eyebrow">
                FIND A PLACE
              </span>

              <h2 className="section-title">
                Store your bags.
                <br />
                Explore without limits.
              </h2>

              <p className="section-description">
                Discover convenient storage locations near
                popular travel spots and book a place for your bags.
              </p>

            </div>

            <Link
              to="/explore-storage"
              className="view-all-link"
            >
              View all storage →
            </Link>

          </div>


          <div className="row g-4">

            {storageData.map((storage) => (
              <div
                className="col-md-6 col-lg-4"
                key={storage.id}
              >
                <StorageCard storage={storage} />
              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}

export default LandingPage;