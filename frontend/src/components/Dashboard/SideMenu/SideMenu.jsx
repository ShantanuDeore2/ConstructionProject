import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import SideMenuNavigationLink from "./SideMenuNavigationLink";

const SideMenu = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Stack
      spacing={0}
      justifyContent="flex-start"
      sx={{ height: "100vh", width: "200px" }}
    >
      <SideMenuNavigationLink path={path} linkTo="/dashboard" linkName="Home" />
      <SideMenuNavigationLink
        path={path}
        linkTo="/dashboard/permission"
        linkName="Permission"
      />
      <SideMenuNavigationLink
        path={path}
        linkTo="/dashboard/permissions"
        linkName="Permissions"
      />
    </Stack>
  );
};

export default SideMenu;
