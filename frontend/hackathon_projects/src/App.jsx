// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
// importing navbar.jsx
import Navbar from "./components/Navbar";
// importing footer.jsx
import Footer from "./components/Footer";
// Website pages-oda routes-a use panna AppRoutes import panrom
import AppRoutes from "./routes/AppRoutes";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* using navbar */}
    <Navbar />
{/* URL-ku eatha page-a AppRoutes display pannum */}
       <AppRoutes />
    <Footer/>
    </>
  )
}

export default App
