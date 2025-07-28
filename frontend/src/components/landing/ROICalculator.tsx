import React, { useState, useEffect } from 'react';
import { CalculatorIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import GradientButton from '../ui/GradientButton';

interface CalculatorResult {
  annualSavings: number;
  fiveYearSavings: number;
  timeRecovered: number;
  errorReduction: number;
  complianceImprovement: number;
  employeeSatisfaction: number;
}

const ROICalculator: React.FC = () => {
  // Campos del formulario
  const [companySize, setCompanySize] = useState<string>('mid');
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [employeesSubmitting, setEmployeesSubmitting] = useState<number>(25);
  const [currentProcess, setCurrentProcess] = useState<string>('manual');
  
  // Resultados del cálculo de ROI
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calcular el ROI cuando cambien los inputs
  useEffect(() => {
    if (isCalculating) {
      const timer = setTimeout(() => {
        calculateROI();
        setIsCalculating(false);
        setShowResults(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isCalculating]);

  // Función para calcular el ROI basado en los inputs
  const calculateROI = () => {
    // Factores de cálculo basados en tamaño de empresa
    const sizeFactor = {
      small: 0.08, // 8% de ahorro para pequeñas empresas
      mid: 0.12, // 12% para medianas
      large: 0.15, // 15% para grandes
      enterprise: 0.18 // 18% para corporaciones
    };
    
    // Factores basados en el proceso actual
    const processFactor = {
      manual: 1.2, // 20% adicional de mejora si vienen de proceso manual
      partial: 1.1, // 10% adicional si tienen automatización parcial
      competitor: 1.05 // 5% adicional si vienen de un competidor
    };
    
    // Cálculo de ahorros
    const annualExpenses = monthlyExpenses * 12;
    const baseAnnualSavings = annualExpenses * sizeFactor[companySize as keyof typeof sizeFactor];
    const adjustedAnnualSavings = baseAnnualSavings * processFactor[currentProcess as keyof typeof processFactor];
    
    // Estimado de ahorro de tiempo (horas por mes por empleado)
    const hoursPerEmployeePerMonth = currentProcess === 'manual' ? 8 : (currentProcess === 'partial' ? 5 : 3);
    const monthlyHoursSaved = hoursPerEmployeePerMonth * employeesSubmitting;
    const annualHoursSaved = monthlyHoursSaved * 12;
    
    setResults({
      annualSavings: Math.round(adjustedAnnualSavings),
      fiveYearSavings: Math.round(adjustedAnnualSavings * 5),
      timeRecovered: Math.round(annualHoursSaved),
      errorReduction: currentProcess === 'manual' ? 95 : (currentProcess === 'partial' ? 80 : 50),
      complianceImprovement: currentProcess === 'manual' ? 90 : (currentProcess === 'partial' ? 75 : 40),
      employeeSatisfaction: currentProcess === 'manual' ? 85 : (currentProcess === 'partial' ? 70 : 45)
    });
  };

  const handleCalculateClick = () => {
    setIsCalculating(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setCompanySize('mid');
    setMonthlyExpenses(50000);
    setEmployeesSubmitting(25);
    setCurrentProcess('manual');
    setResults(null);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <CalculatorIcon className="h-10 w-10 inline-block mb-1 text-primary-600 dark:text-primary-500" /> 
              Calculadora de ROI
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Descubre cuánto puede ahorrar tu empresa al implementar Gastify
            </p>
          </div>
        </ScrollReveal>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Formulario */}
            <div className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/30">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Datos de tu empresa
              </h3>
              
              {/* Tamaño de empresa */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tamaño de tu empresa
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: 'small', label: 'Pequeña (<50)' },
                    { value: 'mid', label: 'Mediana (50-250)' },
                    { value: 'large', label: 'Grande (251-1000)' },
                    { value: 'enterprise', label: 'Corporación (>1000)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`py-2 px-4 text-center text-sm rounded-lg border-2 transition-all ${
                        companySize === option.value 
                          ? 'border-primary-600 bg-primary-500 text-white font-medium shadow-sm' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setCompanySize(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Gastos mensuales */}
              <div className="mb-6">
                <label htmlFor="monthly-expenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gastos mensuales promedio ($)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="monthly-expenses"
                    className="block w-full pl-7 pr-12 py-3 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0.00"
                    aria-describedby="expenses-currency"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    min={1000}
                    step={1000}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="expenses-currency">
                      USD
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Empleados que envían gastos */}
              <div className="mb-6">
                <label htmlFor="employees-submitting" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número de empleados que presentan gastos
                </label>
                <input
                  type="range"
                  id="employees-submitting"
                  min="5"
                  max={companySize === 'small' ? 50 : (companySize === 'mid' ? 250 : (companySize === 'large' ? 1000 : 5000))}
                  value={employeesSubmitting}
                  onChange={(e) => setEmployeesSubmitting(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <span>5</span>
                  <span className="font-medium text-primary-600">{employeesSubmitting} empleados</span>
                  <span>{companySize === 'small' ? 50 : (companySize === 'mid' ? 250 : (companySize === 'large' ? 1000 : 5000))}</span>
                </div>
              </div>
              
              {/* Proceso actual */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proceso actual de gestión de gastos
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'manual', label: 'Manual (papel, Excel)' },
                    { value: 'partial', label: 'Parcialmente automatizado' },
                    { value: 'competitor', label: 'Software de la competencia' }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`process-${option.value}`}
                        name="process"
                        type="radio"
                        checked={currentProcess === option.value}
                        onChange={() => setCurrentProcess(option.value)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor={`process-${option.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <GradientButton 
                  onClick={handleCalculateClick} 
                  variant="primary" 
                  size="lg"
                  isLoading={isCalculating}
                  icon={<CalculatorIcon className="h-5 w-5" />}
                  className="w-full sm:w-auto px-8"
                >
                  Calcular mi ahorro
                </GradientButton>
              </div>
            </div>
            
            {/* Resultados */}
            <div className="p-8 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {showResults ? 'Tu potencial ahorro con Gastify' : 'Beneficios esperados'}
              </h3>
              
              {!showResults ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center italic">
                    Completa el formulario y calcula tu ROI para ver resultados personalizados
                  </p>
                </div>
              ) : (
                <ScrollReveal direction="up" className="space-y-8">
                  {/* Ahorros financieros */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ahorro anual estimado</h4>
                      <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                      $<AnimatedCounter end={results?.annualSavings || 0} />
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      $<AnimatedCounter end={results?.fiveYearSavings || 0} /> en 5 años
                    </p>
                  </div>
                  
                  {/* Tiempo recuperado */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Tiempo anual recuperado
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          <AnimatedCounter end={results?.timeRecovered || 0} /> horas
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          al año
                        </p>
                      </div>
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          <AnimatedCounter end={Math.round((results?.timeRecovered || 0) / 8)} /> días
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          de trabajo completo
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mejoras adicionales */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Mejoras operativas
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                          <span>Reducción de errores</span>
                          <span><AnimatedCounter end={results?.errorReduction || 0} />%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results?.errorReduction || 0}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                          <span>Mejora en compliance</span>
                          <span><AnimatedCounter end={results?.complianceImprovement || 0} />%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${results?.complianceImprovement || 0}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                          <span>Satisfacción de empleados</span>
                          <span><AnimatedCounter end={results?.employeeSatisfaction || 0} />%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${results?.employeeSatisfaction || 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acciones */}
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                    <GradientButton 
                      variant="primary" 
                      size="md"
                    >
                      Solicitar demostración detallada
                    </GradientButton>
                    <button
                      onClick={handleReset}
                      className="text-gray-600 dark:text-gray-400 underline text-sm font-medium hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Recalcular
                    </button>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
