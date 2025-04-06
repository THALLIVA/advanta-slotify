<<<<<<< HEAD

import { Navigate, Outlet } from "react-router-dom";
=======
import { Navigate, Outlet, useLocation } from "react-router-dom";
>>>>>>> source-repo/main
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
<<<<<<< HEAD
=======
  const location = useLocation();
>>>>>>> source-repo/main

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
<<<<<<< HEAD
    return <Navigate to="/auth/login" replace />;
=======
    // Save the attempted URL for redirecting after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
>>>>>>> source-repo/main
  }

  return <Outlet />;
};

<<<<<<< HEAD
export default ProtectedRoute;
=======
export default ProtectedRoute;
>>>>>>> source-repo/main
