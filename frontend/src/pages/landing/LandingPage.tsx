import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página principal de Gastify - Landing Page
 * Muestra las características principales y beneficios de la aplicación
 */
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Gestión de Gastos</span>{' '}
                  <span className="block text-primary-600 xl:inline">Simplificada</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Gastify es la solución completa para la gestión eficiente de gastos corporativos. 
                  Simplifica el proceso de registro, aprobación y seguimiento de gastos, 
                  optimizando tu tiempo y reduciendo costos innecesarios.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                    >
                      Comenzar Ahora
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/images/hero-image.jpg"
            alt="Person using a laptop"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Sistema de Aprobación Automático</h3>
              <p className="mt-2 text-base text-gray-500">
                Nuestro sistema inteligente de aprobación automática reduce el tiempo de revisión de gastos 
                hasta en un 70%, permitiendo a los gerentes concentrarse en tareas más estratégicas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informes en Tiempo Real</h3>
              <p className="mt-2 text-base text-gray-500">
                Accede a informes detallados y personalizables en tiempo real. 
                Monitorea el gasto por departamento, proyecto o empleado de manera instantánea.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Integración con Contabilidad</h3>
              <p className="mt-2 text-base text-gray-500">
                Exporta tus gastos directamente a tu sistema contable. 
                Gastify se integra con los principales ERP y sistemas contables del mercado.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Seguridad y Privacidad</h3>
              <p className="mt-2 text-base text-gray-500">
                Tus datos están seguros con Gastify. 
                Implementamos las mejores prácticas de seguridad para proteger tu información financiera.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Cómo Gastify te ayuda?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Descubre cómo Gastify puede transformar la gestión de gastos de tu empresa
            </p>
          </div>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Benefit 1 */}
              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Ahorro de Tiempo</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Reduce el tiempo dedicado a la gestión de gastos hasta en un 70% con nuestro sistema automatizado.
                </dd>
              </div>

              {/* Benefit 2 */}
              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Control Total</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Accede a toda la información de tus gastos desde cualquier dispositivo, en tiempo real.
                </dd>
              </div>

              {/* Benefit 3 */}
              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Optimización de Costos</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Identifica patrones de gasto y oportunidades de ahorro con nuestros análisis detallados.
                </dd>
              </div>

              {/* Benefit 4 */}
              <div>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Compliance Fiscal</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Mantén el registro de tus gastos en orden y cumple con todas las obligaciones fiscales.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Listo para transformar tu gestión de gastos?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Únete a las empresas que ya están optimizando sus procesos con Gastify.
            </p>
            <div className="mt-8">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Empezar Ahora
              </Link>
              <Link
                to="/contact"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Solicitar Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
