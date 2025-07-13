import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import ExpensesPage from './pages/expenses/ExpensesPage'
import ExpenseFormPage from './pages/expenses/ExpenseFormPage'
import CompanySettingsPage from './pages/settings/CompanySettingsPage'
import ProfilePage from './pages/profile/ProfilePage'
import NotFoundPage from './pages/errors/NotFoundPage'
import Layout from './components/layout/Layout'

function App() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/new" element={<ExpenseFormPage />} />
          <Route path="/expenses/:id" element={<ExpenseFormPage />} />
          <Route path="/settings/company" element={<CompanySettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      
      {/* Ruta para página no encontrada */}
      <Route path="/404" element={<NotFoundPage />} />
      
      {/* Redirección a página principal o login según autenticación */}
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
      } />
      
      {/* Cualquier ruta no definida redirige a 404 */}
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

export default App