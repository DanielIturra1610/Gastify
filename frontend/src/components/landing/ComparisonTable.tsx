import React, { useState } from 'react';
import { CheckIcon, XMarkIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import ScrollReveal from '../ui/ScrollReveal';

interface FeatureItem {
  name: string;
  tooltip?: string;
  gastify: boolean;
  competitors: Record<string, boolean | string>;
  traditional: boolean | string;
  category: string;
}

const ComparisonTable: React.FC = () => {
  // Estado para el tooltip activo
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Estado para filtros de categoría
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Definir los competidores
  const competitors = [
    { id: 'competitor1', name: 'Expensify' },
    { id: 'competitor2', name: 'SAP Concur' },
    { id: 'competitor3', name: 'Zoho Expense' }
  ];
  
  // Definir las categorías de características
  const categories = [
    { id: 'all', name: 'Todas las características' },
    { id: 'capture', name: 'Captura de datos' },
    { id: 'processing', name: 'Procesamiento' },
    { id: 'reporting', name: 'Reportes y análisis' },
    { id: 'integration', name: 'Integraciones' },
    { id: 'compliance', name: 'Compliance y seguridad' },
    { id: 'mobile', name: 'Experiencia móvil' }
  ];
  
  // Definir la lista de características para comparar
  const features: FeatureItem[] = [
    {
      name: 'OCR multilingüe avanzado',
      tooltip: 'Reconocimiento óptico de caracteres capaz de procesar múltiples idiomas con alta precisión',
      gastify: true,
      competitors: { competitor1: false, competitor2: 'Parcial', competitor3: false },
      traditional: false,
      category: 'capture'
    },
    {
      name: 'Categorización automática por IA',
      tooltip: 'Inteligencia artificial que aprende los patrones específicos de cada empresa para categorizar gastos',
      gastify: true,
      competitors: { competitor1: 'Básica', competitor2: 'Básica', competitor3: 'Básica' },
      traditional: false,
      category: 'processing'
    },
    {
      name: 'Geolocalización de gastos',
      tooltip: 'Registro automático de ubicación para cada gasto para facilitar seguimiento y verificación',
      gastify: true,
      competitors: { competitor1: false, competitor2: true, competitor3: false },
      traditional: false,
      category: 'capture'
    },
    {
      name: 'Workflows de aprobación adaptativos',
      tooltip: 'Rutas de aprobación que se ajustan automáticamente según el contexto y el aprendizaje del sistema',
      gastify: true,
      competitors: { competitor1: false, competitor2: 'Limitado', competitor3: false },
      traditional: false,
      category: 'processing'
    },
    {
      name: 'Analytics predictivos de gastos',
      tooltip: 'Modelos avanzados que proyectan tendencias futuras de gastos y detectan anomalías',
      gastify: true,
      competitors: { competitor1: false, competitor2: 'Básico', competitor3: false },
      traditional: false,
      category: 'reporting'
    },
    {
      name: 'Compliance automático por región',
      tooltip: 'Actualización continua de normativas fiscales en múltiples países y validación automática',
      gastify: true,
      competitors: { competitor1: 'Limitado', competitor2: true, competitor3: 'Limitado' },
      traditional: false,
      category: 'compliance'
    },
    {
      name: 'Detección avanzada de fraudes',
      tooltip: 'Algoritmos que identifican patrones sospechosos y alertan proactivamente',
      gastify: true,
      competitors: { competitor1: 'Básica', competitor2: 'Limitada', competitor3: false },
      traditional: false,
      category: 'compliance'
    },
    {
      name: 'Reconciliación automática con tarjetas',
      tooltip: 'Emparejamiento automático entre transacciones de tarjetas y gastos reportados',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: true },
      traditional: false,
      category: 'processing'
    },
    {
      name: 'Aplicación móvil offline',
      tooltip: 'Capacidad de registrar gastos sin conexión a internet y sincronizar posteriormente',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: 'Limitada' },
      traditional: false,
      category: 'mobile'
    },
    {
      name: 'Extracción de líneas de detalle',
      tooltip: 'Capacidad de extraer cada ítem individual de una factura, no solo el total',
      gastify: true,
      competitors: { competitor1: false, competitor2: 'Parcial', competitor3: false },
      traditional: false,
      category: 'capture'
    },
    {
      name: 'Integración con ERP',
      tooltip: 'Conexión bidireccional con sistemas ERP principales del mercado',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: 'Limitada' },
      traditional: false,
      category: 'integration'
    },
    {
      name: 'Dashboard personalizable',
      tooltip: 'Capacidad de configurar paneles según necesidades específicas de cada usuario o rol',
      gastify: true,
      competitors: { competitor1: 'Básico', competitor2: true, competitor3: 'Básico' },
      traditional: false,
      category: 'reporting'
    },
    {
      name: 'Escaneo inteligente de recibos',
      tooltip: 'Detección automática de bordes, corrección de perspectiva y mejora de imagen',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: 'Básico' },
      traditional: false,
      category: 'capture'
    },
    {
      name: 'Exportación a múltiples formatos',
      tooltip: 'Capacidad de exportar datos en formatos como PDF, Excel, CSV y API',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: true },
      traditional: 'Limitada',
      category: 'reporting'
    },
    {
      name: 'Aprobaciones móviles con notificaciones',
      tooltip: 'Sistema de notificaciones y aprobaciones rápidas desde dispositivos móviles',
      gastify: true,
      competitors: { competitor1: true, competitor2: true, competitor3: true },
      traditional: false,
      category: 'mobile'
    }
  ];
  
  // Filtrar características por categoría
  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);
  
  // Renderizar el estado de una característica
  const renderFeatureStatus = (status: boolean | string) => {
    if (typeof status === 'string') {
      return (
        <span className="text-yellow-500 flex items-center justify-center">
          <span className="text-xs">{status}</span>
        </span>
      );
    }
    
    return status ? (
      <span className="text-green-500 flex items-center justify-center">
        <CheckIcon className="h-5 w-5" />
      </span>
    ) : (
      <span className="text-red-500 flex items-center justify-center">
        <XMarkIcon className="h-5 w-5" />
      </span>
    );
  };
  
  // Contar ventajas de Gastify por categoría
  const getAdvantagesByCategory = () => {
    const advantages: Record<string, { total: number; advantages: number }> = {};
    
    categories.forEach(category => {
      if (category.id !== 'all') {
        const categoryFeatures = features.filter(f => f.category === category.id);
        let advantageCount = 0;
        
        categoryFeatures.forEach(feature => {
          let hasAdvantage = true;
          
          // Comprobar si Gastify tiene ventaja sobre todos los competidores
          for (const competitor in feature.competitors) {
            const competitorValue = feature.competitors[competitor];
            if (competitorValue === true) {
              hasAdvantage = false;
              break;
            }
          }
          
          if (hasAdvantage) {
            advantageCount++;
          }
        });
        
        advantages[category.id] = {
          total: categoryFeatures.length,
          advantages: advantageCount
        };
      }
    });
    
    return advantages;
  };
  
  const advantages = getAdvantagesByCategory();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Gastify vs. Competencia
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Descubre por qué Gastify supera a los métodos tradicionales y soluciones competidoras
            </p>
          </div>
        </ScrollReveal>

        {/* Selector de categorías */}
        <ScrollReveal direction="up" className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
                {category.id !== 'all' && advantages[category.id] && (
                  <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-white text-primary-600' 
                      : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  }`}>
                    {advantages[category.id].advantages}/{advantages[category.id].total}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tabla comparativa */}
        <ScrollReveal direction="up" className="overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                    Característica
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider bg-primary-50 dark:bg-primary-900/30">
                    <span className="font-bold text-primary-600 dark:text-primary-400">Gastify</span>
                  </th>
                  {competitors.map((competitor) => (
                    <th 
                      key={competitor.id}
                      className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {competitor.name}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tradicional
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFeatures.map((feature, idx) => (
                  <tr 
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900/30'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white relative">
                      <div className="flex items-center">
                        {feature.name}
                        {feature.tooltip && (
                          <div className="ml-2 relative">
                            <QuestionMarkCircleIcon 
                              className="h-4 w-4 text-gray-400 hover:text-gray-500 cursor-help"
                              onMouseEnter={() => setActiveTooltip(`feature-${idx}`)}
                              onMouseLeave={() => setActiveTooltip(null)}
                            />
                            {activeTooltip === `feature-${idx}` && (
                              <div className="absolute z-10 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg max-w-xs left-0 w-48">
                                {feature.tooltip}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap bg-primary-50 dark:bg-primary-900/30 text-center">
                      {renderFeatureStatus(feature.gastify)}
                    </td>
                    {competitors.map((competitor) => (
                      <td key={competitor.id} className="px-6 py-4 whitespace-nowrap text-center">
                        {renderFeatureStatus(feature.competitors[competitor.id])}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderFeatureStatus(feature.traditional)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
        
        {/* Leyenda */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 flex justify-center flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center">
            <CheckIcon className="h-4 w-4 text-green-500 mr-1" /> = Disponible
          </div>
          <div className="flex items-center">
            <XMarkIcon className="h-4 w-4 text-red-500 mr-1" /> = No disponible
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-xs mr-1">Parcial</span> = Funcionalidad limitada
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <ScrollReveal direction="up">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
              Descubre todas las ventajas competitivas de Gastify con una demostración personalizada
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowsUpDownIcon className="h-5 w-5 mr-2" />
              Ver comparación detallada
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
