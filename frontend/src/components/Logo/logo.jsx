import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/applogo.svg";
function AppLogo() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <img src={logo} alt="Logo" style={{ width: 50, height: "auto" }} />
    </Box>
  );
}

export default AppLogo;
