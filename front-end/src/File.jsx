import React from "react";
import "./File.css";
import { AiOutlineEye } from "react-icons/ai";

function File({ file }) {
  return (
    <div className="file-wrapper">
      <div className="file-body">
        <button>
          <AiOutlineEye />
        </button>
      </div>
      <h6 className="file-title">{file.title}</h6>
    </div>
  );
}

export default File;
