import React from 'react'
import "./styles/Navbar.css"
const NavBar = ({toggleDarkMode , darkMode , onHomeClick}) => {
  return (  
    <div className='navbar'>
      <h1 className='logo' onClick={onHomeClick}>Find Your Recipe</h1>
      <button className="dark-btn" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  )
}

export default NavBar