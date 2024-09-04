import File from "./File";
import "../components-style/AllFiles.css";
import { useState } from "react";
import PopupFormAdd from "./PopupFormAdd";
import Folder from "./Folder";
import axios from "axios";
import Loading from "./Loading";
import Button from "./Button";

const AllFiles = ({
  setFilesLoading,
  filesLoading,
  foldersLoading,
  currentFolder,
  setCurrentFolder,
  company,
  files,
  folders,
  setFiles,
  setFolders,
}) => {
  const [type, setType] = useState();

  const [focusedFolder, setFocusedFolder] = useState(null);

  function handleDeletionFile(file) {
    const arr = files.filter((item) => item.id !== file.id);
    setFiles(arr);
  }

  function handleDeletionFolder(folder) {
    const arr = folders.filter((item) => item.id !== folder.id);
    setFolders(arr);
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
    console.log(currentFolder);

    setType("folder");
    setPopup(true);
  }

  function handleGoBackClick() {
    setFilesLoading(true);
    const willing_path = currentFolder.parent_path;
    const parent_path = currentFolder.parent_path.substr(
      0,
      currentFolder.parent_path.lastIndexOf("/")
    );
    let name;
    if (currentFolder.path.includes("/")) {
      name = currentFolder.path.split("/").pop();
    } else {
      name = "";
    }
    const newCurrentFolder = {
      name: name,
      path: willing_path,
      parent_path: parent_path,
    };
    setCurrentFolder(newCurrentFolder);
    setFocusedFolder(null);
    console.log("click");
  }

  function handleDeleteFolderClick() {
    console.log("click");
    axios
      .delete("api/folders/" + company.id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          id: focusedFolder.id,
        },
      })
      .then((res) => {
        console.log(
          "Uspesan zahtev za brisanje foldera: " + focusedFolder.name + " !"
        );
        console.log("Rezultat: ");
        console.log(res);

        handleDeletionFolder(focusedFolder);
        setFocusedFolder(null);
      })
      .catch((e) => {
        console.log(e);
      });
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
            <Button
              onClick={handleGoBackClick}
              disabled={currentFolder.path == "" ? true : false}
            >
              Go back
            </Button>
            <h4 className="all-files-title">
              Files shared through company {company.name}
            </h4>
            <Button onClick={handleAddNewFileClick}>Add a new file</Button>
            <Button onClick={handleAddNewFolderClick}>Add a new folder</Button>
            <Button
              
              onClick={handleDeleteFolderClick}
              disabled={!focusedFolder ? true : false}
              type="delete delete-folder"
            >
              Delete selected folder
            </Button>
          </div>
        )}
        {!filesLoading && !foldersLoading && (
          <div className="all-files">
            {folders &&
              folders.map((folder) => (
                <Folder
                  setFilesLoading={setFilesLoading}
                  currentFolder={currentFolder}
                  setCurrentFolder={setCurrentFolder}
                  setFocusedFolder={setFocusedFolder}
                  folder={folder}
                  key={folder.id}
                />
              ))}
            {files &&
              files.map((file) => (
                <File
                  file={file}
                  deletedFile={handleDeletionFile}
                  key={file.id}
                />
              ))}
          </div>
        )}
        {filesLoading && foldersLoading && <Loading type={"segment"} />}
      </>
    </>
  );
};

export default AllFiles;
