import React, { useEffect, useState } from "react";
import PageItem from "./PageItem";

const PaginationBar = ({
  totalObjects,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [pagesArr, setPagesArr] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  function fillPagesArray() {
    const totalPagesCalc = Math.ceil(totalObjects / itemsPerPage);

    if (totalPages !== totalPagesCalc) {
      setTotalPages(totalPagesCalc);

      setPagesArr([]);
      for (let i = 0; i < totalPagesCalc; i++) {
        setPagesArr((prev) => [...prev, i + 1]);
      }
    }
  }

  useEffect(() => {
    fillPagesArray();
  }, [totalObjects]);

  return (
    <div className="page-wrapper">
      {pagesArr && (
        <>
          {currentPage !== 1 && (
            <a
              className="pagination-item"
              onClick={(e) => {
                e.preventDefault();
                console.log("Pre " + currentPage);
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
                console.log("Posle " + currentPage);
              }}
            >
              {"<"}
            </a>
          )}

          {pagesArr.map((num) => (
            //mozda nepotrebna komponenta
            <PageItem
              key={num}
              num={num}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ))}

          {currentPage !== totalPages && (
            <a
              className="pagination-item"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            >
              {">"}
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default PaginationBar;
