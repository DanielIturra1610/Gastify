import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Tarjeta de característica con efectos hover
 * Utiliza un enfoque de diseño responsivo y accesible
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-md 
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
        p-6 flex flex-col gap-4
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Característica: ${title}` : undefined}
    >
      {icon && (
        <div className="flex justify-center items-center mb-2 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
