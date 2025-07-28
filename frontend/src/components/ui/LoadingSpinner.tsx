import React from 'react';

type SpinnerSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';
type SpinnerVariant = 'border' | 'circle' | 'dots' | 'pulse';
type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'custom';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  customColor?: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  label?: string;
  fullPage?: boolean;
}

/**
 * Componente mejorado de spinner de carga reutilizable
 * Múltiples variantes, colores y tamaños disponibles
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  variant = 'border',
  color = 'primary',
  customColor = '',
  speed = 'normal',
  className = '',
  label = 'Cargando...',
  fullPage = false
}) => {
  // Tamaños predefinidos para el spinner
  const sizeClasses = {
    xs: 'h-3 w-3',
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Colores para los spinners
  const colorClasses = {
    primary: 'border-primary-600 text-primary-600',
    secondary: 'border-secondary-600 text-secondary-600',
    success: 'border-green-600 text-green-600',
    danger: 'border-red-600 text-red-600',
    warning: 'border-yellow-600 text-yellow-600',
    info: 'border-blue-500 text-blue-500',
    light: 'border-gray-200 text-gray-200',
    dark: 'border-gray-800 text-gray-800',
    custom: customColor ? `border-[${customColor}] text-[${customColor}]` : 'border-primary-600 text-primary-600'
  };

  // Velocidades de animación
  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'circle':
        return (
          <svg className={`${sizeClasses[size]} ${speedClasses[speed]}`} viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      case 'dots':
        return (
          <div className={`flex space-x-1 ${sizeClasses[size]}`}>
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className={`animate-bounce rounded-full bg-current ${index === 1 ? 'animation-delay-200' : index === 2 ? 'animation-delay-400' : ''}`}
                style={{
                  width: '25%',
                  height: '25%',
                  animationDuration: speed === 'slow' ? '1s' : speed === 'fast' ? '0.5s' : '0.75s'
                }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div 
            className={`${sizeClasses[size]} rounded-full animate-pulse bg-current opacity-75`}
            style={{
              animationDuration: speed === 'slow' ? '2s' : speed === 'fast' ? '0.7s' : '1.5s'
            }}
          />
        );
      case 'border':
      default:
        return (
          <div 
            className={`${sizeClasses[size]} ${speedClasses[speed]} rounded-full border-2 border-t-transparent border-b-transparent`}
          />
        );
    }
  };

  const spinnerElement = (
    <div 
      className={`
        inline-flex flex-col items-center justify-center
        ${fullPage ? 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50' : ''}
        ${className}
      `}
      role="status"
    >
      <div className={color === 'custom' && customColor ? `text-[${customColor}]` : colorClasses[color].split(' ')[1]}>
        {renderSpinner()}
      </div>
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );

  return spinnerElement;
};

export default LoadingSpinner;