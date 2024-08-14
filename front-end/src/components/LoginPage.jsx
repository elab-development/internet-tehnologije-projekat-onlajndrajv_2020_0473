import React from "react";
import "../components-style/LoginPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorsState, setErrorsState] = useState({
    email: {
      style: "none",
      message: "",
    },
    password: {
      style: "none",
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

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          window.sessionStorage.setItem(
            "authToken",
            res.data.authorisation.token
          );
          navigate("/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
        handleErrorMessages(e.response);
      });
  }

  function handleErrorMessages(res) {
    const fields = ["email", "password"];
    let errors = errorsState;

    if (res.status == 401) {
      errors.password.style = "block";
      errors.password.message = "There credentials does not exist";
    } else {
      errors = fields.reduce((acc, field) => {
        acc[field] = {
          style: res.data[field] ? "block" : "none",
          message: res.data[field] ? res.data[field][0] : "",
        };
        return acc;
      }, {});
    }

    setErrorsState(errors);
  }

  return (
    <div className="login-page">
      <section>
        <form onSubmit={handleLogin}>
          <div>
            <div className="email-wrapper">
              <p>Email: </p>
              <input
                type="text"
                placeholder="Email address"
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
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
        <div className="register-wrapper">
          <p>Don't have an account?</p>
          <Link to="/register">Register!</Link>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
