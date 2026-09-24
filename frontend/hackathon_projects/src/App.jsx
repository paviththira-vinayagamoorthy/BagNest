// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
// importing navbar.jsx
import Navbar from "./components/Navbar";
// importing footer.jsx
import Footer from "./components/Footer";
// importing landingpage
import LandingPage from "./pages/LandingPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* using navbar */}
    <Navbar />
      <LandingPage />
    <Footer/>
    </>
  )
}

export default App
