import React, { useEffect } from "react";
import File from "./File";
import "../components-style/AllFiles.css";
import axios from "axios";
import { useState } from "react";
import PopupFormAdd from "./PopupFormAdd";
import Folder from "./Folder";

const AllFiles = ({
  setFilesLoading,
  filesLoading,
  currentFolder,
  setCurrentFolder,
  company,
  files,
  folders,
  setFiles,
  setFolders,
}) => {
  const [type, setType] = useState();

  function handleDeletion(file) {
    const arr = files.filter((item) => item.id !== file.id);
    setFiles(arr);
  }

  function appendToFiles(file) {
    setFiles([...files, file]);
  }

  function appendToFolders(folder) {
    setFolders([...folders, folder]);
  }

  const [popup, setPopup] = useState(false);

  function handleAddNewFileClick() {
    setType("file");
    setPopup(true);
  }

  function handleAddNewFolderClick() {
    setType("folder");
    setPopup(true);
  }

  function handleGoBackClick() {
    setFilesLoading(true)
    const willing_path = currentFolder.parent_path;
    const parent_path = currentFolder.parent_path.substr(
      0,
      currentFolder.parent_path.lastIndexOf("/")
    );
    const name = currentFolder.path.split("/").pop();
    const newCurrentFolder = {
      name: name,
      path: willing_path,
      parent_path: parent_path,
    };
    setCurrentFolder(newCurrentFolder);
    console.log("click")
  }

  return (
    <>
      {popup && (
        <PopupFormAdd
          type={type}
          currentFolder={currentFolder}
          setPopup={setPopup}
          company_id={company.id}
          addToFiles={appendToFiles}
          addToFolders={appendToFolders}
        />
      )}
      <>
        {company && (
          <div className="title-button-wrapper">
            <button
              className="btn btn-view-employees btn-back" 
              onClick={handleGoBackClick}
              disabled={currentFolder.path == "" ? true : false}
            >
              Go back
            </button>
            <h4 className="all-files-title">
              Files shared through company {company.name}
            </h4>
            <button
              className="btn btn-view-employees"
              onClick={handleAddNewFileClick}
            >
              Add a new file
            </button>
            <button
              className="btn btn-view-employees"
              onClick={handleAddNewFolderClick}
            >
              Add a new folder
            </button>
          </div>
        )}
        {!filesLoading && (
          <div className="all-files">
            {folders &&
              folders.map((folder) => (
                <Folder
                  setFilesLoading={setFilesLoading}
                  currentFolder={currentFolder}
                  setCurrentFolder={setCurrentFolder}
                  folder={folder}
                  key={folder.id}
                />
              ))}
            {files &&
              files.map((file) => (
                <File file={file} deletedFile={handleDeletion} key={file.id} />
              ))}
          </div>
        )}
        {filesLoading && (
          <div className="loading-wrapper-popup" style={{ marginTop: 20 }}>
            <div className="loading"></div>
          </div>
        )}
      </>
    </>
  );
};

export default AllFiles;
