'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser } from '@/types';
import {
  getStoredAdminSession,
  loginAdmin,
  logoutAdmin,
  DEMO_ADMIN_USER,
} from '@/lib/firebase/auth';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<AdminUser>;
  loginDemo: () => Promise<AdminUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => DEMO_ADMIN_USER,
  loginDemo: async () => DEMO_ADMIN_USER,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getStoredAdminSession();
    setUser(session);
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    const loggedUser = await loginAdmin(email, pass);
    setUser(loggedUser);
    return loggedUser;
  };

  const handleDemoLogin = async () => {
    const loggedUser = await loginAdmin('admin@toothstory.com', 'demo123');
    setUser(loggedUser);
    return loggedUser;
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        loginDemo: handleDemoLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
