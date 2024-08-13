import React from "react";
import "../components-style/RegisterPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errorsState, setErrorsState] = useState({
    name: {
      style: "block",
      message: "",
    },
    email: {
      style: "block",
      message: "",
    },
    password: {
      style: "block",
      message: "",
    },
    password_confirmation: {
      style: "block",
      message: "",
    },
  });

  // POPUNJAVANJE OBJEKTA USER IZ FORME
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    // console.log(userData);
  }

  function handleErrorMessages(res) {
    const fields = ["name", "email", "password", "password_confirmation"];

    const errors = fields.reduce((acc, field) => {
      acc[field] = {
        style: res[field] ? "block" : "none",
        message: res[field] ? res[field][0] : "",
      };
      return acc;
    }, {});

    setErrorsState(errors);
  }

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("api/register", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          window.sessionStorage.setItem(
            "authToken",
            res.data.authorisation.token
          );
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        handleErrorMessages(e.response.data);
      });
  }

  return (
    <div className="register-page">
      <section>
        <form onSubmit={handleRegister}>
          <div>
            <div className="name-wrapper">
              <p>Name: </p>
              <input
                type="text"
                placeholder="Your full name"
                name="name"
                id="name"
                onInput={handleInput}
              />
            </div>
            <p className="error" style={{ display: errorsState.name.style }}>
              {errorsState.name.message}
            </p>
          </div>
          <div>
            <div className="email-wrapper">
              <p>Email: </p>
              <input
                type="text"
                placeholder="Valid email address"
                name="email"
                id="email"
                onInput={handleInput}
              />
            </div>
            <p className="error" style={{ display: errorsState.email.style }}>
              {errorsState.email.message}
            </p>
          </div>
          <div>
            <div className="password-wrapper">
              <p>Password: </p>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                onInput={handleInput}
              />
            </div>
            <p
              className="error"
              style={{ display: errorsState.password.style }}
            >
              {errorsState.password.message}
            </p>
          </div>
          <div>
            <div className="password-wrapper">
              <p>Password Confirmation: </p>
              <input
                type="password"
                placeholder="Confirm your password"
                name="password_confirmation"
                id="password_confirmation"
                onInput={handleInput}
              />
            </div>
            <p
              className="error"
              style={{ display: errorsState.password_confirmation.style }}
            >
              {errorsState.password_confirmation.message}
            </p>
          </div>
          <button className="btn-register" type="submit">
            Register
          </button>
        </form>
        <div className="register-wrapper">
          <p>Already have an account?</p>
          <Link to="/login">Login!</Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
