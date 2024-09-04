import React, { useEffect, useState } from "react";
import "../components-style/EmployeesPage.css";
import PageItem from "./PageItem";
import Button from "./Button";
import EmployeesPage from "./EmployeesPage";
import UsersPage from "./UsersPage";

const EmployeesAndUsersPage = ({ company }) => {
  const [view, setView] = useState({
    name: "employees",
    button_text: "Add new employee",
    title: "All employees of company " + company.name,
  });

  function handleChangeView() {
    if (view.name === "employees") {
      setView({
        name: "users",
        button_text: "Show all employees",
        title: "All unemployed users",
      });
    } else {
      setView({
        name: "employees",
        button_text: "Show unemployed users",
        title: "All employees of company " + company.name,
      });
    }
  }

  return (
    <>
      {company && (
        <div className="header-employees">
          <h4>{view.title}</h4>
          <div className="dashboard-info employees-info">
            <Button onClick={handleChangeView}>{view.button_text}</Button>
          </div>
        </div>
      )}

      <div className="all-employees-wrapper">
        {view.name == "employees" && <EmployeesPage company={company} />}
        {view.name == "users" && <UsersPage company={company} />}
      </div>
    </>
  );
};

export default EmployeesAndUsersPage;
