import React from "react";
import "../components-style/User.css";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "./Button";

const User = ({ user, company, setUsers }) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  const data = {
    company_id: company.id,
    user_id: user.id,
  };

  function handleEmployClick() {
    axios
      .post("api/employees", data, config)
      .then((res) => {
        console.log(res.data.employee);

        setUsers((prev) => prev.filter((item) => item.id !== user.id));

        notification();
      })
      .catch((e) => {
        console.log(e);
      });

    function notification() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width: "fit-content",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: user.name + " is employed successfully!",
      });
    }
  }

  return (
    <div className="employee-wrapper">
      <h5>Name: {user.name}</h5>
      <h5>E-mail: {user.email}</h5>
      <Button onClick={handleEmployClick} type="confirm">
        Employ
      </Button>
    </div>
  );
};

export default User;
