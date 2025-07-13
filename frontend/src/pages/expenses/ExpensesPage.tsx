import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: string;
  companyName?: string;
  receipt?: string;
  tags?: string[];
}

interface ExpenseFilter {
  status: string;
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
  searchTerm: string;
}

/**
 * Página principal de gastos
 * Muestra lista de gastos con filtros y acciones
 */
const ExpensesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilter>({
    status: 'todos',
    category: 'todas',
    dateRange: {
      start: '',
      end: ''
    },
    searchTerm: ''
  });

  // Categorías disponibles (en producción vendrían de una API)
  const categories = [
    'Todas',
    'Transporte',
    'Alimentación',
    'Hospedaje',
    'Material de oficina',
    'Servicios',
    'Otros'
  ];

  // Estados disponibles
  const statuses = [
    'Todos',
    'Pendiente',
    'Aprobado',
    'Rechazado'
  ];

  // Cargar datos de ejemplo (en producción vendrían de una API)
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Simulación de carga desde API
        setTimeout(() => {
          const mockExpenses: Expense[] = [
            {
              id: '1',
              date: '2025-07-10',
              category: 'Transporte',
              description: 'Taxi aeropuerto',
              amount: 15000,
              status: 'Aprobado',
              companyName: 'Taxi Oficial SCL',
              receipt: 'receipt-001.jpg',
              tags: ['Viaje', 'Santiago']
            },
            {
              id: '2',
              date: '2025-07-09',
              category: 'Alimentación',
              description: 'Almuerzo con cliente',
              amount: 45600,
              status: 'Pendiente',
              companyName: 'Restaurante La Casona',
              tags: ['Cliente', 'Reunión']
            },
            {
              id: '3',
              date: '2025-07-08',
              category: 'Material de oficina',
              description: 'Tinta para impresora',
              amount: 32800,
              status: 'Aprobado',
              companyName: 'OfficeMax',
              receipt: 'receipt-002.jpg'
            },
            {
              id: '4',
              date: '2025-07-05',
              category: 'Hospedaje',
              description: 'Hotel Santiago - Conferencia',
              amount: 120000,
              status: 'Aprobado',
              companyName: 'Hotel Capital',
              receipt: 'receipt-003.jpg',
              tags: ['Conferencia', 'Santiago']
            },
            {
              id: '5',
              date: '2025-07-01',
              category: 'Transporte',
              description: 'Gasolina viaje a Valparaíso',
              amount: 25000,
              status: 'Rechazado',
              companyName: 'Estación Shell',
              tags: ['Viaje', 'Valparaíso']
            },
            {
              id: '6',
              date: '2025-06-28',
              category: 'Servicios',
              description: 'Suscripción software diseño',
              amount: 39900,
              status: 'Aprobado',
              companyName: 'Adobe Inc.',
              receipt: 'receipt-004.jpg',
              tags: ['Software', 'Mensual']
            },
            {
              id: '7',
              date: '2025-06-25',
              category: 'Alimentación',
              description: 'Café para la oficina',
              amount: 18500,
              status: 'Aprobado',
              companyName: 'Café Mundo',
              receipt: 'receipt-005.jpg'
            },
            {
              id: '8',
              date: '2025-06-20',
              category: 'Otros',
              description: 'Regalo cliente - Aniversario empresa',
              amount: 65000,
              status: 'Pendiente',
              companyName: 'Regalos Corporativos SpA',
              tags: ['Cliente', 'Regalo']
            }
          ];
          
          setExpenses(mockExpenses);
          setFilteredExpenses(mockExpenses);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar gastos:', error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const applyFilters = () => {
      let result = [...expenses];
      
      // Filtrar por estado
      if (filters.status.toLowerCase() !== 'todos') {
        result = result.filter(expense => 
          expense.status.toLowerCase() === filters.status.toLowerCase()
        );
      }
      
      // Filtrar por categoría
      if (filters.category.toLowerCase() !== 'todas') {
        result = result.filter(expense => 
          expense.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      // Filtrar por fecha
      if (filters.dateRange.start) {
        result = result.filter(expense => 
          new Date(expense.date) >= new Date(filters.dateRange.start)
        );
      }
      
      if (filters.dateRange.end) {
        result = result.filter(expense => 
          new Date(expense.date) <= new Date(filters.dateRange.end)
        );
      }
      
      // Filtrar por término de búsqueda
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        result = result.filter(expense => 
          expense.description.toLowerCase().includes(searchLower) ||
          expense.companyName?.toLowerCase().includes(searchLower) ||
          expense.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      setFilteredExpenses(result);
    };
    
    applyFilters();
  }, [filters, expenses]);

  // Manejadores para los filtros
  const handleFilterChange = (filterType: keyof ExpenseFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

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

  // Navegar a la página de detalle de gasto
  const handleViewExpense = (id: string) => {
    navigate(`/expenses/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gastos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona tus gastos empresariales
          </p>
        </div>
        <div>
          <button
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => navigate('/expenses/new')}
          >
            Nuevo Gasto
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Filtro por estado */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="status-filter"
              name="status"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por categoría */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="category-filter"
              name="category"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por rango de fechas */}
          <div>
            <label htmlFor="date-start" className="block text-sm font-medium text-gray-700">
              Desde
            </label>
            <input
              type="date"
              id="date-start"
              name="date-start"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="date-end" className="block text-sm font-medium text-gray-700">
              Hasta
            </label>
            <input
              type="date"
              id="date-end"
              name="date-end"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
            />
          </div>
        </div>
        
        {/* Búsqueda */}
        <div className="mt-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Buscar
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar por descripción, empresa o etiquetas"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de gastos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron gastos que coincidan con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{expense.description}</div>
                      {expense.tags && expense.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {expense.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.companyName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusClasses(expense.status)}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewExpense(expense.id)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación simple */}
        <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{filteredExpenses.length}</span> de{' '}
              <span className="font-medium">{expenses.length}</span> resultados
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ExpensesPage;