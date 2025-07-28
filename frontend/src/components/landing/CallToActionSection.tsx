import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">¿Listo para transformar la gestión de gastos de tu empresa?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-primary-100">
          Únete a cientos de empresas que ya están ahorrando tiempo y dinero con Gastify.
        </p>
        <Link
          to="/register"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
        >
          Comenzar prueba gratuita
        </Link>
        <p className="mt-3 text-sm text-primary-200">
          Sin tarjeta de crédito necesaria. Cancelación en cualquier momento.
        </p>
      </div>
    </div>
  );
};

export default CallToActionSection;
