import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  SparklesIcon, 
  DocumentMagnifyingGlassIcon, 
  MapPinIcon, 
  ArrowPathRoundedSquareIcon, 
  ChartBarIcon, 
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Interfaces optimizadas
interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

interface Feature {
  id: string;
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  highlights: string[];
  importance: number;
  position: NodePosition;
}

// Funciones auxiliares movidas fuera del componente para evitar recreación
const getColorValue = (color: string): string => {
  const colors: Record<string, string> = {
    primary: '#3B82F6',
    secondary: '#8B5CF6', 
    success: '#10B981',
    warning: '#F59E0B',
    info: '#06B6D4',
    financial: '#EC4899'
  };
  return colors[color] || colors.primary;
};

const getNodeClasses = (color: string, isActive: boolean): string => {
  const baseClasses = 'shadow-lg';
  const activeClasses = isActive ? 'ring-4 ring-white/20 dark:ring-white/30' : '';
  return `${baseClasses} ${activeClasses}`;
};

// Datos estáticos movidos fuera del componente
const FEATURES_DATA: Feature[] = [
  {
    id: 'ai-categorization',
    icon: <SparklesIcon className="w-7 h-7" />,
    color: 'primary',
    title: 'IA Categorización',
    description: 'Sistema de inteligencia artificial que aprende de tus patrones para categorizar gastos automáticamente con 95% de precisión.',
    highlights: [
      'Categorización instantánea y precisa',
      'Aprendizaje continuo de patrones empresariales',
      'Sugerencias proactivas de optimización',
      'Etiquetas personalizadas por industria'
    ],
    importance: 10,
    position: { x: 0, y: 0, radius: 60 }
  },
  {
    id: 'ocr-advanced',
    icon: <DocumentMagnifyingGlassIcon className="w-7 h-7" />,
    color: 'secondary',
    title: 'OCR Avanzado',
    description: 'Extrae automáticamente datos de facturas y recibos en cualquier formato o idioma en segundos.',
    highlights: [
      'Reconocimiento multilingüe instantáneo',
      'Extracción de líneas de detalle completas',
      'Detección automática de impuestos',
      'Verificación contra base de proveedores'
    ],
    importance: 9,
    position: { x: -180, y: -80, radius: 54 }
  },
  {
    id: 'predictive-analytics',
    icon: <ChartBarIcon className="w-7 h-7" />,
    color: 'info',
    title: 'Analytics Predictivos',
    description: 'Anticipa tendencias y detecta oportunidades de ahorro con modelos predictivos avanzados.',
    highlights: [
      'Proyección de gastos por departamento',
      'Detección temprana de anomalías',
      'Recomendaciones automáticas de ahorro',
      'Benchmarking anónimo sectorial'
    ],
    importance: 9,
    position: { x: 180, y: -80, radius: 54 }
  },
  {
    id: 'smart-workflows',
    icon: <ArrowPathRoundedSquareIcon className="w-7 h-7" />,
    color: 'warning',
    title: 'Workflows Inteligentes',
    description: 'Automatiza aprobaciones con rutas dinámicas basadas en reglas personalizables.',
    highlights: [
      'Aprobaciones adaptativas por contexto',
      'Escalado automático por inactividad',
      'Delegaciones temporales simples',
      'Historial completo auditable'
    ],
    importance: 8,
    position: { x: -140, y: 120, radius: 50 }
  },
  {
    id: 'geolocation',
    icon: <MapPinIcon className="w-7 h-7" />,
    color: 'success',
    title: 'Geolocalización',
    description: 'Registra automáticamente ubicación de gastos para seguimiento y cumplimiento de políticas.',
    highlights: [
      'Mapeo visual de gastos de viaje',
      'Validación contra itinerarios',
      'Cálculo automático de dietas',
      'Alertas de gastos no autorizados'
    ],
    importance: 7,
    position: { x: 140, y: 120, radius: 46 }
  },
  {
    id: 'auto-compliance',
    icon: <DocumentCheckIcon className="w-7 h-7" />,
    color: 'financial',
    title: 'Compliance Automático',
    description: 'Mantén cumplimiento normativo automático con actualizaciones de regulaciones en 60+ países.',
    highlights: [
      'Validación fiscal automática por país',
      'Alertas de cambios regulatorios',
      'Verificación contra listas de sanciones',
      'Documentación automática para auditorías'
    ],
    importance: 6,
    position: { x: 0, y: -160, radius: 42 }
  }
];

// Componente Node optimizado y corregido
const Node: React.FC<{
  feature: Feature;
  isActive: boolean;
  onActivate: () => void;
  mousePosition: { x: number; y: number };
  containerBounds: DOMRect | null;
}> = React.memo(({ feature, isActive, onActivate, mousePosition, containerBounds }) => {
  const controls = useAnimation();
  
  // Cálculos con valores seguros
  const centerX = containerBounds?.width ? containerBounds.width / 2 : 300;
  const centerY = containerBounds?.height ? containerBounds.height / 2 : 300;
  const x = centerX + feature.position.x;
  const y = centerY + feature.position.y;
  
  // Efecto magnético
  const distance = Math.sqrt(
    Math.pow(mousePosition.x - x, 2) + 
    Math.pow(mousePosition.y - y, 2)
  );
  
  const magneticRadius = 150;
  const magneticStrength = Math.max(0, 1 - distance / magneticRadius);
  const magneticOffset = magneticStrength * 8;
  
  const dx = (mousePosition.x - x) / (distance || 1);
  const dy = (mousePosition.y - y) / (distance || 1);
  
  const finalX = x + (dx * magneticOffset);
  const finalY = y + (dy * magneticOffset);
  
  const baseSize = 48 + (feature.importance * 4);
  const size = baseSize * (isActive ? 1.4 : 1) * (1 + magneticStrength * 0.2);
  
  // useEffect con dependencias correctas
  useEffect(() => {
    if (isActive) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0, -5, 0],
        transition: { duration: 2, repeat: Infinity }
      });
    } else {
      controls.start({
        scale: 1,
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  }, [isActive, controls]);

  // Return temprano DESPUÉS de todos los hooks
  if (!containerBounds) {
    return null;
  }

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: finalX - size/2,
        top: finalY - size/2,
        width: size,
        height: size,
        zIndex: isActive ? 50 : 10,
      }}
      animate={controls}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onActivate}
    >
      {/* Halo exterior */}
      <div className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, ${getColorValue(feature.color)}20 0%, transparent 70%)`,
          transform: 'scale(1.8)',
        }}
      />
      
      {/* Nodo principal */}
      <div 
        className={`
          w-full h-full rounded-full flex items-center justify-center
          backdrop-blur-sm border-2 transition-all duration-300
          ${getNodeClasses(feature.color, isActive)}
        `}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${getColorValue(feature.color)}95, ${getColorValue(feature.color)}70)`,
          boxShadow: isActive 
            ? `0 0 40px ${getColorValue(feature.color)}70, 0 0 80px ${getColorValue(feature.color)}40`
            : `0 0 25px ${getColorValue(feature.color)}50, 0 0 15px ${getColorValue(feature.color)}30`,
        }}
      >
        <div className="text-white scale-125">
          {feature.icon}
        </div>
      </div>
      
      {/* Título */}
      <motion.div 
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isActive ? 1 : 0.8,
          y: isActive ? 0 : 5,
          scale: isActive ? 1.05 : 1
        }}
      >
        <p className="font-semibold text-sm text-gray-900 dark:text-white drop-shadow-lg text-center">
          {feature.title}
        </p>
      </motion.div>
      
      {/* Anillos de energía */}
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary-500/30 dark:border-primary-400/30"
              style={{
                transform: `scale(${1.2 + i * 0.3})`,
              }}
              animate={{
                scale: [1.2 + i * 0.3, 1.4 + i * 0.3, 1.2 + i * 0.3],
                opacity: [0.5, 0.1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
});

Node.displayName = 'Node';

// Componente ConnectionLine optimizado
const ConnectionLine: React.FC<{
  start: { x: number; y: number };
  end: { x: number; y: number };
  isActive: boolean;
  color: string;
  containerBounds: DOMRect | null;
  id: string;
}> = React.memo(({ start, end, isActive, color, containerBounds, id }) => {
  if (!containerBounds) return null;
  
  const centerX = containerBounds.width / 2;
  const centerY = containerBounds.height / 2;
  
  const startX = centerX + start.x;
  const startY = centerY + start.y;
  const endX = centerX + end.x;
  const endY = centerY + end.y;
  
  const pathData = `M ${startX} ${startY} L ${endX} ${endY}`;
  const gradientId = `gradient-${id}`;
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={getColorValue(color)} stopOpacity="0.4" />
          <stop offset="50%" stopColor={getColorValue(color)} stopOpacity="0.2" />
          <stop offset="100%" stopColor={getColorValue(color)} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <motion.path 
        d={pathData} 
        stroke={`url(#${gradientId})`}
        strokeWidth={isActive ? 3 : 1.5}
        fill="none" 
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.8 : 0.3,
          strokeWidth: isActive ? [2, 4, 2] : [1, 2, 1]
        }}
        transition={{ 
          pathLength: { duration: 1.5, ease: "easeInOut" },
          strokeWidth: { duration: 2, repeat: Infinity },
          opacity: { duration: 0.5 }
        }}
      />
    </svg>
  );
});

ConnectionLine.displayName = 'ConnectionLine';

const InnovativeFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('ai-categorization');
  const [mousePosition, setMousePosition] = useState({ x: 300, y: 300 });
  const [containerBounds, setContainerBounds] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentFeature = FEATURES_DATA.find(f => f.id === activeFeature) || FEATURES_DATA[0];
  
  // useCallback para evitar recreación de funciones
  const updateBounds = useCallback(() => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      setContainerBounds(bounds);
      // Inicializar mousePosition al centro
      setMousePosition({
        x: bounds.width / 2,
        y: bounds.height / 2
      });
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (containerBounds) {
      setMousePosition({
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top
      });
    }
  }, [containerBounds]);

  const handleMouseLeave = useCallback(() => {
    if (containerBounds) {
      setMousePosition({
        x: containerBounds.width / 2,
        y: containerBounds.height / 2
      });
    }
  }, [containerBounds]);

  // useEffect corregido - sin dependencias problemáticas
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Llamar updateBounds solo una vez al montar
    updateBounds();
    
    // Listener para resize
    const handleResize = () => updateBounds();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Solo se ejecuta al montar/desmontar

  // useEffect separado para mouse events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);
  
  // Generar conexiones con useMemo para optimización
  const connections = React.useMemo(() => {
    return FEATURES_DATA.flatMap((feature, index) => {
      return FEATURES_DATA.slice(index + 1)
        .filter(other => {
          if (feature.id === 'ai-categorization' || other.id === 'ai-categorization') return true;
          if (feature.id === activeFeature || other.id === activeFeature) return true;
          const distance = Math.sqrt(
            Math.pow(feature.position.x - other.position.x, 2) + 
            Math.pow(feature.position.y - other.position.y, 2)
          );
          return distance < 250;
        })
        .map(other => ({
          id: `${feature.id}-${other.id}`,
          start: feature.position,
          end: other.position,
          isActive: feature.id === activeFeature || other.id === activeFeature,
          color: feature.id === activeFeature ? feature.color : other.id === activeFeature ? other.color : 'primary'
        }));
    });
  }, [activeFeature]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Elementos decorativos adicionales para mayor profundidad */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Efectos de luz sutiles */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-500/5 dark:bg-accent-400/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '10s' }} />
        
        {/* Partículas adicionales para integración */}
        {[...Array(15)].map((_, i) => {
          const leftPos = (i * 23) % 100;
          const topPos = (i * 31) % 100;
          const size = 1 + (i % 3) * 0.5;
          const opacity = 0.1 + (i % 4) * 0.05;
          
          return (
            <motion.div
              key={`integration-particle-${i}`}
              className="absolute rounded-full bg-primary-500/30 dark:bg-primary-400/20"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [opacity, opacity * 2, opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado mejorado para integración */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-base font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Innovación Continua
          </motion.h2>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Características únicas de <span className="text-primary-600 dark:text-primary-400">Gastify</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Descubre las funcionalidades innovadoras que transforman la gestión de gastos 
            corporativos en una ventaja competitiva.
          </motion.p>
        </div>

        {/* Constelación integrada */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Visualización de constelación sin contenedor */}
          <div className="flex-1">
            <div 
              ref={containerRef}
              className="relative w-full h-[600px] overflow-hidden"
            >
              {/* Líneas de conexión */}
              {connections.map(connection => (
                <ConnectionLine
                  key={connection.id}
                  id={connection.id}
                  start={connection.start}
                  end={connection.end}
                  isActive={connection.isActive}
                  color={connection.color}
                  containerBounds={containerBounds}
                />
              ))}
              
              {/* Nodos */}
              {FEATURES_DATA.map(feature => (
                <Node
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  onActivate={() => setActiveFeature(feature.id)}
                  mousePosition={mousePosition}
                  containerBounds={containerBounds}
                />
              ))}
            </div>
          </div>

          {/* Panel de información integrado */}
          <div className="lg:w-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: `${getColorValue(currentFeature.color)}20` }}
                  >
                    <div style={{ color: getColorValue(currentFeature.color) }}>
                      {currentFeature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {currentFeature.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {currentFeature.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                    Características Destacadas
                  </h4>
                  {currentFeature.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: getColorValue(currentFeature.color) }}
                      />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  className="w-full mt-6 py-3 rounded-lg font-semibold text-white transition-all duration-300"
                  style={{ 
                    backgroundColor: getColorValue(currentFeature.color),
                    boxShadow: `0 4px 20px ${getColorValue(currentFeature.color)}30`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Probar esta función →
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovativeFeatures;