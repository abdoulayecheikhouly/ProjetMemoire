import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("🔐 PrivateRoute → token:", token);
  console.log("🔐 PrivateRoute → userRole:", userRole);
  console.log("🔐 PrivateRoute → role attendu:", role);

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
