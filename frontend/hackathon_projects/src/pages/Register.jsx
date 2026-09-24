import { Link } from "react-router-dom";

function Register() {
  // BagNest new user registration page
  return (
    <section className="py-5">
      <div className="container py-5">

        {/* Register form-a center-la kaata */}
        <div className="row justify-content-center">

          {/* Register card-ku responsive width */}
          <div className="col-md-6 col-lg-5">

            {/* User registration details kaata card */}
            <div className="card border-0 shadow-sm p-4">

              {/* Register heading */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-success">
                  Create Your Account
                </h2>

                <p className="text-muted">
                  Join BagNest and store your bags easily.
                </p>
              </div>

              {/* New account details enter panna form */}
              <form>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                  />
                </div>

                {/* User role select panna */}
                <div className="mb-3">
                  <label className="form-label">
                    Register As
                  </label>

                  <select className="form-select">
                    <option value="traveller">
                      Traveller
                    </option>

                    <option value="partner">
                      Storage Partner
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Create Account
                </button>

              </form>

              {/* Existing users-ku login option */}
              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                  <Link to="/login" className="text-success fw-semibold">
                       Login
                </Link>
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Register;