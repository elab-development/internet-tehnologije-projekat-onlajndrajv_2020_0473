import React from "react";

const PageItem = ({ num, currentPage, setCurrentPage }) => {
  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(num);
  }

  return (
    <a
      className="pagination-item"
      onClick={(e) => handleClick(e)}
      style={
        currentPage === num
          ? {
              textDecoration: "underline",
              backgroundColor: "white",
              color: "#2f4858",
            }
          : null
      }
      href=""
    >
      {num}
    </a>
  );
};

export default PageItem;
