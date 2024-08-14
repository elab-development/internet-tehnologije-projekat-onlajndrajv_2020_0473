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
    add_company: false,
    company_name: "",
    description: "",
  });

  const [errorsState, setErrorsState] = useState({
    name: {
      style: "none",
      message: "",
    },
    email: {
      style: "none",
      message: "",
    },
    password: {
      style: "none",
      message: "",
    },
    password_confirmation: {
      style: "none",
      message: "",
    },
    company_name: {
      style: "none",
      message: "",
    },
    description: {
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

  function handleErrorMessages(res) {
    const fields = [
      "name",
      "email",
      "password",
      "password_confirmation",
      "company_name",
      "description",
    ];

    const errors = fields.reduce((acc, field) => {
      acc[field] = {
        style: res[field] ? "block" : "none",
        message: res[field] ? res[field][0] : "",
      };
      return acc;
    }, {});

    setErrorsState(errors);
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    let data = userData;
    data.add_company = !data.add_company;
    setUserData(data);
  };

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
    console.log(userData);
  }

  return (
    <div className="register-page">
      <section>
        <form onSubmit={handleRegister}>
          <div>
            <div className="wrapper">
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
            <div className="wrapper">
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
            <div className="wrapper">
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
            <div className="wrapper">
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
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
            ></input>
            <p>Do you want to create a company also?</p>
          </div>
          {isChecked ? (
            <>
              <div>
                <div className="wrapper">
                  <p>Company name: </p>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    name="company_name"
                    id="company_name"
                    onInput={handleInput}
                  />
                </div>
                <p
                  className="error"
                  style={{ display: errorsState.company_name.style }}
                >
                  {errorsState.company_name.message}
                </p>
              </div>
              <div>
                <div className="wrapper">
                  <p>Company description: </p>
                  <input
                    type="text"
                    placeholder="Enter company description"
                    name="description"
                    id="description"
                    onInput={handleInput}
                  />
                </div>
                <p
                  className="error"
                  style={{ display: errorsState.description.style }}
                >
                  {errorsState.description.message}
                </p>
              </div>
            </>
          ) : null}
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
