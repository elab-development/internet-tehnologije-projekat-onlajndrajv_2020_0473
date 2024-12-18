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
  const [foldersLoading, setFoldersLoading] = useState(false);
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
        console.log("Rezultat: ");
        console.log(res);

        setUser(res.data);
        if (res.data.employed) {
          getFilesForPath(res.data.company.id, "");
          getFoldersForPath(res.data.company.id, "");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFilesForPath(company_id, path_prop, signalProp = null) {
    setFilesLoading(true);
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
        setFilesLoading(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFoldersForPath(company_id, path_prop, signalProp = null) {
    setFoldersLoading(true);
    axios
      .get("api/folders/" + company_id, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          path: path_prop,
        },
        signal: signalProp,
      })
      .then((res) => {
        console.log(
          "Uspesan zahtev za uzimanje svih foldera za putanju: " + path_prop
        );
        console.log("Rezultat: ");
        console.log(res);
        setFolders(res.data);
        setLoading(false);
        setFoldersLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    handleUserDetail();
  }, [logged]);

  useEffect(() => {
    const controller = new AbortController();

    if (user) {
      getFilesForPath(user.company.id, currentFolder.path, controller.signal);
      getFoldersForPath(user.company.id, currentFolder.path, controller.signal);
    }

    return () => controller.abort();
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
              foldersLoading={foldersLoading}
              currentFolder={currentFolder}
              setCurrentFolder={setCurrentFolder}
              user={user}
              files={files}
              folders={folders}
              setFiles={setFiles}
              setFolders={setFolders}
              setLogged={setLogged}
            />
          }
        />
        <Route path="/user" element={<UserPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
