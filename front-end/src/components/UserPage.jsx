import React from "react";
import "../components-style/UserPage.css";
import NavBar from "./NavBar";

const UserPage = ({ user }) => {
  return (
    user && (
      <>
        <NavBar />
        <div className="user-page-wrapper">
          <div className="user-wrapper">
            <h4>
              <b>Name:</b> {user.user.name}
            </h4>
            <h4>
              <b>Email:</b> {user.user.email}
            </h4>
            {(user.owner || user.employed) && (
              <h4>
                <b>Company:</b> {user.company.name}
              </h4>
            )}
            <h4>
              <b>Status:</b>
              {user.owner
                ? " Owner"
                : user.employed
                ? " Employed"
                : " Unemployed"}
            </h4>
            <h4>
              <b>Joined the system:</b> {user.user.created_at}
            </h4>
          </div>
        </div>
      </>
    )
  );
};

export default UserPage;
