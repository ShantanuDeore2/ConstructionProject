import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
