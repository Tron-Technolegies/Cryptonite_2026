import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("access");

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
