import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  // Referencia para efectos de parallax en toda la página
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Efecto de decoración en scroll para secciones
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const elementEl = element as HTMLElement;
        const speed = parseFloat(elementEl.dataset.speed || '0.1');
        const direction = elementEl.dataset.direction === 'up' ? -1 : 1;
        const offset = scrollTop * speed * direction;
        
        // Solo aplicamos parallax a elementos decorativos, no a las secciones completas
        elementEl.style.transform = `translateY(${offset}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-x-hidden relative">
      {/* Fondo unificado - patrón sutil en el fondo */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-0">
        {/* Patrones SVG sutiles */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'currentColor\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')",
            backgroundSize: '100px 100px'
          }}
        ></div>
        
        {/* Degradados sutiles flotantes */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-accent-500/5 to-transparent"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-financial-400/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-2/3 -left-32 w-96 h-96 rounded-full bg-accent-400/5 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      {/* Encabezado con navegación */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
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

      {/* Contenedor principal con z-index sobre el fondo */}
      <div className="relative z-10">
        {/* Elementos decorativos flotantes con parallax */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full border-2 border-primary-300/20 dark:border-primary-400/10 parallax-element" data-speed="0.08" data-direction="down"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-md border-2 border-accent-400/30 dark:border-accent-300/20 parallax-element" data-speed="0.06" data-direction="up"></div>
          <div className="absolute bottom-1/2 left-1/3 w-12 h-12 rounded-full border-2 border-secondary-400/20 dark:border-secondary-300/10 parallax-element" data-speed="0.04" data-direction="down"></div>
          <div className="absolute bottom-1/4 right-1/6 w-20 h-20 rounded-md border-2 border-financial-400/30 dark:border-financial-300/20 parallax-element" data-speed="0.07" data-direction="up"></div>
        </div>
        
        {/* Hero Section */}
        <section className="relative py-20 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
          </div>
        </section>
        
        {/* Problem Solution - fondo alterno */}
        <section className="py-20 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProblemSolution />
          </div>
        </section>
        
        {/* Innovative Features */}
        <section id="features" className="py-24 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InnovativeFeatures />
          </div>
        </section>
        
        {/* ROI Calculator - fondo alterno */}
        <section id="roi" className="py-20 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ROICalculator />
          </div>
        </section>
        
        {/* Comparison Table */}
        <section id="comparison" className="py-24 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable />
          </div>
        </section>
        
        {/* Use Cases - fondo alterno */}
        <section id="cases" className="py-20 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UseCases />
          </div>
        </section>
        
        {/* Integration */}
        <section className="py-24 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Integration />
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16 mt-12">
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
            <div className="flex justify-center mt-4">
              <span className="text-xs text-gray-500">Diseñado con ❤️ para la eficiencia empresarial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
