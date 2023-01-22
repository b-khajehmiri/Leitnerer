import React from "react";
import { UserAuth } from "../context/AuthContext";
import SignIn from "./SignIn";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <SignIn />;
  }
  return children;
};

export default ProtectedRoute;
