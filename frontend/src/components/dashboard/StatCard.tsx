import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  type?: 'currency' | 'count' | 'percentage';
}

/**
 * Tarjeta para mostrar estadísticas en el dashboard
 * Muestra un título, valor, ícono opcional y tendencia
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  type = 'currency'
}) => {
  // Renderiza un ícono simplificado basado en el nombre
  const renderIcon = () => {
    return (
      <div className="p-3 rounded-md bg-primary-50">
        <svg
          className="h-6 w-6 text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Usar un path genérico, en producción se reemplazaría con HeroIcons */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    );
  };

  // Clases para el indicador de tendencia
  const getTrendClasses = () => {
    if (trend === 'up') {
      return 'text-green-600 bg-green-50';
    } else if (trend === 'down') {
      return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        {icon && renderIcon()}
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd>
            <div className="text-lg font-medium text-gray-900">{value}</div>
          </dd>
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="mt-4">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrendClasses()}`}>
            {trend === 'up' ? (
              <svg
                className="-ml-1 mr-0.5 flex-shrink-0 h-4 w-4 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            ) : trend === 'down' ? (
              <svg
                className="-ml-1 mr-0.5 flex-shrink-0 h-4 w-4 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            ) : null}
            {trendValue}
          </div>
          <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;