import React from "react";
import NavBar from "./NavBar";
import AllFiles from "./AllFiles";
import { useState } from "react";
import "../components-style/Dashboard.css";
import EmployeesPage from "./EmployeesPage";

const Dashboard = ({
  loading,
  setFilesLoading,
  filesLoading,
  currentFolder,
  setCurrentFolder,
  user,
  files,
  folders,
  employees,
  users,
  setFiles,
  setFolders,
  setEmployees,
  setUsers,
  handleAppendEmployee,
  handleAppendUser,
}) => {
  const [view, setView] = useState({
    name: "files",
    text: "Show all employees",
  });

  function handleClick() {
    if (view.name == "files") {
      setView({
        name: "employees",
        text: "Show all files",
      });
    } else {
      setView({
        name: "files",
        text: "Show all employees",
      });
    }
  }

  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <div className="loading"></div>
        </div>
      )}

      {!loading && (
        <div>
          <NavBar />
          {user && (
            <div className="dashboard-main">
              <div className="dashboard-info info-company">
                <h4>Company: {user.company.name}</h4>
                <h4>Description: {user.company.description}</h4>
                <h4>Owner: {user.company.owner.name}</h4>
              </div>

              <div className="dashboard-info employees-info">
                <button
                  className="btn btn-view-employees"
                  onClick={handleClick}
                >
                  {view.text}
                </button>
              </div>
            </div>
          )}
          {user && view.name == "files" && (
            <AllFiles
              setFilesLoading={setFilesLoading}
              filesLoading={filesLoading}
              currentFolder={currentFolder}
              setCurrentFolder={setCurrentFolder}
              company={user.company}
              files={files}
              folders={folders}
              setFiles={setFiles}
              setFolders={setFolders}
            />
          )}
          {user && view.name == "employees" && (
            <EmployeesPage
              company={user.company}
              employees={employees}
              users={users}
              setEmployees={setEmployees}
              setUsers={setUsers}
              handleAppendEmployee={handleAppendEmployee}
              handleAppendUser={handleAppendUser}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
