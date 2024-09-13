import React from "react";

const Loading = ({ type }) => {
  return type === "segment" ? (
    <div
      className="loading-wrapper-popup"
      style={{ marginTop: 20, marginBottom: 20 }}
    >
      <div className="loading"></div>
    </div>
  ) : (
    <div className="loading-wrapper">
      <div className="loading"></div>
    </div>
  );
};

export default Loading;
