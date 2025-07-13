import React from 'react';

/**
 * Footer de la aplicación
 * Muestra información de copyright y enlaces útiles
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Gastify. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600"
              onClick={(e) => e.preventDefault()}
            >
              Términos de Servicio
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600"
              onClick={(e) => e.preventDefault()}
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-primary-600"
              onClick={(e) => e.preventDefault()}
            >
              Soporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;