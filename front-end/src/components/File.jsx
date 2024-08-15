import React, { useState } from "react";
import "../components-style/File.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import PopupFormEdit from "./PopupFormEdit";

function File({ file, deletedFile }) {
  const [fileState, setFileState] = useState(file);
  const [popup, setPopup] = useState(false);

  function handleFileView() {
    console.log("Funkcija pogledaj: " + fileState.name);
  }

  function handleFileEdit() {
    setPopup(true);
  }

  function handleFileDownload() {
    console.log("Funkcija skini: " + fileState.name);
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
        Swal.fire({
          title: "Deleted!",
          text: fileState.name + " is successfully deleted!",
          icon: "success",
        });

        fileDeletion();

        notification();
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
        console.log("Uspesno brisanje fajla: " + fileState.name + " !");
        console.log(res);

        deletedFile(fileState);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
          <button className="btn" onClick={handleFileView}>
            <IoEyeSharp />
          </button>
          <button className="btn" onClick={handleFileEdit}>
            <MdModeEdit />
          </button>
          <button className="btn" onClick={handleFileDownload}>
            <FaDownload />
          </button>
          <button className="btn" onClick={handleFileDeleteClick}>
            <RiDeleteBinFill />
          </button>
        </div>
        <h6 className="file-title">{fileState.name}</h6>
      </div>
    </>
  );
}

export default File;
