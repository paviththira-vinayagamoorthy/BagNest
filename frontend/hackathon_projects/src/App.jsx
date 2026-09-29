import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main className="container py-5">
        <div className="foundation-card">
          <span className="foundation-badge">
            Smart Luggage Storage Network
          </span>

          <h1 className="foundation-title">
            Welcome to <span>BagNest</span>
          </h1>

          <p className="foundation-description">
            Find convenient luggage storage and explore
            your destination without carrying extra bags.
          </p>

          <button
            type="button"
            className="btn btn-bagnest"
          >
            Explore Storage
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;