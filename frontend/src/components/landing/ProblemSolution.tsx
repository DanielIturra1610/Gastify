import React from 'react';
import { ArrowPathIcon, ArrowTrendingDownIcon, ClockIcon, DocumentChartBarIcon, ExclamationCircleIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ScrollReveal from '../ui/ScrollReveal';

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

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-2">
            El problema de los gastos corporativos tradicionales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Los métodos convencionales de gestión de gastos corporativos están obsoletos, 
            consumiendo tiempo valioso y generando ineficiencias operativas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Columna de problemas */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-8">
              <ExclamationCircleIcon className="h-8 w-8 inline-block mr-2 mb-1" />
              El método tradicional
            </h3>
            
            {problems.map((problem, index) => (
              <ScrollReveal 
                key={index} 
                direction="left" 
                delay={index * 100}
                className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                  {problem.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {problem.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {problem.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Columna de soluciones */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-500 mb-8">
              <CheckCircleIcon className="h-8 w-8 inline-block mr-2 mb-1" />
              La solución Gastify
            </h3>
            
            {solutions.map((solution, index) => (
              <ScrollReveal 
                key={index} 
                direction="right" 
                delay={index * 100}
                className="flex items-start space-x-4 bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 p-1.5 bg-primary-100 dark:bg-primary-800/30 rounded-full">
                  {solution.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {solution.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {solution.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <ScrollReveal direction="up" className="mt-16 text-center">
          <p className="text-xl font-medium text-primary-600 dark:text-primary-400 mb-6">
            Gastify transforma completamente la gestión de gastos de tu empresa, convirtiendo un proceso tedioso
            en una ventaja competitiva.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemSolution;
