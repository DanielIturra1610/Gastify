import React, { useEffect, useRef, useState } from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';
type AnimationDuration = 'fast' | 'normal' | 'slow';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  duration?: AnimationDuration;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  disabled?: boolean;
}

/**
 * Componente para animaciones on-scroll
 * Revela contenido con animaciones cuando aparece en el viewport
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  duration = 'normal',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mapeo de duraciones a ms para las transiciones
  const durationValues = {
    fast: 500,
    normal: 700,
    slow: 1000,
  };

  // Mapeo de direcciones a clases de transformación inicial
  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
    fade: 'opacity-0 translate-y-0',
  };

  useEffect(() => {
    // Si está desactivado o ya ha animado (y once=true), saltamos la lógica
    if (disabled || (once && hasAnimated)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, hasAnimated, disabled]);

  // Si está desactivado, renderizamos directamente los children
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className={`
        transition-all 
        duration-${durationValues[duration]}
        ${isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${directionClasses[direction]}`}
        ${className}
      `}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${durationValues[duration]}ms` 
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
