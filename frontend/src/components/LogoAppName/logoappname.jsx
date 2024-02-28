import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import logo from "../../assets/applogo.svg";

const LogoAppName = () => {
  return (
    <>
      <Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 80, width: "auto" }} />
          <Typography
            variant="h4"
            sx={{
              alignSelf: "center",
            }}
          >
            RoadWorks
          </Typography>
        </Stack>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              alignSelf: "center",
            }}
          >
            Welcome! Please login to continue.
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default LogoAppName;
