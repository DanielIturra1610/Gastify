import React from 'react';

interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

interface ExpenseChartProps {
  data: ChartData;
}

/**
 * Componente de gráfico para visualizar gastos por categoría
 * Implementación simple sin dependencias externas para evitar problemas con Rollup
 */
const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  // Formato para montos en pesos chilenos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calcular el valor máximo para escalar las barras correctamente
  const maxValue = Math.max(
    ...data.series.flatMap(series => series.data)
  );

  // Colores para las series
  const colors = ['bg-primary-500', 'bg-secondary-500'];

  return (
    <div className="w-full">
      {/* Leyenda */}
      <div className="flex flex-wrap items-center justify-end mb-4">
        {data.series.map((series, index) => (
          <div key={series.name} className="flex items-center ml-4">
            <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full mr-1`}></div>
            <span className="text-xs text-gray-600">{series.name}</span>
          </div>
        ))}
      </div>

      {/* Gráfico de barras simplificado */}
      <div className="space-y-4">
        {data.categories.map((category, i) => (
          <div key={category} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-1/4 text-xs text-gray-600">{category}</div>
              <div className="w-3/4 flex flex-col space-y-1">
                {data.series.map((series, seriesIndex) => (
                  <div key={series.name} className="flex items-center space-x-1">
                    <div className="flex-grow h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-4 ${colors[seriesIndex % colors.length]}`}
                        style={{ width: `${(series.data[i] / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-20 text-right">
                      {formatCurrency(series.data[i])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Este componente utiliza una implementación simple de gráficos de barras.</p>
        <p className="mt-1">En producción, se podría reemplazar con una librería como Chart.js o Recharts.</p>
      </div>
    </div>
  );
};

export default ExpenseChart;