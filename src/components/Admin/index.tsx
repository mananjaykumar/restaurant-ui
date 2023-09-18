import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "./AdminAuth/AdminLogin";
import Sidebar from "./AdminLayout/Sidebar";

const Admin = () => {
  const { userData } = useSelector((state: any) => state.auth);
  if (userData?.role?.includes("admin"))
    return (
      <div>
        <Sidebar>kjfldjlkfjkfj</Sidebar>
      </div>
    );
  else return <AdminLogin />;
};

export default Admin;
