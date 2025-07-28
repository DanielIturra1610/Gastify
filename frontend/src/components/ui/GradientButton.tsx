import React from 'react';

type GradientType = 'primary' | 'secondary' | 'success' | 'danger' | 'custom';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GradientType;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  customGradient?: string;
  isLoading?: boolean;
}

/**
 * Botón con gradientes y animaciones
 * Componente accesible y configurable para acciones principales
 */
const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  customGradient = '',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Mapeo de variantes de gradientes
  const gradientVariants = {
    primary: 'from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800',
    secondary: 'from-secondary-500 to-secondary-700 hover:from-secondary-600 hover:to-secondary-800',
    success: 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
    danger: 'from-red-500 to-red-700 hover:from-red-600 hover:to-red-800',
    custom: customGradient,
  };
  
  // Mapeo de tamaños
  const sizeClasses = {
    xs: 'text-xs py-1 px-2',
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
    xl: 'text-xl py-3 px-6',
  };
  
  // Estado deshabilitado o cargando
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg
        bg-gradient-to-r ${gradientVariants[variant]}
        text-white shadow-md
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-0.5 hover:shadow-lg
        active:translate-y-0 active:shadow-inner
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
        disabled:shadow-none disabled:hover:translate-y-0
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg 
            className={`animate-spin -ml-1 mr-2 h-4 w-4 text-white`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default GradientButton;
