import React, { useEffect } from "react";
import File from "./File";
import "../components-style/AllFiles.css";
import axios from "axios";
import { useState } from "react";

const AllFiles = ({ company }) => {
  const [files, setFiles] = useState();

  function getFilesForCompany() {
    axios
      .get("api/companies/" + company.id + "/files")
      .then((res) => {
        console.log(res.data.files);
        setFiles(res.data.files);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getFilesForCompany();
  }, []);

  return (
    <>
      {company && <h4 className="all-files-title">Files shared through company {company.name}</h4>}
      <div className="all-files">
        {files != null &&
          files.map((file) => <File file={file} key={file.id} />)}
      </div>
    </>
  );
};

export default AllFiles;
