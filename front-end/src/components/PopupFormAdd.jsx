import { useState } from "react";
import "../components-style/PopupForm.css";
import OutsideAlerter from "./OutsideAlerter";
import axios from "axios";
import Swal from "sweetalert2";

function PopupFormAdd({
  currentFolder,
  setPopup,
  company_id,
  addToFiles,
  addToFolders,
  type,
}) {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [folderName, setFolderName] = useState("");

  const [loading, setLoading] = useState(false);

  function notification() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      width: "fit-content",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: file.name + " is added successfully!",
    });
  }

  function handleCancel(e) {
    e.preventDefault();
    setPopup(false);
  }

  function handleAddFileClick(e) {
    setLoading(true);

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", fileName);
    formData.append("description", description);
    formData.append("data", file);
    formData.append("type", file.type);

    const extension = file.name.split(".").pop();

    formData.append("extension", extension);
    formData.append("path", currentFolder.path);

    axios
      .post("api/companies/" + company_id + "/files", formData, config)
      .then((res) => {
        setLoading(false);
        console.log("Uspesan zahtev za dodavanje fajla: " + fileName + " !");
        console.log("Rezultat: " + res);

        const file_from_server = res.data.file;

        addToFiles({
          id: file_from_server.id,
          name: file_from_server.name,
          description: file_from_server.description,
          path: file_from_server.path,
          extension: file_from_server.extension,
        });

        setPopup(false);
        notification();
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  function handleAddFolderClick(e) {
    setLoading(true);

    e.preventDefault();

    axios
      .post("api/folders/" + company_id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        name: folderName,
        path: currentFolder.path,
        parent_path: currentFolder.parent_path,
        current_folder_name: currentFolder.name,
      })
      .then((res) => {
        console.log("Uspesan zahtev za dodavanje foldera!");
        console.log("Rezultat: "+res);
        addToFolders(res.data);
        setLoading(false);
        setPopup(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  return (
    <div className="popup">
      <OutsideAlerter setPopup={setPopup}>
        <>
          {type == "folder" && (
            <div className="popup-inner">
              <h4>Add new folder</h4>
              <form>
                <label>
                  Name:
                  <input
                    className="input"
                    name="folderName"
                    id="folderName"
                    type="text"
                    onInput={(e) => setFolderName(e.target.value)}
                  />
                </label>
                {loading && (
                  <div className="loading-wrapper-popup">
                    <div className="loading"></div>
                  </div>
                )}
                <div className="buttons-wrapper">
                  <button
                    className="button-edit"
                    onClick={handleAddFolderClick}
                    disabled={loading ? true : false}
                  >
                    Confirm addition
                  </button>
                  <button className="button-close" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          {type == "file" && (
            <div className="popup-inner">
              <h4>Add new file</h4>
              <form>
                <label>
                  Name:
                  <input
                    className="input"
                    name="name"
                    id="name"
                    type="text"
                    onInput={(e) => setFileName(e.target.value)}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    className="input"
                    name="description"
                    id="description"
                    rows="3"
                    onInput={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
                <label>
                  File:
                  <input
                    className="input"
                    name="path"
                    id="path"
                    type="file"
                    onInput={(e) => setFile(e.target.files[0])}
                    disabled={loading ? true : false}
                  />
                </label>
                {loading && (
                  <div className="loading-wrapper-popup">
                    <div className="loading"></div>
                  </div>
                )}
                <div className="buttons-wrapper">
                  <button
                    className="button-edit"
                    onClick={handleAddFileClick}
                    disabled={loading ? true : false}
                  >
                    Confirm addition
                  </button>
                  <button className="button-close" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      </OutsideAlerter>
    </div>
  );
}

export default PopupFormAdd;
