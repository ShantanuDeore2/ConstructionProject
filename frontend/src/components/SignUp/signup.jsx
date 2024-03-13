import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoAppName from "../LogoAppName/logoappname";
import { useRegisterUserMutation } from "../../store/authSlice";

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
  const [registerUser] = useRegisterUserMutation();

  const handleSignup = async (event) => {
    setError(""); // Reset error message
    const { data, error } = await registerUser({ email, password, fullName });
    if (error) {
      setError("Failed to login. Please try again.");
      return;
    }
    navigate("/login");
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
        onClick={handleSignup}
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
