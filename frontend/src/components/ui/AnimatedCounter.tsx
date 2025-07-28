import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

/**
 * Componente de contador animado para estadísticas
 * Anima el incremento desde start hasta end en duration ms
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(start);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  useEffect(() => {
    // Reset counter if end value changes
    setCount(start);
    
    if (start === end) return;

    let currentCount = start;
    const counter = setInterval(() => {
      // Calculate increment for smooth animation
      const remainingTime = Math.max(0, duration - (currentCount - start) * stepTime);
      const increment = remainingTime > 0 
        ? Math.max(1, Math.floor((end - currentCount) * (stepTime / remainingTime)))
        : 1;
      
      currentCount = Math.min(currentCount + increment, end);
      setCount(currentCount);

      if (currentCount === end) {
        clearInterval(counter);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [start, end, duration, stepTime]);

  return (
    <span 
      className={`inline-block transition-all duration-75 ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
