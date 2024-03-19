import React from "react";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/slices/authSlice";
import Home from "./Home/Home";

const Dashboard = () => {
  const isAuthenticated = useSelector(selectCurrentToken);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Routes>
      <Route path="/*" element={<DashboardLayout />}>
        <Route index element={isAuthenticated ? <Home /> : <Home />} />
        <Route
          path="permission"
          element={isAuthenticated ? <Home /> : <Home />}
        />
      </Route>
    </Routes>
  );
};

export default Dashboard;
