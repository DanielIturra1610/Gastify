import React from 'react';

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
  className?: string;
}

/**
 * Tarjeta de testimonio con sistema de rating
 * Diseñada con enfoque en responsividad y accesibilidad
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  avatarUrl,
  rating = 0,
  className = '',
}) => {
  // Generamos estrellas basadas en el rating (1-5)
  const renderStars = () => {
    const stars = [];
    const normalizedRating = Math.min(5, Math.max(0, rating));
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i}
          className={`${i <= normalizedRating 
            ? 'text-yellow-500' 
            : 'text-gray-300 dark:text-gray-600'}`}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    
    return (
      <div className="flex" aria-label={`Calificación: ${normalizedRating} de 5 estrellas`}>
        {stars}
      </div>
    );
  };

  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-xl shadow-md p-6
      transition-all duration-300 ease-in-out
      hover:shadow-lg
      ${className}
    `}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start">
          {avatarUrl && (
            <div className="mr-4 flex-shrink-0">
              <img 
                src={avatarUrl} 
                alt={`Foto de ${name}`}
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" 
              />
            </div>
          )}
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
              "{content}"
            </p>
            <div className="mt-2">
              {rating > 0 && renderStars()}
              <p className="font-semibold text-gray-900 dark:text-white mt-2">{name}</p>
              {role && <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
