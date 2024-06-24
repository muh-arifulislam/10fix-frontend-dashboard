import React from "react";
import { useAppSelector } from "../redux/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  if (user?.role === "superAdmin" || user?.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/dashboard/orders"} />;
  }
};

export default ProtectedAdmin;
