import React from "react";
import "../components-style/NavBar.css";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  function handleLogout() {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
      },
    };

    axios
      .post("api/logout", null, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("LOGOUT GRESKA");
        console.log(e);
      });
    window.sessionStorage.removeItem("authToken");
  }

  return (
    <div className="nav-bar">
      <Link className="nav-element" onClick={handleLogout} to={"/login"}>
        Log Out
      </Link>
      <Link className="nav-element" to="/user">
        About User
      </Link>
      <Link className="nav-element" to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
}

export default NavBar;
