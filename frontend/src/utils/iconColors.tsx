/**
 * Utilidades para colores de íconos en la aplicación
 * Basado en la paleta de colores de Gastify
 */
import React from 'react';

type IconColor = {
  bg: string;
  text: string;
  shadow: string;
};

const iconColors = {
  primary: {
    bg: 'bg-primary-600',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  financial: {
    bg: 'bg-financial-600',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  premium: {
    bg: 'bg-premium-600',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  accent: {
    bg: 'bg-accent-600',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  success: {
    bg: 'bg-green-500',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  warning: {
    bg: 'bg-yellow-500',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  error: {
    bg: 'bg-red-500',
    text: 'text-white',
    shadow: 'shadow-md',
  },
  info: {
    bg: 'bg-blue-500',
    text: 'text-white',
    shadow: 'shadow-md',
  },
} as const;

// Definimos y exportamos el tipo IconColorVariant
export type IconColorVariant = keyof typeof iconColors;

/**
 * Obtiene las clases de colores para un ícono
 * @param variant - Variante de color del ícono
 * @returns Clases de Tailwind para el ícono
 */
export function getIconColorClasses(variant: IconColorVariant = 'primary'): string {
  const color = iconColors[variant] || iconColors.primary;
  return `${color.bg} ${color.text} ${color.shadow}`;
}

/**
 * Componente de contenedor de ícono con estilos consistentes
 */
export const IconContainer: React.FC<{
  children: React.ReactNode;
  variant?: IconColorVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'primary', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  return (
    <div 
      className={`flex items-center justify-center rounded-md ${sizeClasses[size]} ${getIconColorClasses(variant)} ${className}`}
    >
      {children}
    </div>
  );
};
