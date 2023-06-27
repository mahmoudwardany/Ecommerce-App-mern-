import React from "react";
import UserPanel from "./UserPanel";
import { useAuth } from "../../reducers/AuthContext";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid text-center">
      <div className="row g-3">
        <h2 className="mt-4">User Dashboard</h2>

        <div className="col-md-3 col-sm-12  p-3">
          <UserPanel />
        </div>
        <div className="card col-md-9 col-sm-12 w-75  p-3 text-md-center mx-sm-auto">
          <h3>User Name :{auth?.user?.name}</h3>
          <h3>User Email :{auth?.user?.email}</h3>
          <h3>User Contact :{auth?.user?.phone}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
