import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toggleMenu } from "../../../store/slices/appSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectMenuVisible } from "../../../store/slices/appSlice";

const SideMenuNavigationLink = ({ path, linkTo, linkName }) => {
  const isActive = path === linkTo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuVisible = useSelector(selectMenuVisible);
  const handleNavigation = () => {
    if (menuVisible) {
      dispatch(toggleMenu());
    }
    navigate(linkTo);
  };
  return (
    <Button
      onClick={() => handleNavigation()}
      sx={{
        backgroundColor: isActive ? "primary.main" : "inherit",
        ":hover": {
          backgroundColor: isActive ? "primary.dark" : "inherit", // Optional: change on hover
        },
        "&.MuiButton-root:active": {
          backgroundColor: isActive ? "primary.main" : "inherit",
        },
        "&.Mui-focusVisible": {
          // This targets the focus-visible state specifically
          backgroundColor: isActive ? "primary.main" : "inherit",
        },
      }}
    >
      {linkName}
    </Button>
  );
};

export default SideMenuNavigationLink;
