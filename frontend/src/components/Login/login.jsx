import React, { useState } from "react";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoAppName from "../LogoAppName/logoappname";
import {
  setCredentials,
  usePerformLoginMutation,
} from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [performLogin] = usePerformLoginMutation();

  const handleLogin = async (event) => {
    setError("");
    const { data, error } = await performLogin({ email, password });
    if (error) {
      setError("Failed to login. Please try again.");
      return;
    }
    const { accessToken } = data;
    dispatch(setCredentials({ accessToken }));
    navigate("/dashboard");
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

export default Login;
