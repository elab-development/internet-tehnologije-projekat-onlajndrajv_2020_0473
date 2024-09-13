import React, { useState } from "react";
import "../components-style/Folder.css";
import OutsideAlerter from "./OutsideAlerter";

const Folder = ({
  setFilesLoading,
  currentFolder,
  setCurrentFolder,
  setFocusedFolder,
  folder,
}) => {
  function handleClick() {
    setFocusedFolder(folder);
    setStyle({ outline: "3px solid #33648a", backgroundColor: "#4f89b69d" });
  }

  function turnOffBorder() {
    setStyle({
      outline: "3px solid transparent",
      backgroundColor: "transparent",
    });
    setFocusedFolder(null);
  }

  const [style, setStyle] = useState({
    outline: "3px solid transparent",
    backgroundColor: "transparent",
  });

  function handleDoubleClick() {
    setFilesLoading(true);
    setCurrentFolder(folder);
    setFocusedFolder(null);
  }

  return (
    <div className="folder-wrapper">
      <OutsideAlerter setPopup={turnOffBorder} setFocused={setFocusedFolder}>
        <div
          className="folder-body"
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          style={style}
        >
          <img
            className="folder-icon"
            src={require("../images/folder.png")}
            alt=""
          />
        </div>
      </OutsideAlerter>
      <h6 className="folder-title">{folder.name}</h6>
    </div>
  );
};

export default Folder;
