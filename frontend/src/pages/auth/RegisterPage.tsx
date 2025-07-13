import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../services/api/authApi';

/**
 * Página de registro de usuario
 * Permite a nuevos usuarios crear una cuenta
 */
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Configuración de validación con Formik y Yup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Nombre es requerido'),
      lastName: Yup.string()
        .required('Apellido es requerido'),
      email: Yup.string()
        .email('Email inválido')
        .required('Email es requerido'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido'),
      acceptTerms: Yup.boolean()
        .oneOf([true], 'Debes aceptar los términos y condiciones')
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        // Llamada a la API para registrar usuario
        await authApi.register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        });
        
        // Redireccionar a la página de login con mensaje de éxito
        navigate('/login', { 
          state: { 
            successMessage: 'Registro exitoso. Por favor inicia sesión.' 
          }
        });
      } catch (err: any) {
        if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        } else {
          setError('Error al registrarse. Intente nuevamente.');
        }
        console.error('Error de registro:', err);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-primary-600">
            Gastify
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Únete a Gastify para gestionar tus gastos empresariales
          </p>
        </div>

        {/* Alerta de error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    formik.touched.firstName && formik.errors.firstName
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-1`}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    formik.touched.lastName && formik.errors.lastName
                      ? 'border-red-300'
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-1`}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300'
                    : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-1`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-1`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-300'
                    : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm mt-1`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className={`h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ${
                formik.touched.acceptTerms && formik.errors.acceptTerms ? 'border-red-300' : ''
              }`}
              checked={formik.values.acceptTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
              Acepto los{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                términos de servicio
              </a>{' '}
              y la{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                política de privacidad
              </a>
            </label>
          </div>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.acceptTerms}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;