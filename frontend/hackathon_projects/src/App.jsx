// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
// importing navbar.jsx
import Navbar from "./components/Navbar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* using navbar */}
    <Navbar />
      <div className="min-vh-100 d-flex align-items-center">
      
      <div className="container text-center">
        
        <h1 className="display-4 fw-bold text-success">
          BagNest
        </h1>

        <p className="lead">
          Smart luggage storage for travellers.
        </p>

        <button className="btn btn-success px-4">
          Get Started
        </button>

      </div>

    </div>
    </>
  )
}

export default App
