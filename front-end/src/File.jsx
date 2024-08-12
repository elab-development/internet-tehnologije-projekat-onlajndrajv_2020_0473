import React from "react";
import "./File.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

function File({ file }) {
  return (
    <div className="file-wrapper">
      <div className="file-body">
      <button className="btn">
          <IoEyeSharp />
        </button>
        <button className="btn">
          <MdModeEdit />
        </button>
        <button className="btn">
          <FaDownload />
        </button>
        <button className="btn">
          <RiDeleteBinFill />
        </button>
      </div>
      <h6 className="file-title">{file.title}</h6>
    </div>
  );
}

export default File;
