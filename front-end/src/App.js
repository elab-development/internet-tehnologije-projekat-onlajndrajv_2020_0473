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

  const [logged, setLogged] = useState();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const [files, setFiles] = useState();
  const [employees, setEmployees] = useState();
  const [users, setUsers] = useState();

  function handleUserDetail() {
    axios
      .get("api/userdetail", config)
      .then((res) => {
        console.log("Povucen korisnik preko rute api/userdetail");
        console.log(res.data);

        setUser(res.data);
        getFilesForCompany(res.data.company.id);
        getEmployeesFromCompany(res.data.company.id);
        getNotEmployedUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFilesForCompany(id) {
    axios
      .get("api/companies/" + id + "/files", config)
      .then((res) => {
        console.log(res.data.files);
        setFiles(res.data.files);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getEmployeesFromCompany(id) {
    axios
      .get("api/companies/" + id + "/employees", config)
      .then((res) => {
        console.log(res.data.employees);
        setEmployees(res.data.employees);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getNotEmployedUsers() {
    axios
      .get("api/users", config)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleAppendEmployee(employee) {
    setEmployees([...employees, employee]);
  }

  function handleAppendUser(user) {
    setUsers([...users, user]);
  }

  useEffect(() => {
      handleUserDetail();
  }, [logged]);

  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setLogged={setLogged} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loading={loading}
              user={user}
              files={files}
              employees={employees}
              users={users}
              setFiles={setFiles}
              setEmployees={setEmployees}
              setUsers={setUsers}
              handleAppendEmployee={handleAppendEmployee}
              handleAppendUser={handleAppendUser}
              setLogged={setLogged}
            />
          }
        />
        <Route
          path="/user/*"
          element={
            <>
              <NavBar />
              <h1>Again h1</h1>
            </>
          }
        />
        <Route path="/employees" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
