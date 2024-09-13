import React from "react";
import NavBar from "./NavBar";
import AllFiles from "./AllFiles";
import { useState, useEffect } from "react";
import "../components-style/Dashboard.css";
import EmployeesPage from "./EmployeesPage";

import useDrivePicker from "react-google-drive-picker";
import Loading from "./Loading";
import UserInfo from "./UserInfo";
import Button from "./Button";
import EmployeesAndUsersPage from "./EmployeesAndUsersPage";

const Dashboard = ({
  loading,
  setFilesLoading,
  filesLoading,
  foldersLoading,
  currentFolder,
  setCurrentFolder,
  user,
  files,
  folders,
  setFiles,
  setFolders,
}) => {
  // API
  const [openPicker, authResponse] = useDrivePicker();

  const handleOpenPicker = () => {
    let token = window.sessionStorage.getItem("accessToken");
    const expirationTime = window.sessionStorage.getItem("tokenExpirationTime");

    if (!token || new Date().getTime() > expirationTime) {
      token = null;
    }

    console.log(authResponse)

    try {
      openPicker({
        clientId: process.env.REACT_APP_CLIENT_ID,
        developerKey: process.env.REACT_APP_DEVELOPER_KEY,
        token: token,
        viewId: "DOCS",
        showUploadView: true,
        showUploadFolder: true,
        supportDrives: true,
        multiselect: true,
        showUploadFolders: true,
        callbackFunction: (data) => {
          if (authResponse) {
            const oldToken = window.sessionStorage.getItem("accessToken");
            const newToken = authResponse.access_token;

            const expires = window.sessionStorage.getItem(
              "tokenExpirationTime"
            );

            if (oldToken != newToken || !expires) {
              window.sessionStorage.setItem(
                "accessToken",
                authResponse.access_token
              );

              const expirationTime =
                new Date().getTime() + authResponse.expires_in * 1000;

              window.sessionStorage.setItem(
                "tokenExpirationTime",
                expirationTime
              );

              console.log("Token changed. New expiration time set.");
            }
          }
          if (data.action === "cancel") {
            console.log("User clicked cancel/close button");
          }
          if (data.action === "picked") {
            console.log("User clicked select button");

            const selectedData = data.docs;

            if (!selectedData) return;

            for (let i = 0; i < selectedData.length; i++) {
              if (!selectedData[i].isNew) {
                window.open(selectedData[i].url, "_blank");
              } else {
                handleSetPermissions(selectedData[i].id);
              }
            }
          }
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetPermissions = (fileId) => {
    const accessToken = window.sessionStorage.getItem("accessToken");

    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role: "reader", // "reader" za pregled, "writer" za uređivanje
        type: "anyone", // "anyone" za javno, "user" za specifične korisnike
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Permissions set successfully:", data);
      })
      .catch((error) => {
        console.error("Error setting permissions:", error);
      });
  };
  // --------------
  const [view, setView] = useState({
    name: "files",
    text: "Show all employees",
  });

  function handleChangeView() {
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
      {loading && <Loading type={"screen"} />}

      {!loading && (
        <div>
          <NavBar />
          {user && (
            <div className="dashboard-main">
              <UserInfo user={user} />

              {user.company && (
                <div className="dashboard-info employees-info">
                  <Button onClick={handleChangeView}>{view.text}</Button>
                  <Button onClick={handleOpenPicker}>Show cloud files</Button>
                </div>
              )}
            </div>
          )}
          {user && view.name == "files" && (
            <AllFiles
              setFilesLoading={setFilesLoading}
              filesLoading={filesLoading}
              foldersLoading={foldersLoading}
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
            <EmployeesAndUsersPage company={user.company} />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
