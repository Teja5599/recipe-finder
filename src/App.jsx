import React from 'react'
import "./App.css"
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { useState } from 'react'
import Footer from './pages/footer'
const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const[resetHome , setResetHome] = useState(false)


  const toggleDarkMode = ()=>{
    const newMode = !darkMode
    setDarkMode(newMode)
    document.body.classList.toggle("dark" , newMode)
  }

  const handleHomeClick = ()=>{
    setResetHome((prev)=>!prev)
  }
  return (
    <div>
      <NavBar toggleDarkMode = {toggleDarkMode} darkMode = {darkMode} onHomeClick = {handleHomeClick}/>
      <Home resetHome = {resetHome}/>
      <Footer/>
      
    </div>
  )
}

export default App