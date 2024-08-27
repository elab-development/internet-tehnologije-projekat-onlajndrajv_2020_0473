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
import UserPage from "./components/UserPage";

function App() {
  const config = {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  const [logged, setLogged] = useState();
  const [currentFolder, setCurrentFolder] = useState({
    name: "",
    path: "",
    parent_folder: null,
  });

  const [loading, setLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);
  const [user, setUser] = useState();

  const [files, setFiles] = useState();
  const [folders, setFolders] = useState();
  const [employees, setEmployees] = useState();
  const [users, setUsers] = useState();

  function handleUserDetail() {
    axios
      .get("api/userdetail", config)
      .then((res) => {
        console.log("Zahtev: Povucen korisnik preko rute api/userdetail");
        console.log("Rezultat: " + res);

        setUser(res.data);
        getFilesForPath(res.data.company.id, "");
        getFoldersForPath(res.data.company.id, "");
        getEmployeesFromCompany(res.data.company.id);
        getNotEmployedUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFilesForPath(company_id, path_prop) {
    axios
      .get("api/companies/" + company_id + "/files", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          path: path_prop,
        },
      })
      .then((res) => {
        console.log(
          "Uspesan zahtev za uzimanje svih fajlova za putanju: " + path_prop
        );
        console.log("Rezultat: " + res);
        setFiles(res.data.files);

        getFoldersForPath(company_id, path_prop);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFoldersForPath(company_id, path_prop) {
    axios
      .get("api/folders/" + company_id, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          path: path_prop,
        },
      })
      .then((res) => {
        console.log(
          "Uspesan zahtev za uzimanje svih foldera za putanju: " + path_prop
        );
        console.log("Rezultat: " + res);
        setFolders(res.data);
        setLoading(false);
        setFilesLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getEmployeesFromCompany(id) {
    axios
      .get("api/companies/" + id + "/employees", config)
      .then((res) => {
        console.log("Uspesan zahtev za uzimanje zaposlenih");
        console.log("Rezultat: " + res);
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
        console.log("Uspesan zahtev za uzimanje nezaposlenih");
        console.log("Rezultat: " + res);
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
    console.log("Rendanje effect logged");
  }, [logged]);

  useEffect(() => {
    if (user) {
      getFilesForPath(user.company.id, currentFolder.path);
      getFoldersForPath(user.company.id, currentFolder.path);
      console.log("Rendanje effect folder");
    }
  }, [currentFolder]);

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
              setFilesLoading={setFilesLoading}
              filesLoading={filesLoading}
              currentFolder={currentFolder}
              setCurrentFolder={setCurrentFolder}
              user={user}
              files={files}
              folders={folders}
              employees={employees}
              users={users}
              setFiles={setFiles}
              setFolders={setFolders}
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
              <UserPage user={user} />
            </>
          }
        />
        <Route path="/employees" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
