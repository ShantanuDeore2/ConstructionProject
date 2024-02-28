import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import AppLogo from "../Logo/logo";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, logout } from "../../store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectCurrentToken);

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
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
