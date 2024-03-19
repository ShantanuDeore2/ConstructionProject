import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import AppLogo from "../Logo/logo";
import { toggleMenu } from "../../store/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  selectCurrentToken,
  usePerformLogoutMutation,
} from "../../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectCurrentToken);
  const [logout] = usePerformLogoutMutation();

  const location = useLocation();
  const path = location.pathname;

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(path);

  const performLogout = async () => {
    await logout();
    navigate("/login");
  };

  const performToggle = () => {
    dispatch(toggleMenu());
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AppLogo />
            {isAuthenticated && (
              <Box sx={{ display: { sm: "none" } }}>
                <Button color="inherit" onClick={() => performToggle()}>
                  Menu
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            {!isAuthenticated && isPublicPath && (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            {!isAuthenticated && isPublicPath && (
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
              Not Found
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
