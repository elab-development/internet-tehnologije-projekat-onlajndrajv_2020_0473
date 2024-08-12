import React from "react";
import "../components-style/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <a className="nav-element" href="">
        Log out
      </a>
      <Link className="nav-element" to="/user">
        About user
      </Link>
      <Link className="nav-element" to="/">
        Dashboard
      </Link>
    </div>
  );
}

export default NavBar;
