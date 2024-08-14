import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import NavBar from "./NavBar";
import axios from "axios";

const EmployeesPage = ({ user }) => {
  const [employees, setEmployees] = useState();

  function getEmployeesFromCompany() {
    axios
      .get("api/companies/" + user.company.id + "/employees")
      .then((res) => {
        console.log(res.data.employees);
        setEmployees(res.data.employees);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getEmployeesFromCompany();
  }, []);

  return (
    <>
      <NavBar />
      <div className="all-employees-wrapper">
        {employees &&
          employees.map((employee) => (
            <Employee employee={employee} key={employee.id} />
          ))}
      </div>
    </>
  );
};

export default EmployeesPage;
