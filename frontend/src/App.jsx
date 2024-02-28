import { useState } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
