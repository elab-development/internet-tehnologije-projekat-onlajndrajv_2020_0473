import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import AllFiles from "./components/AllFiles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const files = [
  {
    id: 1,
    title: "File 1",
  },
  {
    id: 2,
    title: "File 2",
  },
  {
    id: 3,
    title: "File 3",
  },
  {
    id: 4,
    title: "File 4",
  },
  {
    id: 5,
    title: "File 5",
  },
];

function App() {
  return (
    <BrowserRouter className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <AllFiles files={files} />
            </>
          }
        />
        <Route
          path="/user/*"
          element={<h1> User logovan! Primer druge rute! </h1>}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
