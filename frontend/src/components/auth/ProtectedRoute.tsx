import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Componente para proteger rutas que requieren autenticación
 * Redirige a /login si el usuario no está autenticado
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir a login y guardar la ubicación intentada para volver después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario está autenticado, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;