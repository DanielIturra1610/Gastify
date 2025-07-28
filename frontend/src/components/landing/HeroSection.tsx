import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../ui/AnimatedCounter';
import GradientButton from '../ui/GradientButton';
import IconBackground from '../ui/IconBackground';

// Importando íconos
import { PlayIcon, ChartBarIcon, DocumentTextIcon, CreditCardIcon } from '@heroicons/react/24/outline';

interface CompanyLogo {
  name: string;
  logo: string;
  alt: string;
}

const HeroSection: React.FC = () => {
  // Estado para la animación de typing
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingPause, setTypingPause] = useState(false);
  
  // Texto para la animación de typing
  const texts = [
    'Transforma tus gastos corporativos en ventaja competitiva',
    'Simplifica la gestión financiera de tu empresa',
    'Automatiza tus procesos de gastos y ahorra tiempo'
  ];
  
  // Referencias para efectos de parallax
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Logos de empresas de confianza
  const companyLogos: CompanyLogo[] = [
    { name: 'Company 1', logo: '/images/logos/logo-1.svg', alt: 'Company 1 Logo' },
    { name: 'Company 2', logo: '/images/logos/logo-2.svg', alt: 'Company 2 Logo' },
    { name: 'Company 3', logo: '/images/logos/logo-3.svg', alt: 'Company 3 Logo' },
    { name: 'Company 4', logo: '/images/logos/logo-4.svg', alt: 'Company 4 Logo' },
    { name: 'Company 5', logo: '/images/logos/logo-5.svg', alt: 'Company 5 Logo' },
  ];
  
  // Efecto para la animación de typing
  useEffect(() => {
    const text = texts[currentIndex % texts.length];
    
    const timeout = setTimeout(() => {
      if (typingPause) {
        // Mantener pausa
        setTypingPause(false);
        return;
      }
      
      if (!isDeleting) {
        setDisplayedText(text.substring(0, displayedText.length + 1));
        
        // Si completamos el texto
        if (displayedText === text) {
          setTypingPause(true);
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(text.substring(0, displayedText.length - 1));
        
        // Si terminamos de borrar
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }
      }
    }, isDeleting ? 50 : typingPause ? 1500 : 70);
    
    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isDeleting, typingPause, texts]);
  
  // Efecto para parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const elements = parallaxRef.current.querySelectorAll('.parallax-element');
      
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = parseFloat(htmlEl.getAttribute('data-speed') || '0.05');
        const x = (window.innerWidth / 2 - e.clientX) * speed;
        const y = (window.innerHeight / 2 - e.clientY) * speed;
        
        htmlEl.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Gradientes dinámicos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-primary-300/30 to-primary-400/40 blur-2xl transform animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-secondary-300/20 to-secondary-400/30 blur-xl transform animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-64 w-80 h-80 rounded-full bg-gradient-to-tr from-primary-400/20 to-secondary-300/30 blur-xl transform animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" ref={parallaxRef}>
        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="mt-16 sm:mt-24 lg:mt-32 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Columna izquierda - Texto y CTA */}
            <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="inline-block typing-effect min-h-[80px] sm:min-h-[120px] md:min-h-[144px] lg:min-h-[120px] xl:min-h-[144px]">
                  {displayedText}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
              
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                <span className="font-semibold text-primary-600 dark:text-primary-400">El problema:</span> Los gastos corporativos descontrolados drenan tus recursos. 
                <span className="font-semibold text-primary-600 dark:text-primary-400">La solución:</span> Gastify automatiza, analiza y optimiza tu flujo financiero, 
                permitiéndote <span className="font-semibold">ahorrar hasta un 30% en costos operativos</span>.
              </p>
              
              {/* Botones CTA */}
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start gap-4">
                <GradientButton 
                  variant="primary" 
                  size="lg" 
                  icon={<PlayIcon className="w-5 h-5" />}
                >
                  Iniciar Demo Gratuito
                </GradientButton>
                
                <GradientButton
                  variant="secondary"
                  size="lg"
                  icon={<DocumentTextIcon className="w-5 h-5" />}
                  customGradient="from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800"
                >
                  Ver Casos de Éxito
                </GradientButton>
              </div>
              
              {/* Estadísticas animadas */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    <AnimatedCounter end={30} suffix="%" />
                  </p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Reducción en gastos</p>
                </div>
                
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    <AnimatedCounter end={1000} suffix="+" />
                  </p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Empresas confían</p>
                </div>
                
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left col-span-2 md:col-span-1">
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    <AnimatedCounter end={5} suffix=" hrs" />
                  </p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Tiempo ahorrado/semana</p>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Visualización del dashboard */}
            <div className="mt-16 sm:mt-24 relative lg:mt-0 lg:col-span-6 flex justify-center items-center">
              {/* Elementos flotantes con parallax */}
              <div className="absolute top-5 left-5 parallax-element" data-speed="0.03">
                <IconBackground 
                  icon={<ChartBarIcon className="w-6 h-6" />}
                  color="primary"
                  size="md"
                  animation="pulse"
                />
              </div>
              <div className="absolute bottom-10 right-10 parallax-element" data-speed="0.05">
                <IconBackground 
                  icon={<CreditCardIcon className="w-6 h-6" />}
                  color="secondary"
                  size="md"
                  animation="pulse"
                />
              </div>
              
              {/* Dashboard preview */}
              <div className="relative rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-lg w-full parallax-element" data-speed="-0.01">
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-300 flex-1 text-center">Dashboard Gastify</div>
                </div>
                
                <img 
                  src="/images/dashboard-preview.png" 
                  alt="Gastify Dashboard" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Interactive overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link to="/demo" className="bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200">
                    Explorar Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 sm:mt-24 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">CONFÍAN EN GASTIFY PARA GESTIONAR SUS GASTOS</p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 hover:opacity-100 transition-opacity duration-300">
              {companyLogos.map((company, index) => (
                <img 
                  key={index}
                  src={company.logo}
                  alt={company.alt}
                  className="h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
