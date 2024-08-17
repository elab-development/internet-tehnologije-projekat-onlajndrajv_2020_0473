import { useState } from "react";
import "../components-style/PopupForm.css";
import OutsideAlerter from "./OutsideAlerter";
import axios from "axios";
import Swal from "sweetalert2";

function PopupFormAdd({ setPopup, company_id, addToFiles }) {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [path, setPath] = useState("");

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

  function handleConfirm(e) {
    e.preventDefault();

    console.log("POCEOOOO");
    console.log("POCEOOOO");
    console.log("POCEOOOO");
    console.log("POCEOOOO");
    console.log("POCEOOOO");

    console.log(file);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("data", file);
    formData.append("type", file.type);

    const extension = file.name.split(".").pop();

    formData.append("extension", extension);
    formData.append("path", path);

    axios
      .post("api/companies/" + company_id + "/files", formData, config)
      .then((res) => {
        console.log("Uspesno dodavanje fajla: " + name + " !");
        console.log(res);

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

        console.log("ZAVRSIOOOO");
        console.log("ZAVRSIOOOO");
        console.log("ZAVRSIOOOO");
        console.log("ZAVRSIOOOO");
        console.log("ZAVRSIOOOO");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="popup">
      <OutsideAlerter setPopup={setPopup}>
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
                onInput={(e) => setName(e.target.value)}
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
              Path:
              <input
                className="input"
                name="path"
                id="path"
                type="text"
                placeholder="path/to/file"
                onInput={(e) => setPath(e.target.value)}
              />
            </label>
            <label>
              File:
              <input
                className="input"
                name="path"
                id="path"
                type="file"
                onInput={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="buttons-wrapper">
              <button className="button-edit" onClick={handleConfirm}>
                Confirm addition
              </button>
              <button className="button-close" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </OutsideAlerter>
    </div>
  );
}

export default PopupFormAdd;
