import React, { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from '../api/authClient';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: any | null;
  navigateToLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState<boolean>(true);
  const [authError, setAuthError] = useState<any | null>(null);

  const checkAuth = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const currentUser = await authClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (err: any) {
      setUser(null);
      setIsAuthenticated(false);
      
      // Only set authentication required error if we are on an authenticated route
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
      const path = window.location.pathname;
      const isPublic = publicPaths.some(p => path.startsWith(p));
      
      if (!isPublic) {
        setAuthError(err);
      }
    } finally {
      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const navigateToLogin = () => {
    const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
    if (!publicPaths.some(p => window.location.pathname.startsWith(p))) {
      window.location.href = '/login';
    }
  };

  const logout = () => {
    localStorage.removeItem('com_current_user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        navigateToLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
