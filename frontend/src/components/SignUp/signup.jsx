import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoAppName from "../LogoAppName/logoappname";

import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message
    console.log(email, password, fullName);
    navigate("/signup");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw error for bad response
      }

      const data = await response.json();
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again."); // Update error state
    }
  };

  return (
    <Stack
      justifyContent={"center"}
      alignSelf={"center"}
      sx={{
        width: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
      }}
    >
      <LogoAppName />
      <TextField
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="Full Name"
        name="fullName"
        autoFocus
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Typography
        variant="h6"
        color="error"
        sx={{
          alignSelf: "center",
        }}
      >
        {error}
      </Typography>

      <Button
        fullWidth
        onClick={handleLogin}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default SignUp;
