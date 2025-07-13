import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface CompanyFormData {
  name: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  logoUrl?: string;
}

/**
 * Página de configuración de la empresa
 * Permite al usuario administrar los datos de su empresa
 */
const CompanySettingsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<CompanyFormData>({
    name: '',
    taxId: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    website: ''
  });

  // Esquema de validación
  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre de la empresa es obligatorio'),
    taxId: Yup.string().required('El RUT/NIT es obligatorio'),
    address: Yup.string().required('La dirección es obligatoria'),
    city: Yup.string().required('La ciudad es obligatoria'),
    country: Yup.string().required('El país es obligatorio'),
    postalCode: Yup.string(),
    phone: Yup.string().required('El teléfono es obligatorio'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
    website: Yup.string().url('URL inválida')
  });

  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Aquí iría la llamada a la API para obtener los datos de la empresa
        // Por ahora, usamos datos de ejemplo
        setTimeout(() => {
          setInitialValues({
            name: 'Empresa Ejemplo',
            taxId: '12345678-9',
            address: 'Av. Principal 1234',
            city: 'Santiago',
            country: 'Chile',
            postalCode: '8320000',
            phone: '+56 2 2345 6789',
            email: 'contacto@empresaejemplo.cl',
            website: 'https://www.empresaejemplo.cl'
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error al cargar datos de la empresa:', error);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (values: CompanyFormData) => {
    setLoading(true);
    try {
      // Aquí iría la llamada a la API para guardar los datos
      console.log('Guardando datos de la empresa:', values);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error al guardar datos de la empresa:', error);
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
        <h1 className="text-2xl font-semibold text-gray-900">Configuración de Empresa</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administra la información de tu empresa
        </p>
      </div>

      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm font-medium">
            ¡La información de la empresa ha sido guardada correctamente!
          </p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre de la empresa */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre de la Empresa
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* RUT/NIT */}
                <div>
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                    RUT/NIT
                  </label>
                  <Field
                    type="text"
                    id="taxId"
                    name="taxId"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="taxId" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Dirección */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Ciudad */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Ciudad
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* País */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    País
                  </label>
                  <Field
                    type="text"
                    id="country"
                    name="country"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="country" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Código Postal */}
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Código Postal
                  </label>
                  <Field
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="postalCode" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Sitio Web
                  </label>
                  <Field
                    type="text"
                    id="website"
                    name="website"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="website" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              {/* Botón de guardar */}
              <div className="flex justify-end pt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanySettingsPage;
