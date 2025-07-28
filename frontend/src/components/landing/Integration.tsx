import React, { useState } from 'react';
import { 
  ArrowPathIcon, 
  LinkIcon, 
  LockClosedIcon, 
  DocumentTextIcon,
  CommandLineIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import ScrollReveal from '../ui/ScrollReveal';
import IconBackground from '../ui/IconBackground';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  features: string[];
  docsLink: string;
  color?: string;
}

// Categorías de integraciones
type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const Integration: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);
  
  // Categorías de integraciones
  const categories: Category[] = [
    { id: 'all', name: 'Todas', icon: <LinkIcon className="h-5 w-5" /> },
    { id: 'erp', name: 'ERP', icon: <CubeIcon className="h-5 w-5" /> },
    { id: 'accounting', name: 'Contabilidad', icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: 'banking', name: 'Banca', icon: <LockClosedIcon className="h-5 w-5" /> },
    { id: 'api', name: 'APIs', icon: <CommandLineIcon className="h-5 w-5" /> }
  ];
  
  // Lista de integraciones
  const integrations: Integration[] = [
    {
      id: 'sap',
      name: 'SAP',
      description: 'Integración completa con SAP ERP para sincronización bidireccional de datos',
      logo: '/images/integrations/sap-logo.png',
      category: 'erp',
      features: ['Sincronización de maestros contables', 'Exportación automática de gastos', 'Mapeo personalizado de campos', 'Conciliación de pagos'],
      docsLink: '/docs/integrations/sap',
      color: 'blue'
    },
    {
      id: 'oracle',
      name: 'Oracle NetSuite',
      description: 'Conexión nativa con Oracle NetSuite para gestión financiera integrada',
      logo: '/images/integrations/oracle-logo.png',
      category: 'erp',
      features: ['Importación de centros de coste', 'Sincronización de proveedores', 'Exportación de transacciones', 'Validación en tiempo real'],
      docsLink: '/docs/integrations/oracle-netsuite',
      color: 'red'
    },
    {
      id: 'microsoft',
      name: 'Microsoft Dynamics',
      description: 'Integración empresarial con la suite de Microsoft Dynamics 365',
      logo: '/images/integrations/microsoft-logo.png',
      category: 'erp',
      features: ['Registro automático de gastos', 'Vinculación con proyectos', 'Sincronización de aprobaciones', 'Auditoría integrada'],
      docsLink: '/docs/integrations/microsoft-dynamics',
      color: 'green'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Conexión sencilla con QuickBooks Online y Desktop para pequeñas empresas',
      logo: '/images/integrations/quickbooks-logo.png',
      category: 'accounting',
      features: ['Importación de cuentas', 'Categorización automática', 'Conciliación bancaria', 'Reportes personalizados'],
      docsLink: '/docs/integrations/quickbooks',
      color: 'blue'
    },
    {
      id: 'xero',
      name: 'Xero',
      description: 'Integración completa con la plataforma contable Xero',
      logo: '/images/integrations/xero-logo.png',
      category: 'accounting',
      features: ['Sincronización bidireccional', 'Mapeo de categorías', 'Gestión de impuestos', 'Exportación de reportes'],
      docsLink: '/docs/integrations/xero',
      color: 'blue'
    },
    {
      id: 'sage',
      name: 'Sage',
      description: 'Conectividad con diferentes versiones de Sage para contabilidad integrada',
      logo: '/images/integrations/sage-logo.png',
      category: 'accounting',
      features: ['Importación de proveedores', 'Exportación de transacciones', 'Gestión de impuestos', 'Conciliación bancaria'],
      docsLink: '/docs/integrations/sage',
      color: 'green'
    },
    {
      id: 'jpmorgan',
      name: 'JP Morgan',
      description: 'Integración con servicios bancarios corporativos de JP Morgan',
      logo: '/images/integrations/jpmorgan-logo.png',
      category: 'banking',
      features: ['Sincronización de transacciones', 'Conciliación automática', 'Pagos directos', 'Gestión de tarjetas corporativas'],
      docsLink: '/docs/integrations/jpmorgan',
      color: 'blue'
    },
    {
      id: 'amex',
      name: 'American Express',
      description: 'Conexión con tarjetas corporativas y servicios de American Express',
      logo: '/images/integrations/amex-logo.png',
      category: 'banking',
      features: ['Importación de transacciones', 'Asignación automática', 'Reconciliación en tiempo real', 'Gestión centralizada de tarjetas'],
      docsLink: '/docs/integrations/amex',
      color: 'blue'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Integración para procesamiento de pagos y gestión financiera con Stripe',
      logo: '/images/integrations/stripe-logo.png',
      category: 'banking',
      features: ['Sincronización de transacciones', 'Facturación automática', 'Gestión de suscripciones', 'Reportes detallados'],
      docsLink: '/docs/integrations/stripe',
      color: 'purple'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Conector universal para integración con miles de aplicaciones a través de Zapier',
      logo: '/images/integrations/zapier-logo.png',
      category: 'api',
      features: ['Automatización de workflows', 'Integraciones personalizadas', 'Triggers configurables', 'Sin código requerido'],
      docsLink: '/docs/integrations/zapier',
      color: 'orange'
    },
    {
      id: 'rest-api',
      name: 'REST API',
      description: 'API completa y documentada para integraciones personalizadas',
      logo: '/images/integrations/api-logo.png',
      category: 'api',
      features: ['Endpoints RESTful', 'Autenticación OAuth 2.0', 'Documentación interactiva', 'Sandbox de pruebas'],
      docsLink: '/docs/api',
      color: 'indigo'
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      description: 'Sistema de eventos en tiempo real para integraciones avanzadas',
      logo: '/images/integrations/webhook-logo.png',
      category: 'api',
      features: ['Notificaciones en tiempo real', 'Filtrado por eventos', 'Reintentos automáticos', 'Monitoreo de entregas'],
      docsLink: '/docs/webhooks',
      color: 'purple'
    }
  ];
  
  // Filtrar integraciones por categoría y búsqueda
  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Agrupación por categoría para el contador
  const integrationCounts = categories.reduce((acc, category) => {
    if (category.id === 'all') {
      acc[category.id] = integrations.length;
    } else {
      acc[category.id] = integrations.filter(i => i.category === category.id).length;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Integraciones disponibles
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Conecta Gastify con tu ecosistema tecnológico existente de forma rápida y sencilla
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-10">
          {/* Buscador de integraciones */}
          <ScrollReveal direction="up" className="max-w-md mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar integraciones..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </ScrollReveal>
          
          {/* Filtros por categoría */}
          <ScrollReveal direction="up" delay={150} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-white text-primary-600' 
                    : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                }`}>
                  {integrationCounts[category.id]}
                </span>
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* Grid de integraciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <ScrollReveal 
              key={integration.id}
              direction="up"
              delay={index * 100}
              className="relative"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all transform hover:shadow-lg hover:-translate-y-1"
                onMouseEnter={() => setHoveredIntegration(integration.id)}
                onMouseLeave={() => setHoveredIntegration(null)}
              >
                {/* Animación de conectividad */}
                <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${
                  hoveredIntegration === integration.id ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-700`}>
                  <div className="absolute inset-0 bg-primary-50 dark:bg-primary-900/10"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-pulse"></div>
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-primary-400 to-transparent animate-pulse"></div>
                  <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full border-4 border-primary-300 animate-ping"></div>
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border-4 border-primary-300 animate-ping"></div>
                </div>
                
                {/* Contenido de la integración */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md p-1.5 flex items-center justify-center mr-4">
                      {/* Si no hay imagen, mostrar un fallback con la primera letra */}
                      <span className="text-xl font-bold text-gray-500">{integration.name.charAt(0)}</span>
                      {/* Agregar un Image con onError para manejar errores en caso de que se tenga acceso a las imágenes */}
                    </div>
                    <IconBackground 
                      icon={<ArrowPathIcon className="h-4 w-4" />} 
                      color={integration.color || 'primary'} 
                      size="sm"
                      animation={hoveredIntegration === integration.id ? 'spin' : 'none'}
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {integration.name}
                  </h3>
                  
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {integration.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Características principales
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {integration.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-4 w-4 text-primary-500 mr-1.5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                      {integration.features.length > 3 && (
                        <li className="text-primary-600 dark:text-primary-400 text-sm italic">
                          +{integration.features.length - 3} más...
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      integration.category === 'erp' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 
                      integration.category === 'accounting' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 
                      integration.category === 'banking' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                    }`}
                    >
                      {categories.find(cat => cat.id === integration.category)?.name || 'Otro'}
                    </span>
                    
                    <a 
                      href={integration.docsLink}
                      className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                    >
                      Ver documentación
                      <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* No se encuentran resultados */}
        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No se encontraron integraciones</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Prueba con otros términos de búsqueda o selecciona otra categoría.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
              >
                Restablecer filtros
              </button>
            </div>
          </div>
        )}
        
        {/* CTA - Solicitar nueva integración */}
        <div className="mt-16">
          <ScrollReveal direction="up">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¿No encuentras la integración que necesitas?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Nuestro equipo de desarrollo está constantemente ampliando el ecosistema de integraciones.
                Solicita la que necesitas y te informaremos cuando esté disponible.
              </p>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Solicitar nueva integración
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Integration;
