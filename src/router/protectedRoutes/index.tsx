import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
