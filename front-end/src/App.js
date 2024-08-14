import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import AllFiles from "./components/AllFiles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import EmployeesPage from "./components/EmployeesPage";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const config = {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  const [user, setUser] = useState();

  function handleUserDetail() {
    axios
      .get("api/userdetail", config)
      .then((res) => {
        console.log("Povucen korisnik preko rute api/userdetail");
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    handleUserDetail();
  }, []);

  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/user/*"
          element={<h1> User logovan! Primer druge rute! </h1>}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {user && (
          <Route path="/employees" element={<EmployeesPage user={user} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
