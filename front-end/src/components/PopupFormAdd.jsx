import { useState } from "react";
import "../components-style/PopupForm.css";
import OutsideAlerter from "./OutsideAlerter";
import axios from "axios";

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

  function handleCancel(e) {
    e.preventDefault();
    setPopup(false);
  }

  function handleConfirm(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("data", file);

    axios
      .post("api/companies/" + company_id + "/files", formData, config)
      .then((res) => {
        console.log("Uspesno dodavanje fajla: " + name + " !");

        addToFiles({
          id: res.data.file.id,
          name: name,
          description: description,
          path: "treba uneti",
        });
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
