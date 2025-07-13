import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar navegacional para la aplicación
 * Muestra enlaces a las diferentes secciones según rol del usuario
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();

  // Clase común para links activos
  const activeClassName = "bg-primary-100 text-primary-900 font-medium";
  
  // Clase base para todos los links
  const baseClassName = "flex items-center px-4 py-2 text-sm rounded-md transition-colors";

  // Links comunes para todos los usuarios
  const navLinks = [
    { to: "/dashboard", text: "Dashboard", icon: "chart-bar" },
    { to: "/expenses", text: "Gastos", icon: "receipt-percent" },
    { to: "/profile", text: "Mi Perfil", icon: "user" },
  ];

  // Links adicionales para administradores
  const adminLinks = [
    { to: "/users", text: "Usuarios", icon: "users" },
    { to: "/settings/company", text: "Configuración", icon: "cog" },
  ];

  // Renderiza icono según nombre (versión simplificada)
  const renderIcon = (iconName: string) => {
    return (
      <svg
        className="h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {/* Rutas genéricas para representar los iconos */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    );
  };

  return (
    <>
      {/* Overlay para cerrar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg transform transition-transform md:translate-x-0 md:static md:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo y cabecera */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-xl font-bold text-primary-600">Gastify</div>
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={onClose}
          >
            <span className="sr-only">Cerrar menú</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <nav className="mt-6 px-2">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${baseClassName} ${isActive ? activeClassName : 'text-gray-600 hover:bg-gray-100'}`
                }
              >
                {renderIcon(link.icon)}
                {link.text}
              </NavLink>
            ))}

            {/* Enlaces solo para administradores */}
            {currentUser?.role === 'admin' && (
              <>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Administración
                  </p>
                  <div className="mt-1 space-y-1">
                    {adminLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `${baseClassName} ${isActive ? activeClassName : 'text-gray-600 hover:bg-gray-100'}`
                        }
                      >
                        {renderIcon(link.icon)}
                        {link.text}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;