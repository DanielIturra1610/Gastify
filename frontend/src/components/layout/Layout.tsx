import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout principal de la aplicación
 * Contiene la estructura base con sidebar, navbar, contenido principal y footer
 */
const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar móvil */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Navbar fijo */}
      <Navbar onMenuButtonClick={toggleSidebar} />

      {/* Contenido principal */}
      <div className="pt-16 md:pl-64">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {/* Renderizar rutas hijas */}
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;