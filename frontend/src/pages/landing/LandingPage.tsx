import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importando componentes de landing
import HeroSection from '../../components/landing/HeroSection';
import ProblemSolution from '../../components/landing/ProblemSolution';
import InnovativeFeatures from '../../components/landing/InnovativeFeatures';
import ROICalculator from '../../components/landing/ROICalculator';
import ComparisonTable from '../../components/landing/ComparisonTable';
import UseCases from '../../components/landing/UseCases';
import Integration from '../../components/landing/Integration';

/**
 * Página principal de Gastify - Landing Page
 * Muestra las características principales y beneficios de la aplicación
 * con componentes modernos e interactivos
 */
const LandingPage: React.FC = () => {
  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Encabezado con navegación */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.svg"
                  alt="Gastify Logo"
                  className="h-8 w-auto mr-2"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Gastify</span>
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                Características
              </a>
              <a href="#roi" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                ROI
              </a>
              <a href="#comparison" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                Comparativa
              </a>
              <a href="#cases" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                Casos de Uso
              </a>
              <Link 
                to="/login" 
                className="ml-4 px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
            
            <div className="md:hidden">
              <button type="button" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-800 overflow-hidden">
        <HeroSection />
      </section>
      
      {/* Problem Solution */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <ProblemSolution />
      </section>
      
      {/* Innovative Features */}
      <section id="features" className="py-24 bg-white dark:bg-gray-800">
        <InnovativeFeatures />
      </section>
      
      {/* ROI Calculator */}
      <section id="roi" className="py-20 bg-gray-50 dark:bg-gray-900">
        <ROICalculator />
      </section>
      
      {/* Comparison Table */}
      <section id="comparison" className="py-24 bg-white dark:bg-gray-800">
        <ComparisonTable />
      </section>
      
      {/* Use Cases */}
      <section id="cases" className="py-20 bg-gray-50 dark:bg-gray-900">
        <UseCases />
      </section>
      
      {/* Integration */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <Integration />
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-6">
                <img src="/logo.svg" alt="Gastify Logo" className="h-8 w-auto mr-2" />
                <span className="text-xl font-bold">Gastify</span>
              </Link>
              <p className="text-gray-400 mb-6">
                Simplificando la gestión de gastos corporativos para empresas de todos los tamaños.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Producto</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white">Características</a></li>
                <li><a href="#roi" className="text-gray-400 hover:text-white">Calculadora ROI</a></li>
                <li><a href="#comparison" className="text-gray-400 hover:text-white">Comparativa</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Precios</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Soporte</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Centro de ayuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentación</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Términos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-12">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Gastify. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
