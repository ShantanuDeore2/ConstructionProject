import { Stack, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import { useSelector } from "react-redux";
import { selectMenuVisible } from "../../../store/slices/appSlice";

const DashboardLayout = () => {
  const toggleMenuValue = useSelector(selectMenuVisible);
  return (
    <Stack
      spacing={0}
      justifyContent="flex-start"
      direction="row"
      sx={{ height: "100%" }}
    >
      <Box
        sx={{
          display: { xs: !toggleMenuValue ? "none" : "block", sm: "block" },
        }}
      >
        <SideMenu />
      </Box>
      <Box
        sx={{
          width: "100%",
          opacity: { xs: toggleMenuValue ? 0.33 : 1.0, sm: 1.0 },
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default DashboardLayout;
