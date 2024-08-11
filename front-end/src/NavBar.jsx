import React from 'react'
import "./NavBar.css"

function NavBar() {
  return (
    <div className="nav-bar">
      <a className="nav-element" href="">Log out</a>
      <a className="nav-element" href="">About user</a>
      <a className="nav-element" href="">Dashboard</a>
    </div>
  )
}

export default NavBar