import React, { createContext, useState, useEffect, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import { authApi } from '../services/api/authApi';
import { User } from '../types/User';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  company_id?: string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  refreshToken: async () => false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Verificar si el token ha expirado
          const decodedToken = jwtDecode<DecodedToken>(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token expirado, intentar refresh
            const success = await refreshToken();
            if (!success) {
              // Si falla el refresh, hacer logout
              logout();
            }
          } else {
            // Token válido, establecer usuario
            setCurrentUser({
              id: decodedToken.sub,
              email: decodedToken.email,
              role: decodedToken.role,
              companyId: decodedToken.company_id,
            });
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error al decodificar token:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);
      const { access_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      
      const decodedToken = jwtDecode<DecodedToken>(access_token);
      
      setCurrentUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        companyId: decodedToken.company_id,
      });
      
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error de login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await authApi.refreshToken();
      const { access_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      
      const decodedToken = jwtDecode<DecodedToken>(access_token);
      
      setCurrentUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        companyId: decodedToken.company_id,
      });
      
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error al refrescar token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};