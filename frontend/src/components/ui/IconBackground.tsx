import React from 'react';

type BackgroundShape = 'circle' | 'rounded' | 'square';
type BackgroundSize = 'sm' | 'md' | 'lg' | 'xl';
type AnimationType = 'pulse' | 'bounce' | 'spin' | 'none';

interface IconBackgroundProps {
  icon: React.ReactNode;
  shape?: BackgroundShape;
  size?: BackgroundSize;
  animation?: AnimationType;
  color?: string;
  className?: string;
}

/**
 * Fondo animado para iconos
 * Permite mostrar iconos con fondos estilizados y animaciones
 */
const IconBackground: React.FC<IconBackgroundProps> = ({
  icon,
  shape = 'circle',
  size = 'md',
  animation = 'none',
  color = 'primary',
  className = '',
}) => {
  // Mapeo de formas para las clases
  const shapeClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-none',
  };
  
  // Mapeo de tamaños
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5 text-sm',
    md: 'w-12 h-12 p-2.5 text-base',
    lg: 'w-16 h-16 p-3.5 text-lg',
    xl: 'w-20 h-20 p-4 text-xl',
  };

  // Mapeo de animaciones
  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    none: '',
  };

  // Mapeo de colores (usando el sistema de colores de Tailwind)
  const colorVariants = {
    primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-300',
    success: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  };

  // Obtener la clase de color adecuada o usar el string personalizado
  const colorClass = colorVariants[color as keyof typeof colorVariants] || color;

  return (
    <div
      className={`
        flex items-center justify-center
        ${shapeClasses[shape]}
        ${sizeClasses[size]}
        ${animationClasses[animation]}
        ${colorClass}
        transition-all duration-300 ease-in-out
        ${className}
      `}
      aria-hidden="true" // El icono es decorativo
    >
      {icon}
    </div>
  );
};

export default IconBackground;
