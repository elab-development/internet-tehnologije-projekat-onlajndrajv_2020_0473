import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import User from "./User";
import PaginationBar from "./PaginationBar";

const itemsPerPage = 10;

const UsersPage = ({ company }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalObjects, setTotalObjects] = useState(0);

  function getNotEmployedUsers() {
    setLoading(true);
    axios
      .get("api/users", {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("authToken")}`,
        },
        params: {
          page: currentPage,
          pageCount: itemsPerPage,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);

        console.log("Uspesan zahtev za uzimanje nezaposlenih");
        console.log("Rezultat: ");
        console.log(res);

        setTotalObjects(res.data.count);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  useEffect(() => {
    getNotEmployedUsers();
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <Loading type="segment" />
      ) : (
        users &&
        users.map((user) => (
          <User
            user={user}
            company={company}
            setUsers={setUsers}
            key={user.id}
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

export default UsersPage;
