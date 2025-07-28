import React from 'react';
import { IconColorVariant } from '../utils/iconColors';

type FeatureVariant = IconColorVariant;

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: FeatureVariant;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: FeatureVariant;
}

export const features: Feature[] = [
  {
    id: 'auto-approval',
    title: 'Sistema de Aprobación Automático',
    description: 'Nuestro sistema inteligente de aprobación automática reduce el tiempo de revisión de gastos hasta en un 70%, permitiendo a los gerentes concentrarse en tareas más estratégicas.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    ),
    variant: 'primary',
  },
  {
    id: 'realtime-reports',
    title: 'Informes en Tiempo Real',
    description: 'Accede a informes detallados y personalizables en tiempo real. Monitorea el gasto por departamento, proyecto o empleado de manera instantánea.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    ),
    variant: 'financial',
  },
  {
    id: 'accounting-integration',
    title: 'Integración con Contabilidad',
    description: 'Exporta tus gastos directamente a tu sistema contable. Gastify se integra con los principales ERP y sistemas contables del mercado.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 10V3L4 14h7v7l9-11h-7z" 
        />
      </svg>
    ),
    variant: 'premium',
  },
  {
    id: 'security',
    title: 'Seguridad y Privacidad',
    description: 'Tus datos están seguros con Gastify. Implementamos las mejores prácticas de seguridad para proteger tu información financiera.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
        />
      </svg>
    ),
    variant: 'accent',
  },
];

export const benefits: Benefit[] = [
  {
    id: 'time-saving',
    title: 'Ahorro de Tiempo',
    description: 'Reduce el tiempo dedicado a la gestión de gastos hasta en un 70% con nuestro sistema automatizado.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    ),
    variant: 'primary',
  },
  {
    id: 'total-control',
    title: 'Control Total',
    description: 'Accede a toda la información de tus gastos desde cualquier dispositivo, en tiempo real.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    variant: 'financial',
  },
  {
    id: 'cost-optimization',
    title: 'Optimización de Costos',
    description: 'Identifica patrones de gasto y oportunidades de ahorro con nuestros análisis detallados.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
        />
      </svg>
    ),
    variant: 'premium',
  },
  {
    id: 'tax-compliance',
    title: 'Compliance Fiscal',
    description: 'Mantén el registro de tus gastos en orden y cumple con todas las obligaciones fiscales.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    variant: 'accent',
  },
];
