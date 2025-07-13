import React from 'react';
import { Link } from 'react-router-dom';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: string;
}

interface RecentExpensesTableProps {
  expenses: Expense[];
}

/**
 * Tabla que muestra los gastos más recientes
 * Diseño responsivo para adaptarse a diferentes tamaños de pantalla
 */
const RecentExpensesTable: React.FC<RecentExpensesTableProps> = ({ expenses }) => {
  // Formato para montos en pesos chilenos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Formato de fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Obtener clases para el estado
  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aprobado':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pendiente':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rechazado':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No hay gastos recientes para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900">
                {formatDate(expense.date)}
              </td>
              <td className="px-2 py-3 text-sm text-gray-900">
                <div className="font-medium truncate max-w-[120px]">
                  {expense.description}
                </div>
                <div className="text-xs text-gray-500">
                  {expense.category}
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(expense.amount)}
              </td>
              <td className="px-2 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusClasses(expense.status)}`}>
                  {expense.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <Link
          to="/expenses"
          className="inline-flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          Ver todos los gastos
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecentExpensesTable;