function Footer() {
  return (
    <footer className="bag-footer">
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-lg-5">
            <div className="footer-brand">
              <span className="footer-brand-mark">B</span>

              <span>
                Bag<span>Nest</span>
              </span>
            </div>

            <p className="footer-description">
              Smart luggage storage that helps travellers
              explore freely without carrying extra baggage.
            </p>
          </div>


          {/* Quick Links */}
          <div className="col-6 col-lg-3">
            <h6 className="footer-heading">
              Quick Links
            </h6>

            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/explore-storage">Explore Storage</a>
              <a href="/login">Login</a>
              <a href="/register">Get Started</a>
            </div>
          </div>


          {/* For Partners */}
          <div className="col-6 col-lg-4">
            <h6 className="footer-heading">
              For Partners
            </h6>

            <div className="footer-links">
              <a href="/partner-dashboard">
                Partner Dashboard
              </a>

              <a href="/manage-storage">
                Manage Storage
              </a>

              <a href="/partner-bookings">
                Bookings
              </a>

              <a href="/reports">
                Reports
              </a>
            </div>
          </div>

        </div>


        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © 2026 BagNest. All rights reserved.
          </p>

          <p>
            Travel light. Store smart.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;