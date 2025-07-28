import React from 'react';
import { IconContainer, IconColorVariant } from '../../utils/iconColors';

interface FeatureIconProps {
  icon?: React.ReactNode;
  variant?: IconColorVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Componente de ícono para características con estilos consistentes
 */
const FeatureIcon: React.FC<FeatureIconProps> = ({
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}) => {
  // Si se proporciona children, usarlo en lugar del icon prop
  const iconContent = icon || children;
  
  return (
    <IconContainer 
      variant={variant} 
      size={size}
      className={`${className} transition-all duration-200 hover:scale-105`}
    >
      {React.isValidElement(iconContent) 
        ? React.cloneElement(iconContent as React.ReactElement, {
            className: `${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'}`,
          })
        : iconContent
      }
    </IconContainer>
  );
};

export default FeatureIcon;
