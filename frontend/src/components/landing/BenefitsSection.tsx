import React from 'react';
import { benefits } from '../../constants/features';
import FeatureIcon from '../ui/FeatureIcon';

const BenefitsSection: React.FC = () => {
  return (
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
            {benefits.map((benefit) => (
              <div key={benefit.id} className="group">
                <dt className="flex items-start">
                  <div className="flex-shrink-0">
                    <FeatureIcon variant={benefit.variant} size="sm">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {benefit.icon}
                      </svg>
                    </FeatureIcon>
                  </div>
                  <p className="ml-4 text-lg leading-6 font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {benefit.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
