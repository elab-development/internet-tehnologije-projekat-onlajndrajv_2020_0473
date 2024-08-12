import React from "react";
import File from "./File";
import "../components-style/AllFiles.css";


const AllFiles = ({ files }) => {
  return (
    <div className="all-files">
      {files.map((title, id) => (
        <File file={title} key={id}/>
      ))}
    </div>
  );
};

export default AllFiles;
