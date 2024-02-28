import { useState } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./store/authSlice";

function App() {
  const [count, setCount] = useState(0);

  const isAuthenticated = useSelector(selectCurrentToken);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
