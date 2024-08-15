import React, { useEffect } from "react";
import File from "./File";
import "../components-style/AllFiles.css";
import axios from "axios";
import { useState } from "react";
import PopupFormAdd from "./PopupFormAdd";

const AllFiles = ({ company, files, setFiles }) => {
  function handleDeletion(file) {
    const arr = files.filter((item) => item.id !== file.id);
    setFiles(arr);
  }

  function appendToFiles(file) {
    setFiles([...files, file]);
  }

  const [popup, setPopup] = useState(false);

  function handleClick() {
    setPopup(true);
  }

  return (
    <>
      {popup && <PopupFormAdd setPopup={setPopup} company_id={company.id} addToFiles={appendToFiles}/>}
      <>
        {company && (
          <div className="title-button-wrapper">
            <h4 className="all-files-title">
              Files shared through company {company.name}
            </h4>
            <button className="btn btn-view-employees" onClick={handleClick}>
              Add a new file
            </button>
          </div>
        )}
        <div className="all-files">
          {files &&
            files.map((file) => (
              <File file={file} deletedFile={handleDeletion} key={file.id} />
            ))}
        </div>
      </>
    </>
  );
};

export default AllFiles;
