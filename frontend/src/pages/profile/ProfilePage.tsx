import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';

interface ProfileFormData {
  name: string;
  email: string;
  role: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Página de perfil de usuario
 * Permite al usuario ver y actualizar su información personal
 */
const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ProfileFormData>({
    name: '',
    email: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Esquema de validación
  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
    role: Yup.string(),
    currentPassword: Yup.string().when('newPassword', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required('La contraseña actual es obligatoria para cambiar la contraseña')
    }),
    newPassword: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número'),
    confirmPassword: Yup.string().when('newPassword', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema
        .required('Debes confirmar la contraseña')
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    })
  });

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Aquí iría la llamada a la API para obtener los datos del usuario
        // Por ahora, usamos datos de ejemplo o los del contexto de autenticación
        setTimeout(() => {
          setInitialValues({
            name: currentUser?.firstName || 'Usuario Ejemplo',
            email: currentUser?.email || 'usuario@ejemplo.com',
            role: currentUser?.role || 'Administrador',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Manejar el envío del formulario
  const handleSubmit = async (values: ProfileFormData, { resetForm }: any) => {
    setLoading(true);
    try {
      // Aquí iría la llamada a la API para guardar los datos
      console.log('Guardando datos del perfil:', {
        name: values.name,
        email: values.email,
        passwordChange: values.newPassword ? true : false
      });
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Resetear campos de contraseña
      resetForm({
        values: {
          ...values,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error al guardar datos del perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialValues.name) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Mi Perfil</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administra tu información personal y contraseña
        </p>
      </div>

      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm font-medium">
            ¡La información de tu perfil ha sido actualizada correctamente!
          </p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Sección de información personal */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, dirty }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre Completo
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Rol (solo lectura) */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Rol en la Empresa
                    </label>
                    <Field
                      type="text"
                      id="role"
                      name="role"
                      disabled
                      className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 shadow-sm py-2 px-3 text-gray-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Cambiar Contraseña</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contraseña actual */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Contraseña Actual
                    </label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <ErrorMessage name="currentPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Nueva contraseña */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      Nueva Contraseña
                    </label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  {/* Confirmar contraseña */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmar Nueva Contraseña
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Botón de guardar */}
                <div className="flex justify-end pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      dirty ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
