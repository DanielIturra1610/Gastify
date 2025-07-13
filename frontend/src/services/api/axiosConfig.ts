import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API Base URL desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Crear instancia de axios con configuración base
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a peticiones autenticadas
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores comunes
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si es error 401 (No autorizado) y no es un intento de refresh
    if (error.response?.status === 401 && !originalRequest._retry && 
        !originalRequest.url?.includes('refresh-token')) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar token
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
          refresh_token: refreshToken
        });

        // Actualizar tokens
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }

        // Actualizar cabecera Authorization y reenviar petición original
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Error en el refresh, limpiar tokens y redirigir a login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;