import React from "react";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/*" element={<DashboardLayout />}>
        {/* left section menu bar */}
        {/* right section actual content */}
      </Route>
    </Routes>
  );
};

export default Dashboard;
