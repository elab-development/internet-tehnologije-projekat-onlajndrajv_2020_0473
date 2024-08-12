import React from "react";
import File from "./File";
import "./AllFiles.css";


const AllFiles = ({ files }) => {
  return (
    <div className="all-files">
      {files.map((file) => (
        <File file={file} />
      ))}
    </div>
  );
};

export default AllFiles;
