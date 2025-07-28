import React, { useState } from 'react';
import { 
  BuildingOffice2Icon, 
  BuildingStorefrontIcon,
  TruckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  UserGroupIcon,
  UsersIcon,
  SparklesIcon,
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ScrollReveal from '../ui/ScrollReveal';
import FeatureCard from '../ui/FeatureCard';
import GradientButton from '../ui/GradientButton';

interface UseCase {
  id: string;
  icon: React.ReactNode;
  color: string;
  industryName: string;
  description: string;
  keyPoints: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
}

// Tamaños de empresa
interface CompanySize {
  id: string;
  name: string;
  description: string;
  employeeRange: string;
  benefits: string[];
}

const UseCases: React.FC = () => {
  // Estado para el filtro de industria/tamaño activo
  const [activeFilter, setActiveFilter] = useState<'industry' | 'size'>('industry');
  const [activeIndustry, setActiveIndustry] = useState<string>('enterprise');
  const [activeSize, setActiveSize] = useState<string>('medium');
  
  // Definir casos de uso por industria
  const industryUseCases: UseCase[] = [
    {
      id: 'enterprise',
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      color: 'primary',
      industryName: 'Grandes Corporaciones',
      description: 'Solución integral de gestión de gastos para empresas con operaciones complejas y múltiples departamentos.',
      keyPoints: [
        'Gestión centralizada de gastos para múltiples entidades legales',
        'Workflows de aprobación personalizables por jerarquía organizacional',
        'Integraciones avanzadas con sistemas ERP corporativos',
        'Análisis de datos para optimización de presupuestos departamentales',
        'Compliance automático para múltiples jurisdicciones fiscales'
      ],
      testimonial: {
        quote: 'Gastify transformó nuestra gestión de gastos corporativos, reduciendo el tiempo de procesamiento en un 75% y mejorando la precisión de nuestros reportes financieros.',
        author: 'Carlos Rodríguez',
        position: 'CFO',
        company: 'Grupo Empresarial Internacional'
      }
    },
    {
      id: 'retail',
      icon: <BuildingStorefrontIcon className="h-6 w-6" />,
      color: 'secondary',
      industryName: 'Retail y Comercio',
      description: 'Control eficiente de gastos para cadenas de tiendas con múltiples ubicaciones y personal de ventas.',
      keyPoints: [
        'Digitalización rápida de recibos y facturas desde cada punto de venta',
        'Categorización automática para asignar gastos a tiendas específicas',
        'Monitoreo de gastos por ubicación con comparativas automáticas',
        'Control de presupuestos de marketing y promociones por tienda',
        'Conciliación automática con ventas diarias y gastos operativos'
      ]
    },
    {
      id: 'logistics',
      icon: <TruckIcon className="h-6 w-6" />,
      color: 'success',
      industryName: 'Logística y Transporte',
      description: 'Seguimiento detallado de gastos de viaje, combustible y mantenimiento para flotas de transporte.',
      keyPoints: [
        'Gestión de viáticos y gastos de viaje con geolocalización',
        'Control de gastos de combustible con verificación automática',
        'Seguimiento de mantenimientos y reparaciones por vehículo',
        'Reportes de eficiencia por ruta y conductor',
        'Integración con sistemas de gestión de flotas'
      ]
    },
    {
      id: 'education',
      icon: <AcademicCapIcon className="h-6 w-6" />,
      color: 'warning',
      industryName: 'Educación',
      description: 'Gestión transparente de presupuestos departamentales y fondos de investigación para instituciones educativas.',
      keyPoints: [
        'Seguimiento de gastos por departamento, facultad y proyecto de investigación',
        'Control de presupuestos educativos con alertas de límites',
        'Workflows de aprobación adaptados a la estructura académica',
        'Cumplimiento de normativas para fondos públicos y becas',
        'Reportes personalizados para consejos directivos y autoridades'
      ]
    },
    {
      id: 'professional',
      icon: <BriefcaseIcon className="h-6 w-6" />,
      color: 'info',
      industryName: 'Servicios Profesionales',
      description: 'Asignación precisa de gastos a proyectos y clientes para despachos y consultoras.',
      keyPoints: [
        'Seguimiento de gastos facturables por cliente y proyecto',
        'Captura móvil de gastos durante visitas a clientes',
        'Integración con sistemas de facturación por tiempo y materiales',
        'Aprobaciones rápidas para gastos urgentes relacionados con clientes',
        'Análisis de rentabilidad por proyecto incluyendo todos los gastos'
      ]
    },
    {
      id: 'healthcare',
      icon: <HeartIcon className="h-6 w-6" />,
      color: 'financial',
      industryName: 'Salud',
      description: 'Control especializado de gastos para clínicas, hospitales y redes de atención médica.',
      keyPoints: [
        'Categorización especializada para insumos médicos y farmacéuticos',
        'Asignación de gastos por departamento médico y especialidad',
        'Cumplimiento de normativas sanitarias en adquisiciones',
        'Análisis comparativo de gastos por paciente y procedimiento',
        'Gestión separada de gastos operativos y relacionados con pacientes'
      ]
    }
  ];

  // Definir casos de uso por tamaño de empresa
  const sizeUseCases: CompanySize[] = [
    {
      id: 'small',
      name: 'Pequeñas Empresas',
      description: 'Solución económica y eficiente para negocios con equipos reducidos.',
      employeeRange: '5-50 empleados',
      benefits: [
        'Configuración rápida en menos de 24 horas',
        'Digitalización inmediata de facturas y recibos sin esfuerzo',
        'Reportes financieros simplificados para pequeños equipos',
        'Visibilidad completa de gastos sin necesidad de personal contable dedicado',
        'Gestión eficiente de facturas de proveedores y pagos'
      ]
    },
    {
      id: 'medium',
      name: 'Medianas Empresas',
      description: 'Balance perfecto entre funcionalidades avanzadas y facilidad de uso para empresas en crecimiento.',
      employeeRange: '51-250 empleados',
      benefits: [
        'Escalabilidad para manejar volúmenes crecientes de transacciones',
        'Workflows de aprobación configurables para estructuras en desarrollo',
        'Integración con sistemas contables de nivel intermedio',
        'Analytics básicos para identificar tendencias y oportunidades de ahorro',
        'Administración multiusuario con roles y permisos personalizables'
      ]
    },
    {
      id: 'large',
      name: 'Grandes Empresas',
      description: 'Solución robusta para organizaciones complejas con múltiples departamentos.',
      employeeRange: '251-1000 empleados',
      benefits: [
        'Gestión multi-entidad y multi-departamento',
        'Integraciones avanzadas con ERP y sistemas financieros',
        'Analytics corporativos con dashboards personalizables',
        'Herramientas de cumplimiento normativo y auditoría',
        'Gestión de políticas de gastos por niveles jerárquicos'
      ]
    },
    {
      id: 'enterprise',
      name: 'Corporaciones',
      description: 'Plataforma empresarial completa para organizaciones multinacionales y de gran escala.',
      employeeRange: '1000+ empleados',
      benefits: [
        'Soporte para operaciones globales y múltiples divisas',
        'Compliance automatizado para regulaciones internacionales',
        'Integraciones avanzadas con todo el ecosistema empresarial',
        'Business intelligence avanzado con modelos predictivos',
        'Gestión de gastos a gran escala con millones de transacciones'
      ]
    }
  ];
  
  // Obtener el caso de uso activo
  const currentIndustryCase = industryUseCases.find(useCase => useCase.id === activeIndustry) || industryUseCases[0];
  const currentSizeCase = sizeUseCases.find(sizeCase => sizeCase.id === activeSize) || sizeUseCases[0];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Soluciones adaptadas a tus necesidades
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Descubre cómo Gastify se adapta perfectamente a diferentes industrias y tamaños de empresa
            </p>
          </div>
        </ScrollReveal>

        {/* Selector de vista: Industria o Tamaño */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm p-1 bg-gray-100 dark:bg-gray-700">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === 'industry'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveFilter('industry')}
            >
              <UserGroupIcon className="h-5 w-5 inline-block mr-1.5 -mt-0.5" />
              Por Industria
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === 'size'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveFilter('size')}
            >
              <UsersIcon className="h-5 w-5 inline-block mr-1.5 -mt-0.5" />
              Por Tamaño
            </button>
          </div>
        </div>

        {/* Vista por Industria */}
        {activeFilter === 'industry' && (
          <>
            {/* Selector de industria */}
            <ScrollReveal direction="up" className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {industryUseCases.map((industry) => (
                  <button
                    key={industry.id}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center ${
                      activeIndustry === industry.id
                        ? `bg-${industry.color}-600 text-white shadow-md`
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveIndustry(industry.id)}
                  >
                    <span className={`mr-2 ${activeIndustry === industry.id ? 'text-white' : `text-${industry.color}-600 dark:text-${industry.color}-400`}`}>
                      {industry.icon}
                    </span>
                    {industry.industryName}
                  </button>
                ))}
              </div>
            </ScrollReveal>
            
            {/* Detalles del caso de uso por industria */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <ScrollReveal direction="left">
                  <div className={`bg-${currentIndustryCase.color}-50 dark:bg-${currentIndustryCase.color}-900/20 rounded-2xl p-6 shadow-md`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full bg-${currentIndustryCase.color}-100 dark:bg-${currentIndustryCase.color}-800/30 mr-4`}>
                        {currentIndustryCase.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentIndustryCase.industryName}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {currentIndustryCase.description}
                    </p>
                    
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Beneficios principales:
                    </h4>
                    
                    <ul className="space-y-3 mb-6">
                      {currentIndustryCase.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`flex-shrink-0 h-5 w-5 rounded-full bg-${currentIndustryCase.color}-500 flex items-center justify-center mr-3 mt-0.5`}>
                            <svg className="h-3 w-3 text-white" viewBox="0 0 12 12">
                              <path fill="currentColor" d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                            </svg>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <GradientButton 
                      variant={currentIndustryCase.color as any} 
                      size="md"
                    >
                      Ver demostración para {currentIndustryCase.industryName}
                    </GradientButton>
                  </div>
                </ScrollReveal>
                
                {/* Testimonial si existe */}
                {currentIndustryCase.testimonial && (
                  <ScrollReveal direction="left" delay={200} className="mt-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="mb-4">
                        <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                      </div>
                      <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                        "{currentIndustryCase.testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {currentIndustryCase.testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {currentIndustryCase.testimonial.position}, {currentIndustryCase.testimonial.company}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <ScrollReveal direction="right">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Casos de éxito similares
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Empresas de {currentIndustryCase.industryName} que confían en Gastify
                      </p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 flex items-center justify-center overflow-hidden">
                          {/* Placeholder para logo de empresa */}
                          <span className="text-xl font-bold text-gray-500">AC</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">AeroCorp</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Redujo 30% en costos administrativos</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 flex items-center justify-center overflow-hidden">
                          {/* Placeholder para logo de empresa */}
                          <span className="text-xl font-bold text-gray-500">TG</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">TechGroup</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Mejoró tiempos de aprobación en 75%</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4 flex items-center justify-center overflow-hidden">
                          {/* Placeholder para logo de empresa */}
                          <span className="text-xl font-bold text-gray-500">EI</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">EnterIndustries</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ahorró $120K anuales en procesamiento</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <a 
                          href="#casos-exito"
                          className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                        >
                          Ver todos los casos de éxito
                          <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </>
        )}

        {/* Vista por Tamaño */}
        {activeFilter === 'size' && (
          <>
            {/* Selector de tamaño */}
            <ScrollReveal direction="up" className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {sizeUseCases.map((size) => (
                  <button
                    key={size.id}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeSize === size.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveSize(size.id)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
            
            {/* Detalles del caso por tamaño */}
            <ScrollReveal direction="up">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6 bg-primary-50 dark:bg-primary-900/20 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentSizeCase.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {currentSizeCase.employeeRange}
                      </p>
                    </div>
                    <span className="px-4 py-1.5 bg-primary-100 dark:bg-primary-800/40 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
                      Solución Adaptada
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {currentSizeCase.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Beneficios específicos:
                  </h4>
                  
                  <ul className="space-y-3 mb-8">
                    {currentSizeCase.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12">
                            <path fill="currentColor" d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <GradientButton 
                      variant="primary" 
                      size="md"
                    >
                      Solicitar demostración
                    </GradientButton>
                    <button
                      className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 px-4 py-2 text-center"
                    >
                      Descargar caso de estudio
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Características destacadas para este tamaño */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Características destacadas para {currentSizeCase.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ScrollReveal direction="up" delay={100}>
                  <FeatureCard
                    icon={<SparklesIcon className="h-6 w-6" />}
                    title="Configuración adaptada"
                    description="Implementación y setup adaptados exactamente a las necesidades de una empresa de este tamaño."
                  />
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={200}>
                  <FeatureCard
                    icon={<ArrowPathIcon className="h-6 w-6" />}
                    title="Escalabilidad garantizada"
                    description="La plataforma crece con tu empresa sin necesidad de migraciones o cambios disruptivos."
                  />
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={300}>
                  <FeatureCard
                    icon={<ClockIcon className="h-6 w-6" />}
                    title="Implementación rápida"
                    description="Tiempo de implementación optimizado para empresas de este tamaño, con mínima interrupción."
                  />
                </ScrollReveal>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UseCases;
