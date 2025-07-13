import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Página de error 404 - Not Found
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Página no encontrada
          </h2>
          
          <p className="mt-4 text-sm text-gray-600">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <div className="mt-8">
            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isAuthenticated ? 'Volver al Dashboard' : 'Volver al Login'}
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contacta al{' '}
            <a href="mailto:soporte@gastify.app" className="font-medium text-primary-600 hover:text-primary-500">
              soporte técnico
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
