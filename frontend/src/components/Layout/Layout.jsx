import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import { Stack } from "@mui/material";

const Layout = () => {
  return (
    <Stack spacing={0} justifyContent="space-between" sx={{ height: "100%" }}>
      <Navbar />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
