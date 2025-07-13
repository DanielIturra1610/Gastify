import axiosInstance from './axiosConfig';

export const authApi = {
  /**
   * Iniciar sesión con email y contraseña
   */
  login: (email: string, password: string) => {
    return axiosInstance.post('/auth/login', { email, password });
  },

  /**
   * Registrar un nuevo usuario
   */
  register: (userData: any) => {
    return axiosInstance.post('/auth/register', userData);
  },

  /**
   * Refrescar token de acceso
   */
  refreshToken: () => {
    const refreshToken = localStorage.getItem('refresh_token');
    return axiosInstance.post('/auth/refresh-token', { refresh_token: refreshToken });
  },

  /**
   * Verificar si el token actual es válido
   */
  verifyToken: () => {
    return axiosInstance.post('/auth/verify-token');
  },

  /**
   * Solicitar restablecimiento de contraseña
   */
  requestPasswordReset: (email: string) => {
    return axiosInstance.post('/auth/password-reset-request', { email });
  },

  /**
   * Confirmar restablecimiento de contraseña
   */
  resetPassword: (token: string, newPassword: string) => {
    return axiosInstance.post('/auth/password-reset', { token, new_password: newPassword });
  }
};