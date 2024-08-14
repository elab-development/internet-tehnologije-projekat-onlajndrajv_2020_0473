import React from "react";
import "../components-style/Employee.css";

const Employee = ({ employee }) => {
  return (
    <div className="employee-wrapper">
      <h5>Name: {employee.user.name}</h5>
      <h5>E-mail: {employee.user.email}</h5>
      <h5>Employement date: {employee.employement_date}</h5>
      <button className="btn btn-fire">Fire</button>
    </div>
  );
};

export default Employee;
