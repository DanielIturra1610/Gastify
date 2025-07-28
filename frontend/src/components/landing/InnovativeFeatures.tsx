import React, { useState } from 'react';
import { 
  SparklesIcon, 
  DocumentMagnifyingGlassIcon, 
  MapPinIcon, 
  ArrowPathRoundedSquareIcon, 
  ChartBarIcon, 
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import ScrollReveal from '../ui/ScrollReveal';
import IconBackground from '../ui/IconBackground';

interface Feature {
  id: string;
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  demoImage: string;
  highlights: string[];
}

const InnovativeFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('ai-categorization');
  
  const features: Feature[] = [
    {
      id: 'ai-categorization',
      icon: <SparklesIcon className="w-6 h-6" />,
      color: 'primary',
      title: 'IA para categorización automática',
      description: 'Nuestro sistema de inteligencia artificial aprende de tus patrones de gastos para categorizarlos automáticamente con precisión superior al 95%.',
      demoImage: '/images/features/ai-categorization-demo.png',
      highlights: [
        'Categorización instantánea de gastos',
        'Aprendizaje continuo de patrones específicos de tu empresa',
        'Sugerencias proactivas para optimizar categorías',
        'Etiquetas personalizadas adaptadas a tu industria'
      ]
    },
    {
      id: 'ocr-advanced',
      icon: <DocumentMagnifyingGlassIcon className="w-6 h-6" />,
      color: 'secondary',
      title: 'OCR avanzado para facturas',
      description: 'Extrae automáticamente todos los datos relevantes de facturas y recibos en segundos, sin importar el formato o idioma.',
      demoImage: '/images/features/ocr-demo.png',
      highlights: [
        'Reconocimiento multilingüe de documentos',
        'Extracción de líneas de detalle de facturas',
        'Detección automática de IVA y otros impuestos',
        'Verificación de datos contra proveedores conocidos'
      ]
    },
    {
      id: 'geolocation',
      icon: <MapPinIcon className="w-6 h-6" />,
      color: 'success',
      title: 'Geolocalización para gastos de viaje',
      description: 'Registra automáticamente la ubicación de cada gasto para facilitar el seguimiento y cumplimiento de políticas de viaje.',
      demoImage: '/images/features/geolocation-demo.png',
      highlights: [
        'Mapeo visual de gastos de viaje',
        'Validación automática contra itinerarios',
        'Cálculo automático de dietas según ubicación',
        'Alertas de gastos fuera de zona autorizada'
      ]
    },
    {
      id: 'smart-workflows',
      icon: <ArrowPathRoundedSquareIcon className="w-6 h-6" />,
      color: 'warning',
      title: 'Workflows de aprobación inteligentes',
      description: 'Automatiza el proceso de aprobación con rutas dinámicas basadas en reglas personalizables y aprendizaje automático.',
      demoImage: '/images/features/workflows-demo.png',
      highlights: [
        'Aprobaciones adaptativas según contexto',
        'Escalado automático por inactividad',
        'Delegaciones temporales con un clic',
        'Historial completo de aprobaciones auditable'
      ]
    },
    {
      id: 'predictive-analytics',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'info',
      title: 'Analytics predictivos',
      description: 'Anticipa tendencias de gastos y detecta oportunidades de ahorro con nuestros modelos predictivos avanzados.',
      demoImage: '/images/features/analytics-demo.png',
      highlights: [
        'Proyección de gastos futuros por departamento',
        'Detección temprana de anomalías en patrones de gasto',
        'Recomendaciones automáticas de optimización',
        'Benchmarking contra empresas similares (anónimo)'
      ]
    },
    {
      id: 'auto-compliance',
      icon: <DocumentCheckIcon className="w-6 h-6" />,
      color: 'financial',
      title: 'Compliance automático por región',
      description: 'Mantén tu empresa en regla automáticamente con actualizaciones constantes de normativas fiscales en más de 60 países.',
      demoImage: '/images/features/compliance-demo.png',
      highlights: [
        'Validación automática de requisitos fiscales por país',
        'Alertas proactivas sobre cambios regulatorios',
        'Verificación de proveedores contra listas de sanciones',
        'Generación automática de documentación para auditorías'
      ]
    }
  ];
  
  // Obtener la característica activa
  const currentFeature = features.find(feature => feature.id === activeFeature) || features[0];
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">Innovación continua</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Características únicas de Gastify
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              Descubre las funcionalidades innovadoras que transforman la gestión de gastos corporativos en una ventaja competitiva.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna de características */}
          <div className="lg:col-span-1 space-y-4">
            {features.map((feature) => (
              <ScrollReveal 
                key={feature.id} 
                direction="left"
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeFeature === feature.id 
                    ? feature.color === 'primary' ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500' :
                      feature.color === 'secondary' ? 'bg-secondary-50 dark:bg-secondary-900/20 ring-2 ring-secondary-500' :
                      feature.color === 'success' ? 'bg-success-50 dark:bg-success-900/20 ring-2 ring-success-500' :
                      feature.color === 'warning' ? 'bg-warning-50 dark:bg-warning-900/20 ring-2 ring-warning-500' :
                      feature.color === 'info' ? 'bg-info-50 dark:bg-info-900/20 ring-2 ring-info-500' :
                      feature.color === 'financial' ? 'bg-financial-50 dark:bg-financial-900/20 ring-2 ring-financial-500' :
                      'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div 
                  className="flex items-center space-x-4"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <IconBackground 
                    icon={feature.icon}
                    color={feature.color}
                    size="sm"
                    animation={activeFeature === feature.id ? 'pulse' : 'none'}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Demo interactiva */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentFeature.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      {currentFeature.description}
                    </p>
                  </div>
                  <IconBackground 
                    icon={currentFeature.icon}
                    color={currentFeature.color}
                    size="md"
                  />
                </div>
              </div>
              
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={currentFeature.demoImage} 
                  alt={`Demo de ${currentFeature.title}`} 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-900/30">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Características destacadas
                </h4>
                <ul className="space-y-2">
                  {currentFeature.highlights.map((highlight, index) => (
                    <li 
                      key={index}
                      className="flex items-start"
                    >
                      <span className={`flex-shrink-0 h-5 w-5 rounded-full bg-${currentFeature.color}-500 flex items-center justify-center mr-2 mt-0.5`}>
                        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12">
                          <path fill="currentColor" d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-${currentFeature.color}-600 hover:bg-${currentFeature.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${currentFeature.color}-500`}
                >
                  Probar esta función
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovativeFeatures;
