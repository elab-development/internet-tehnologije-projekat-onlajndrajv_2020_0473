import React, { useState } from "react";
import "../App.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import PopupFormEdit from "./PopupFormEdit";
import Button from "./Button";

function File({ file, deletedFile }) {
  const [fileState, setFileState] = useState(file);
  const [popup, setPopup] = useState(false);

  function handleFileEdit() {
    setPopup(true);
  }

  function handleFileDownload() {
    axios
      .get("api/files/" + fileState.id, {
        responseType: "blob",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log("File download zahtev uspesno odradjen!");
        console.log(" Rezultat: " + res);

        const blob = new Blob([res.data], {
          type: res.data.type,
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileState.name;
        link.click();
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
      title: fileState.name + " is deleted successfully!",
    });
  }

  function handleFileDeleteClick() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete file " + fileState.name + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C70039",
      cancelButtonColor: "#B2BEB5",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        fileDeletion();

        Swal.fire({
          title: "Deleted!",
          text: fileState.name + " is successfully deleted!",
          icon: "success",
        });
      }
    });
  }

  function fileDeletion() {
    axios
      .delete("api/files/" + fileState.id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(
          "Uspesan zahtev za brisanje fajla: " + fileState.name + " !"
        );
        console.log("Rezultat: " + res);

        deletedFile(fileState);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const tryRequireImage = (ext) => {
    try {
      return require("../images/" + ext + ".png");
    } catch (err) {
      return require("../images/unknown.png");
    }
  };

  return (
    <>
      {popup && (
        <PopupFormEdit
          setPopup={setPopup}
          file={fileState}
          setFile={setFileState}
        />
      )}
      <div className="file-wrapper">
        <div className="file-body">
          <img
            className="image-icon"
            src={tryRequireImage(file.extension)}
            alt="Error with photo"
          />

          <Button onClick={handleFileEdit}>
            <MdModeEdit className="btn-icon" />
            <p>Edit</p>
          </Button>

          <Button onClick={handleFileDownload}>
            <FaDownload className="btn-icon" />
            <p>Download</p>
          </Button>

          <Button onClick={handleFileDeleteClick} type="delete">
            <RiDeleteBinFill className="btn-icon" />
            <p>Delete</p>
          </Button>
        </div>
        <h6 className="file-title">{fileState.name}</h6>
      </div>
    </>
  );
}

export default File;
