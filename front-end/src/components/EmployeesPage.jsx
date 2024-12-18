import React from "react";
import Employee from "./Employee";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import PaginationBar from "./PaginationBar";

const itemsPerPage = 10;

const EmployeesPage = ({ company }) => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalObjects, setTotalObjects] = useState(0);

  function getEmployeesFromCompany(id) {
    setLoading(true);
    axios
      .get("api/companies/" + id + "/employees", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          page: currentPage,
          pageCount: itemsPerPage,
        },
      })
      .then((res) => {
        setEmployees(res.data.employees);
        setLoading(false);

        console.log("Uspesan zahtev za uzimanje zaposlenih");
        console.log("Rezultat: ");
        console.log(res);

        setTotalObjects(res.data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getEmployeesFromCompany(company.id);
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Loading type="segment" />
      ) : (
        employees &&
        employees.map((employee) => (
          <Employee
            employee={employee}
            setEmployees={setEmployees}
            key={employee.id}
          />
        ))
      )}
      <PaginationBar
        totalObjects={totalObjects}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default EmployeesPage;
