import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  useGetUsersQuery,
  selectAllUsers,
} from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { usePerformLogoutMutation } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  let { error, isLoading, isSuccess, isError } = useGetUsersQuery(undefined, {
    pollingInterval: 1000,
  });

  const data = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const [logout] = usePerformLogoutMutation();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/login");
    };

    if (isError && error?.status === 401) {
      performLogout();
    }
  }, [isError, error, logout, navigate]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : isSuccess ? (
        data.map((user) => (
          <div key={user.id}>
            <h1>{user.fullName}</h1>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        ))
      ) : null}

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
