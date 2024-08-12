import React from "react";
import "../components-style/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page">
      <section>
        {/* IZMENE ID NAME */}
        <div className="email-wrapper">
          <p>Email: </p>
          <input type="text" name="email" id="email" />
        </div>
        <div className="password-wrapper">
          <p>Password: </p>
          <input type="password" name="pass" id="pass" />
        </div>
        <button className="btn-login">Login</button>
        <div className="register-wrapper">
          <p>Don't have an account?</p>
          <Link to="/register">Register!</Link>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
