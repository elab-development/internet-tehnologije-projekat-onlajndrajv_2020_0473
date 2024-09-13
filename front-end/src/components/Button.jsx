import React from "react";

const Button = ({ children, onClick, disabled = false, type = "basic" }) => {
  return (
    <button className={"btn " + type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
