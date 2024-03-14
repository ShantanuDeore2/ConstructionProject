import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import AppLogo from "../Logo/logo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  usePerformLogoutMutation,
} from "../../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectCurrentToken);
  const [logout] = usePerformLogoutMutation();

  const performLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <AppLogo />
          </Box>
          <Box>
            {!isAuthenticated && (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            {!isAuthenticated && (
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            )}
            {isAuthenticated && (
              <Button color="inherit" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            )}
            {isAuthenticated && (
              <Button color="inherit" onClick={() => performLogout()}>
                Log Out
              </Button>
            )}
            <Button color="inherit" onClick={() => navigate("/dashboard2")}>
              Dashboard2
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
