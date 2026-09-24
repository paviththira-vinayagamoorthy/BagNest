function Login() {
  // Login page main section
  return (
    <section className="py-5">

      {/* Content-a center-la maintain panna Bootstrap container */}
      <div className="container py-5">

        {/* Login form-a center-la kondu vara row */}
        <div className="row justify-content-center">

          {/* Login card-ku responsive width */}
          <div className="col-md-6 col-lg-5">

            {/* Login details and form display panna card */}
            <div className="card border-0 shadow-sm p-4">

              {/* Login heading and description */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-success">
                  Welcome Back
                </h2>

                <p className="text-muted">
                  Login to your BagNest account
                </p>
              </div>

              {/* User login details enter panna form */}
              <form>

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
                    placeholder="Enter your password"
                  />
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

              {/* New users registration option */}
              <p className="text-center mt-4 mb-0">
                Don't have an account?{" "}
                <span className="text-success fw-semibold">
                  Register
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;