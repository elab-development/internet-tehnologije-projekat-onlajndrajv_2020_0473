import { useState } from "react";
import "../components-style/PopupForm.css";
import OutsideAlerter from "./OutsideAlerter";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "./Button";

function PopupFormEdit({ setPopup, file, setFile }) {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
    },
  };

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
      title: file.name + " is edited successfully!",
    });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    setPopup(false);
  }

  function handleConfirmClick(e) {
    e.preventDefault();
    axios
      .patch("api/files/" + file.id, data, config)
      .then((res) => {
        console.log("Uspesan zahtev za izmenu fajla: " + file.name + " !");
        console.log("Rezultat: " + res);

        setFile(res.data);
        setPopup(false);
        notification();
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
            <div className="buttons-wrapper">
              <Button onClick={handleConfirmClick} type="confirm">
                Confirm change
              </Button>
              <Button onClick={handleCancelClick} type="cancel">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </OutsideAlerter>
    </div>
  );
}

export default PopupFormEdit;
