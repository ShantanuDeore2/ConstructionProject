import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"}>
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
            &copy; 2023 RoadWorks
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
