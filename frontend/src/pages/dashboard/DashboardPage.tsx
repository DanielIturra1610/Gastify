import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/dashboard/StatCard';
import ExpenseChart from '../../components/dashboard/ExpenseChart';
import RecentExpensesTable from '../../components/dashboard/RecentExpensesTable';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

/**
 * Página principal del dashboard
 * Muestra resumen de gastos, gráficos y actividad reciente
 */
const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    pendingApproval: 0,
    thisMonth: 0,
    lastMonth: 0
  });
  const [recentExpenses, setRecentExpenses] = useState([]);

  // Datos de ejemplo para desarrollo
  useEffect(() => {
    // Simulación de carga de datos
    const loadDashboardData = async () => {
      try {
        // En un entorno real, estos datos vendrían de una API
        setTimeout(() => {
          setStats({
            totalExpenses: 1258900,
            pendingApproval: 3,
            thisMonth: 358500,
            lastMonth: 412300
          });

          setRecentExpenses([
            {
              id: '1',
              date: '2025-07-10',
              category: 'Transporte',
              description: 'Taxi aeropuerto',
              amount: 15000,
              status: 'aprobado'
            },
            {
              id: '2',
              date: '2025-07-09',
              category: 'Alimentación',
              description: 'Almuerzo con cliente',
              amount: 45600,
              status: 'pendiente'
            },
            {
              id: '3',
              date: '2025-07-08',
              category: 'Material de oficina',
              description: 'Tinta para impresora',
              amount: 32800,
              status: 'aprobado'
            },
            {
              id: '4',
              date: '2025-07-05',
              category: 'Hospedaje',
              description: 'Hotel Santiago - Conferencia',
              amount: 120000,
              status: 'aprobado'
            },
            {
              id: '5',
              date: '2025-07-01',
              category: 'Transporte',
              description: 'Gasolina viaje a Valparaíso',
              amount: 25000,
              status: 'rechazado'
            }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Datos de ejemplo para el gráfico
  const chartData = {
    categories: ['Transporte', 'Alimentación', 'Hospedaje', 'Material', 'Otros'],
    series: [
      {
        name: 'Este mes',
        data: [55000, 78000, 120000, 32800, 72700]
      },
      {
        name: 'Mes anterior',
        data: [65000, 85000, 150000, 25000, 87300]
      }
    ]
  };

  // Formato para montos en pesos chilenos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido, {currentUser?.firstName || currentUser?.email}. Aquí está el resumen de tus gastos.
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Gastos"
          value={formatCurrency(stats.totalExpenses)}
          icon="cash"
          trend="up"
          trendValue="8.2%"
        />
        <StatCard 
          title="Pendientes de Aprobación"
          value={stats.pendingApproval.toString()}
          icon="document-check"
          type="count"
        />
        <StatCard 
          title="Gastos Este Mes"
          value={formatCurrency(stats.thisMonth)}
          icon="chart-bar"
          trend="down"
          trendValue="13.1%"
        />
        <StatCard 
          title="Gastos Mes Anterior"
          value={formatCurrency(stats.lastMonth)}
          icon="calendar"
        />
      </div>

      {/* Contenido principal en 2 columnas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Gráfico */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Gastos por Categoría
            </h2>
            <ExpenseChart data={chartData} />
          </div>
        </div>

        {/* Panel lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 h-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Gastos Recientes
            </h2>
            <RecentExpensesTable expenses={recentExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;