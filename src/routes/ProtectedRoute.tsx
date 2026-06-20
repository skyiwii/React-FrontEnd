import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  soloAdmin?: boolean;
  soloCliente?: boolean;
}

function ProtectedRoute({
  children,
  soloAdmin = false,
  soloCliente = false
}: ProtectedRouteProps) {
  const { estaLogueado, esAdmin } = useAuth();

  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  if (soloCliente && esAdmin) {
    return <Navigate to="/intranet/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;