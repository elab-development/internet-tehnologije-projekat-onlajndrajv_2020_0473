import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import NavBar from "./NavBar";
import axios from "axios";
import "../components-style/EmployeesPage.css";
import User from "./User";

const EmployeesPage = ({
  company,
  employees,
  users,
  setEmployees,
  setUsers,
  handleAppendEmployee,
  handleAppendUser,
}) => {
  const [view, setView] = useState({
    name: "employees",
    button_text: "Add new employee",
    title: "All employees of company " + company.name,
  });

  function handleClick() {
    if (view.name == "employees") {
      setView({
        name: "users",
        button_text: "Show all employees",
        title: "All unemployed users",
      });
    } else {
      setView({
        name: "employees",
        button_text: "Add new employee",
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
            <button className="btn btn-view-employees" onClick={handleClick}>
              {view.button_text}
            </button>
          </div>
        </div>
      )}

      <div className="all-employees-wrapper">
        {employees &&
          view.name == "employees" &&
          employees.map((employee) => (
            <Employee
              employee={employee}
              set={setEmployees}
              appendToUsers={handleAppendUser}
              all={employees}
              img={"https://picsum.photos/200"}
              key={employee.id}
            />
          ))}
        {users &&
          company &&
          view.name == "users" &&
          users.map((user) => (
            <User
              user={user}
              company={company}
              set={setUsers}
              appendToEmployees={handleAppendEmployee}
              all={users}
              key={user.id}
            />
          ))}
      </div>
    </>
  );
};

export default EmployeesPage;
