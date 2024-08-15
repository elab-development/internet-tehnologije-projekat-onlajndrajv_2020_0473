import { useState } from "react";
import "../components-style/PopupForm.css";
import OutsideAlerter from "./OutsideAlerter";
import axios from "axios";

function PopupFormEdit({ setPopup, file, setFile }) {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

  function handleCancel(e) {
    e.preventDefault();
    setPopup(false);
  }

  function handleConfirm(e) {
    e.preventDefault();
    axios
      .patch("api/files/" + file.id, data, config)
      .then((res) => {
        console.log("Uspesna izmena fajla: " + file.name + " !");

        console.log(res.data);
        setFile(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [data, setData] = useState({
    name: file.name,
    description: file.description,
    path: file.path,
  });

  function handleInput(e) {
    let newData = data;
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  return (
    <div className="popup">
      <OutsideAlerter setPopup={setPopup}>
        <div className="popup-inner">
          <h4>Edit file: {file.name}</h4>
          <form>
            <label>
              Name:
              <input
                className="input"
                name="name"
                id="name"
                type="text"
                defaultValue={file.name}
                onInput={handleInput}
              />
            </label>
            <label>
              Description:
              <textarea
                className="text-area-desc"
                name="description"
                id="description"
                rows="3"
                defaultValue={file.description}
                onInput={handleInput}
              ></textarea>
            </label>
            <label>
              Path:
              <input
                className="input"
                name="path"
                id="path"
                type="text"
                defaultValue={file.path}
                onInput={handleInput}
              />
            </label>
            <div className="buttons-wrapper">
              <button className="button-edit" onClick={handleConfirm}>
                Confirm change
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

export default PopupFormEdit;
