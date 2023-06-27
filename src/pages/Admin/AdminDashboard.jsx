import React from "react";
import AdminPanel from "../../components/AdminPanel";
import { useAuth } from "../../reducers/AuthContext";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid text-center">
      <div className="row g-3">
        <h2 className="mt-4">Admin Dashboard</h2>

        <div className="col-md-3  p-3">
          <AdminPanel />
        </div>
        <div className="card col-md-9 w-75  p-3 text-sm-center text-start mx-sm-auto">
          <h3>Admin Name :{auth?.user?.name}</h3>
          <h3>Admin Email :{auth?.user?.email}</h3>
          <h3>Admin Contact :{auth?.user?.phone}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
