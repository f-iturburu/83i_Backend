import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
   
  if (false) {
    return <Navigate to={"/"}></Navigate>;
  } else {
    return children;
  }
};
