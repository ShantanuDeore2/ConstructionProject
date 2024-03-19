import React from "react";
import { Outlet, Link, redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/slices/authSlice";
import { useLocation } from "react-router-dom";

const PersistLoginPublic = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(token ? false : true);
  let [refresh, { isSuccess, isError, isLoading, isUninitialized }] =
    useRefreshMutation();

  const location = useLocation();
  const path = location.pathname;

  if (token) {
    isSuccess = true;
    isError = false;
    isLoading = false;
  }

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setLoading(false);
        } catch (err) {}
      };

      if (!token) {
        console.log("no token hence calling verifyRefreshToken");
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);
  }, [path]);

  let content;
  if (isLoading || loading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = <Navigate to="/dashboard" />;
  } else {
    content = <Outlet />;
  }

  return content;
};

export default PersistLoginPublic;
