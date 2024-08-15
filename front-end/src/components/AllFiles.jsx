import React, { useEffect } from "react";
import File from "./File";
import "../components-style/AllFiles.css";
import axios from "axios";
import { useState } from "react";

const AllFiles = ({ company, files }) => {


  return (
    <>
      {company && (
        <h4 className="all-files-title">
          Files shared through company {company.name}
        </h4>
      )}
      <div className="all-files">
        {files && files.map((file) => <File file={file} key={file.id} />)}
      </div>
    </>
  );
};

export default AllFiles;
