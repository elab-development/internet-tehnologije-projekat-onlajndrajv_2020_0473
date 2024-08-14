import React from "react";
import NavBar from "./NavBar";
import AllFiles from "./AllFiles";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components-style/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({user}) => {

  let navigate = useNavigate();

  function handleClick() {
    navigate("/employees");
  }

  return (
    <>
      <NavBar />
      {user && (
        <>
          <div className="dashboard-main">
            <div className="dashboard-info info-company">
              <h4>Company: {user.company.name}</h4>
              <h4>Description: {user.company.description}</h4>
              <h4>Owner: {user.company.owner.name}</h4>
            </div>

            <div className="dashboard-info employees-info">
              <h4>Employee list: </h4>
              <button className="btn btn-view-employees" onClick={handleClick}>
                View all employees
              </button>
            </div>
          </div>
          <AllFiles company={user.company} />
        </>
      )}
    </>
  );
};

export default Dashboard;
