import React from 'react';
import { features } from '../../constants/features';
import FeatureIcon from '../ui/FeatureIcon';

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="space-y-4 group">
              <FeatureIcon variant={feature.variant}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {feature.icon}
                </svg>
              </FeatureIcon>
              <h3 className="text-lg font-medium leading-6 text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
