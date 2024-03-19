import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./store/slices/authSlice";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import PersistLoginPublic from "./components/PersistLogin/PersistLoginPublic";

function App() {
  const isAuthenticated = useSelector(selectCurrentToken);

  return (
    <Routes>
      <Route element={<PersistLoginPublic />}>
        <Route path="/" element={<Layout />}>
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          {/* <Route path="login" element={<Login />} /> */}

          <Route index element={<Dashboard />} />
          <Route path="dashboard/*" element={<Dashboard />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
