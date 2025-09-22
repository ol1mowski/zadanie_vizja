import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { UserType } from '../types/user';

type LoginPayload = { email: string; password: string; userType: 'student' | 'admin' };

interface AuthState {
  role: UserType | null;
  isLoading: boolean;
}

interface UserContextType {
  auth: AuthState;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ role: null, isLoading: true });

  const fetchUserRole = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const role = data.role === 'STUDENT' ? UserType.STUDENT : 
                     data.role === 'ADMIN' ? UserType.ADMIN : null;
        setAuth({ role, isLoading: false });
      } else {
        setAuth({ role: null, isLoading: false });
      }
    } catch (error) {
      setAuth({ role: null, isLoading: false });
    }
  };

  const login = async ({ email, password }: LoginPayload) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: email, password })
    });
    if (!res.ok) throw new Error('Błędne dane logowania');
    await fetchUserRole();
  };

  const logout = () => {
    setAuth({ role: null, isLoading: false });
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  const value = useMemo<UserContextType>(() => {
    return { auth, login, logout, refreshAuth: fetchUserRole };
  }, [auth]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};


