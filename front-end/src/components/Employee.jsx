import React from "react";
import "../components-style/Employee.css";
import axios from "axios";
import Swal from "sweetalert2";

const Employee = ({ employee, set, all, appendToUsers }) => {
  function handleFireClick() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to fire " + employee.user.name + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C70039",
      cancelButtonColor: "#B2BEB5",
      confirmButtonText: "Fire him!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Fired!",
          text: employee.user.name + " is successfully fired!",
          icon: "success",
        });

        handleFireEmployee();
      }
    });
  }

  function handleFireEmployee() {
    axios
      .delete("api/employees/" + employee.id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        data: {
          company_id: employee.company.id,
        },
      })
      .then((res) => {
        console.log("Uspesno otpustanje zaposlenog: " + employee + " !");
        console.log(res);

        appendToUsers(employee.user);

        const arr = all.filter((item) => item.id !== employee.id);
        set(arr);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="employee-wrapper">
      {/* <img src={img} alt="" /> */}
      <h5>Name: {employee.user.name}</h5>
      <h5>E-mail: {employee.user.email}</h5>
      <h5>Employement date: {employee.employement_date}</h5>
      <button className="btn btn-fire" onClick={handleFireClick}>
        Fire
      </button>
    </div>
  );
};

export default Employee;
