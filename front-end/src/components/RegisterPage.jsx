import React from "react";
import "../components-style/RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <section>
        {/* IZMENE ID NAME */}
        <div className="name-wrapper">
          <p>Name: </p>
          <input type="text" name="name" id="name" />
        </div>
        <div className="email-wrapper">
          <p>Email: </p>
          <input type="text" name="email" id="email" />
        </div>
        <div className="password-wrapper">
          <p>Password: </p>
          <input type="password" name="pass" id="pass" />
        </div>
        <div className="password-wrapper">
          <p>Password Confirmation: </p>
          <input type="password" name="pass-confirm" id="pass-confirm" />
        </div>
        <button className="btn-register">Register</button>
        <div className="register-wrapper">
          <p>Already have an account?</p>
          <Link to="/login">Login!</Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
