import React, { useEffect, useRef } from 'react';
import { ArrowPathIcon, ArrowTrendingDownIcon, ClockIcon, DocumentChartBarIcon, ExclamationCircleIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';

interface ProblemItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SolutionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProblemSolution: React.FC = () => {
  // Problemas comunes con la gestión tradicional de gastos
  const problems: ProblemItem[] = [
    {
      icon: <ClockIcon className="h-6 w-6 text-red-500" />,
      title: "Procesos lentos y manuales",
      description: "Horas invertidas en capturar, archivar y procesar recibos físicos y facturas manualmente."
    },
    {
      icon: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
      title: "Errores humanos frecuentes",
      description: "Imprecisiones en la entrada de datos que generan discrepancias contables y reportes incorrectos."
    },
    {
      icon: <DocumentChartBarIcon className="h-6 w-6 text-red-500" />,
      title: "Reportes atrasados e incompletos",
      description: "Falta de visibilidad en tiempo real sobre el estado financiero por retrasos en la consolidación de datos."
    },
    {
      icon: <CreditCardIcon className="h-6 w-6 text-red-500" />,
      title: "Fraude y gastos no autorizados",
      description: "Dificultad para detectar compras inapropiadas y patrones sospechosos de gastos."
    },
    {
      icon: <ArrowPathIcon className="h-6 w-6 text-red-500" />,
      title: "Compliance inconsistente",
      description: "Dificultad para asegurar que todos los gastos cumplan con políticas internas y regulaciones fiscales."
    },
    {
      icon: <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />,
      title: "Oportunidades perdidas",
      description: "Incapacidad de identificar patrones y oportunidades de ahorro por falta de análisis de datos."
    }
  ];

  // Soluciones que ofrece Gastify
  const solutions: SolutionItem[] = [
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Automatización completa",
      description: "Captura automática de datos de facturas y recibos con tecnología OCR avanzada y clasificación por IA."
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Precisión garantizada",
      description: "Validación de datos en tiempo real y reconciliación automática con cuentas bancarias y tarjetas corporativas."
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Reportes en tiempo real",
      description: "Dashboards actualizados al instante con visualización clara de todos los gastos por categoría, departamento y empleado."
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Detección proactiva de fraudes",
      description: "Algoritmos avanzados que detectan patrones anómalos y alertan sobre gastos sospechosos automáticamente."
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Compliance automático",
      description: "Verificación automática del cumplimiento de políticas y normativas fiscales por región para cada transacción."
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6 text-primary-600" />,
      title: "Análisis predictivo",
      description: "Identificación de oportunidades de ahorro y optimización de gastos basada en patrones históricos y tendencias."
    }
  ];

  // Custom SVG shapes for cards
  const problemShapes = [
    "M0,0 C15,20 35,10 50,20 L100,20 C85,60 70,40 55,60 L0,60 C10,40 5,20 0,0", // Irregular shape 1
    "M0,0 C30,5 20,15 40,15 L100,15 C80,50 90,35 70,60 L0,60 C20,45 10,30 0,0", // Irregular shape 2
    "M0,0 C10,15 25,5 45,10 L100,10 C90,40 70,45 65,60 L0,60 C15,45 5,25 0,0", // Irregular shape 3
    "M0,0 C20,10 40,5 55,15 L100,15 C85,45 65,40 60,60 L0,60 C25,40 10,20 0,0", // Irregular shape 4
    "M0,0 C15,15 30,5 50,10 L100,10 C75,50 85,30 60,60 L0,60 C20,40 5,30 0,0", // Irregular shape 5
    "M0,0 C25,5 35,15 55,10 L100,10 C80,45 70,35 65,60 L0,60 C10,35 15,25 0,0"  // Irregular shape 6
  ];

  const solutionShapes = [
    "M0,10 C30,0 60,5 100,10 C90,35 95,55 100,60 C60,65 30,60 0,60 C5,40 10,25 0,10", // Smooth shape 1
    "M0,15 C25,0 75,5 100,15 C95,35 90,50 100,60 C70,65 35,60 0,60 C10,45 5,30 0,15", // Smooth shape 2
    "M0,10 C35,5 65,0 100,10 C90,30 95,45 100,60 C65,70 35,65 0,60 C10,50 5,30 0,10", // Smooth shape 3
    "M0,15 C40,0 70,5 100,15 C95,40 90,55 100,60 C70,70 30,65 0,60 C5,40 15,35 0,15", // Smooth shape 4
    "M0,10 C35,5 70,0 100,10 C90,35 95,50 100,60 C65,65 30,60 0,60 C10,40 5,35 0,10", // Smooth shape 5
    "M0,15 C30,5 75,0 100,15 C95,30 90,55 100,60 C60,70 35,65 0,60 C5,45 10,25 0,15"  // Smooth shape 6
  ];

  // Ref for particle animation
  const particlesRef = useRef<HTMLDivElement>(null);

  // Initialize particle animation
  useEffect(() => {
    if (!particlesRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    particlesRef.current.appendChild(canvas);
    canvas.width = particlesRef.current.offsetWidth;
    canvas.height = particlesRef.current.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      const colors = [
        'rgba(239, 68, 68, 0.2)',  // red
        'rgba(249, 115, 22, 0.2)',  // orange
        'rgba(16, 185, 129, 0.15)', // green
        'rgba(59, 130, 246, 0.15)'  // blue
      ];

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (particlesRef.current && canvas) {
        particlesRef.current.removeChild(canvas);
      }
    };
  }, []);

  // Create reference points for SVG connector lines
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation variants for cards
  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { 
      y: -10, 
      scale: 1.03, 
      transition: { type: "spring" as const, stiffness: 300 },
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { type: 'spring' as const, stiffness: 500 } }
  };

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Particle background */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-3">
            El problema de los gastos corporativos tradicionales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Los métodos convencionales de gestión de gastos corporativos están obsoletos, 
            consumiendo tiempo valioso y generando ineficiencias operativas.
          </p>
        </ScrollReveal>

        <div className="flex flex-col space-y-24">
          {problems.map((problem, index) => {
            const isEven = index % 2 === 0;
            const solutionIndex = index;
            const solution = solutions[solutionIndex];
            
            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                {/* Connector line SVG - visible only on larger screens */}
                <div className="absolute inset-0 hidden lg:block pointer-events-none">
                  <svg className="w-full h-full">
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 * index }}
                      d={`M25%,50% C40%,${45}% 60%,${55}% 75%,50%`}
                      stroke={isEven ? "url(#gradient-even-" + index + ")" : "url(#gradient-odd-" + index + ")"}
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <defs>
                      <linearGradient id={"gradient-even-" + index} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id={"gradient-odd-" + index} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Problem Card - Takes positions 1-5 in a 12 column grid */}
                <motion.div 
                  className="lg:col-span-5 lg:col-start-1 relative z-10"
                  ref={(el: HTMLDivElement | null) => problemRefs.current[index] = el}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={cardVariants}
                >
                  <div className="relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      <path 
                        d={problemShapes[index % problemShapes.length]} 
                        fill={`url(#problem-gradient-${index})`} 
                        className="filter drop-shadow-xl transition-all duration-300"
                      />
                      <defs>
                        <linearGradient id={`problem-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={index % 2 === 0 ? "#fecaca" : "#fed7aa"} /> {/* red-200 or orange-200 */}
                          <stop offset="100%" stopColor={index % 2 === 0 ? "#ef4444" : "#f97316"} /> {/* red-500 or orange-500 */}
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="relative p-6 sm:p-8 h-full flex flex-col">
                      <div className="flex items-start space-x-4 mb-3">
                        <motion.div 
                          className="flex-shrink-0 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm"
                          variants={iconVariants}
                        >
                          <div className="text-red-500 h-8 w-8">
                            {problem.icon}
                          </div>
                        </motion.div>
                        <h4 className="text-xl font-bold text-white mt-2 drop-shadow-md">
                          {problem.title}
                        </h4>
                      </div>
                      <div className="mt-1 px-2">
                        <p className="text-white/90 drop-shadow-sm text-sm sm:text-base">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Solution Card - Takes positions 7-11 in a 12 column grid */}
                <motion.div 
                  className="lg:col-span-5 lg:col-start-7 relative z-10"
                  ref={(el: HTMLDivElement | null) => solutionRefs.current[index] = el}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={cardVariants}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                      <path 
                        d={solutionShapes[index % solutionShapes.length]} 
                        fill={`url(#solution-gradient-${index})`} 
                        className="filter drop-shadow-xl transition-all duration-300"
                      />
                      <defs>
                        <linearGradient id={`solution-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={index % 2 === 0 ? "#bfdbfe" : "#bbf7d0"} /> {/* blue-200 or green-200 */}
                          <stop offset="100%" stopColor={index % 2 === 0 ? "#3b82f6" : "#10b981"} /> {/* blue-500 or green-500 */}
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="relative p-6 sm:p-8 h-full flex flex-col">
                      <div className="flex items-start space-x-4 mb-3">
                        <motion.div 
                          className="flex-shrink-0 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm"
                          variants={iconVariants}
                        >
                          <div className="text-primary-600 h-8 w-8">
                            {solution.icon}
                          </div>
                        </motion.div>
                        <h4 className="text-xl font-bold text-white mt-2 drop-shadow-md">
                          {solution.title}
                        </h4>
                      </div>
                      <div className="mt-1 px-2">
                        <p className="text-white/90 drop-shadow-sm text-sm sm:text-base">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl font-medium text-primary-600 dark:text-primary-400 mb-6 max-w-3xl mx-auto">
            Gastify transforma completamente la gestión de gastos de tu empresa, convirtiendo un proceso tedioso
            en una ventaja competitiva.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
