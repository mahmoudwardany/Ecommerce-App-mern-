import React from "react";
import AdminPanel from "../../components/AdminPanel";

const ShowUsers = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-3 m-3 p-3">
          <AdminPanel />
        </div>
        <div className="col-md-9 w-50 m-3 p-3">
          <h1>All User</h1>
        </div>
      </div>
    </div>
  );
};

export default ShowUsers;
