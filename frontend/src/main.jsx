import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { apiSlice } from "./store/slices/apiSlice";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#b2fef7", // lighter shade of cyan/teal
      main: "#80cbc4", // main cyan/teal color
      dark: "#4f9a94", // darker shade of cyan/teal
      contrastText: "#000", // text color against the primary color background
    },
    secondary: {
      light: "#88ffff", // lighter shade of cyan
      main: "#4dd0e1", // main cyan color
      dark: "#009faf", // darker shade of cyan
      contrastText: "#000", // text color against the secondary color background
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#e0f7fa", // a light cyan background for the entire app
      paper: "#ffffff", // for elements like Cards
    },
    text: {
      primary: "#004d40", // a deep teal for primary text
      secondary: "#00796b", // a slightly lighter teal for secondary text
      disabled: "#b2dfdb", // a very light teal for disabled text
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} api={apiSlice}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
