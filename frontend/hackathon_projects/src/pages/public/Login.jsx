function Login() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">

          <div className="card border-0 shadow-sm p-4">
            <h2 className="mb-2">Welcome back</h2>

            <p className="text-muted mb-4">
              Login to your BagNest account.
            </p>

            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary-custom w-100"
              >
                Login
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;