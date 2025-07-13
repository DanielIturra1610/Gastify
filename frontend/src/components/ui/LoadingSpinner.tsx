import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Componente de spinner de carga reutilizable
 * Puede ser configurado en diferentes tamaños
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  // Tamaños predefinidos para el spinner
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-600 ${sizeClasses[size]}`}
        aria-label="Cargando"
      ></div>
    </div>
  );
};

export default LoadingSpinner;