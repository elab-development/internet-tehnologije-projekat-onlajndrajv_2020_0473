import React from "react";
import "../components-style/File.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

function fileView(file) {
  console.log("Funkcija pogledaj: "+file.title);
}

function fileEdit(file) {
  console.log("Funkcija edit: "+file.title);
}

function fileDownload(file) {
  console.log("Funkcija skini: "+file.title);
}

function fileDelete(file) {
  console.log("Funkcija izbrisi: "+file.title);
}

function File({ file }) {
  return (
    <div className="file-wrapper">
      <div className="file-body">
        <button className="btn" onClick={() => fileView(file)}>
          <IoEyeSharp />
        </button>
        <button className="btn" onClick={() => fileEdit(file)}>
          <MdModeEdit />
        </button>
        <button className="btn" onClick={() => fileDownload(file)}>
          <FaDownload />
        </button>
        <button className="btn" onClick={() => fileDelete(file)}>
          <RiDeleteBinFill />
        </button>
      </div>
      <h6 className="file-title">{file.title}</h6>
    </div>
  );
}

export default File;
