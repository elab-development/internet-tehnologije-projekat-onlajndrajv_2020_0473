import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="dashboard-info info-company">
      {user.company && (
        <>
          <h4>Company: {user.company.name}</h4>
          <h4>Description: {user.company.description}</h4>
          <h4>Owner: {user.company.owner.name}</h4>
        </>
      )}
      {!user.company && <h4>User is not in any company!</h4>}
    </div>
  );
};

export default UserInfo;
