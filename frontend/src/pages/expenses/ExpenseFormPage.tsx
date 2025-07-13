import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface ExpenseFormData {
  category: string;
  description: string;
  amount: number;
  date: string;
  companyName: string;
  documentType: string;
  documentNumber: string;
  receipt?: File | null;
  tags: string;
}

/**
 * Página de formulario para crear o editar gastos
 */
const ExpenseFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<ExpenseFormData>({
    category: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    companyName: '',
    documentType: 'Boleta',
    documentNumber: '',
    receipt: null,
    tags: '',
  });

  // Categorías disponibles
  const categories = [
    'Transporte',
    'Alimentación',
    'Hospedaje',
    'Material de oficina',
    'Servicios',
    'Otros'
  ];

  // Tipos de documentos
  const documentTypes = [
    'Boleta',
    'Factura',
    'Recibo',
    'Otro'
  ];

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    category: Yup.string().required('Categoría es obligatoria'),
    description: Yup.string().required('Descripción es obligatoria').max(100, 'Máximo 100 caracteres'),
    amount: Yup.number()
      .required('Monto es obligatorio')
      .positive('El monto debe ser positivo')
      .typeError('El monto debe ser un número'),
    date: Yup.date().required('Fecha es obligatoria'),
    companyName: Yup.string().required('Nombre de empresa es obligatorio'),
    documentType: Yup.string().required('Tipo de documento es obligatorio'),
    documentNumber: Yup.string().when('documentType', {
      is: (val: string) => val !== 'Otro',
      then: (schema) => schema.required('Número de documento es obligatorio')
    }),
    tags: Yup.string()
  });

  // Si existe ID, cargar datos para edición
  useEffect(() => {
    if (id && id !== 'new') {
      setLoading(true);
      // Aquí iría la llamada a la API para cargar los datos del gasto
      // Por ahora simulamos con un timeout
      setTimeout(() => {
        if (id === '1') {
          // Ejemplo para un gasto específico
          setInitialValues({
            category: 'Transporte',
            description: 'Taxi aeropuerto',
            amount: 15000,
            date: '2025-07-10',
            companyName: 'Taxi Oficial SCL',
            documentType: 'Boleta',
            documentNumber: '1234567',
            receipt: null,
            tags: 'Viaje,Santiago',
          });
        }
        setLoading(false);
      }, 800);
    }
  }, [id]);

  // Manejar envío del formulario
  const handleSubmit = async (values: ExpenseFormData) => {
    setLoading(true);
    try {
      // Aquí iría la lógica para enviar a la API
      console.log('Datos del gasto a guardar:', values);
      
      // Simulamos el tiempo de respuesta de la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir a la lista de gastos
      navigate('/expenses');
    } catch (error) {
      console.error('Error al guardar el gasto:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {id && id !== 'new' ? 'Editar Gasto' : 'Nuevo Gasto'}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Fecha */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="date" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Monto */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Monto (CLP)
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="amount" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Empresa
                  </label>
                  <Field
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="companyName" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Tipo de documento */}
                <div>
                  <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
                    Tipo de documento
                  </label>
                  <Field
                    as="select"
                    id="documentType"
                    name="documentType"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="documentType" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Número de documento */}
                <div>
                  <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">
                    Número de documento
                  </label>
                  <Field
                    type="text"
                    id="documentNumber"
                    name="documentNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <ErrorMessage name="documentNumber" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Etiquetas (separadas por comas)
                </label>
                <Field
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Ej: Viaje, Cliente, Reunión"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <ErrorMessage name="tags" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Recibo/Comprobante */}
              <div>
                <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
                  Adjuntar comprobante (opcional)
                </label>
                <input
                  type="file"
                  id="receipt"
                  onChange={(e) => {
                    setFieldValue("receipt", e.currentTarget.files ? e.currentTarget.files[0] : null);
                  }}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100"
                />
              </div>

              <div className="flex justify-end pt-5">
                <button
                  type="button"
                  onClick={() => navigate('/expenses')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Gasto'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ExpenseFormPage;
