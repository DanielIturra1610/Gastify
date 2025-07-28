import React, { useEffect, useRef, useState } from 'react';

interface BackgroundEffectProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
  interactive?: boolean;
  density?: 'low' | 'medium' | 'high';
  animate?: boolean;
}

const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  children,
  variant = 'primary',
  interactive = true,
  density = 'medium',
  animate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Configuración de densidades para elementos de fondo
  const densityConfig = {
    low: { blobs: 3, particles: 15 },
    medium: { blobs: 5, particles: 30 },
    high: { blobs: 8, particles: 50 },
  };

  // Actualizar dimensiones cuando cambia el tamaño de la ventana
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Gestionar interactividad con el ratón
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  // Generar configuración de blobs
  const generateBlobs = () => {
    const count = densityConfig[density].blobs;
    const blobs = [];
    
    // Clases para variantes de colores
    const variantClasses = {
      primary: [
        'bg-gradient-to-r from-primary-300/30 to-primary-400/40',
        'bg-gradient-to-l from-primary-400/20 to-primary-500/30',
        'bg-gradient-to-tr from-primary-200/30 to-primary-400/20',
      ],
      secondary: [
        'bg-gradient-to-r from-accent-300/30 to-accent-400/40',
        'bg-gradient-to-l from-accent-400/20 to-accent-500/30',
        'bg-gradient-to-tr from-accent-200/30 to-accent-400/20',
      ],
      gradient: [
        'bg-gradient-to-r from-primary-300/30 to-accent-400/40',
        'bg-gradient-to-l from-financial-400/20 to-primary-500/30',
        'bg-gradient-to-tr from-accent-200/30 to-financial-400/20',
      ],
    };
    
    // Posiciones y tamaños aleatorios para cada blob
    for (let i = 0; i < count; i++) {
      const index = i % variantClasses[variant].length;
      const delay = i * 2000;
      const size = Math.floor(Math.random() * 100) + 150; // Tamaño entre 150 y 250px
      const left = `${Math.floor(Math.random() * 80)}%`;
      const top = `${Math.floor(Math.random() * 80)}%`;
      
      blobs.push(
        <div
          key={`blob-${i}`}
          className={`absolute rounded-full blur-2xl ${variantClasses[variant][index]} ${
            animate ? 'animate-blob' : ''
          }`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left,
            top,
            animationDelay: `${delay}ms`,
            transform: interactive && isHovering 
              ? `translate(${(mousePosition.x / dimensions.width - 0.5) * -20}px, ${(mousePosition.y / dimensions.height - 0.5) * -20}px)` 
              : 'none',
            transition: 'transform 0.5s ease-out',
          }}
        />
      );
    }
    
    return blobs;
  };

  // Generar partículas pequeñas
  const generateParticles = () => {
    const count = densityConfig[density].particles;
    const particles = [];
    
    // Clases para variantes de colores
    const particleColors = {
      primary: ['bg-primary-300/40', 'bg-primary-400/30', 'bg-primary-500/20'],
      secondary: ['bg-accent-300/40', 'bg-accent-400/30', 'bg-accent-500/20'],
      gradient: ['bg-primary-300/40', 'bg-accent-400/30', 'bg-financial-500/20'],
    };
    
    for (let i = 0; i < count; i++) {
      const colorIndex = i % particleColors[variant].length;
      const size = Math.floor(Math.random() * 4) + 2; // Tamaño entre 2 y 6px
      const left = `${Math.floor(Math.random() * 95)}%`;
      const top = `${Math.floor(Math.random() * 95)}%`;
      const opacity = Math.random() * 0.6 + 0.2; // Opacidad entre 0.2 y 0.8
      const animationDuration = Math.floor(Math.random() * 10) + 10; // 10-20s
      
      particles.push(
        <div
          key={`particle-${i}`}
          className={`absolute rounded-full ${particleColors[variant][colorIndex]}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left,
            top,
            opacity,
            transform: interactive && isHovering 
              ? `translate(${(mousePosition.x / dimensions.width - 0.5) * -5}px, ${(mousePosition.y / dimensions.height - 0.5) * -5}px)` 
              : 'none',
            transition: 'transform 0.8s ease-out',
            animation: animate ? `float ${animationDuration}s infinite alternate ease-in-out` : 'none',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      );
    }
    
    return particles;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Gradientes y efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      {/* Blobs de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {generateBlobs()}
      </div>
      
      {/* Partículas pequeñas */}
      <div className="absolute inset-0 overflow-hidden">
        {generateParticles()}
      </div>
      
      {/* Rejilla/grid sutil */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: 0.3,
        }} 
      />
      
      {/* Contenido */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default BackgroundEffect;
