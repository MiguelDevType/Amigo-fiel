import { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'user' | 'admin' | null;

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  currentUser: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const login = useCallback((user: AuthUser) => {
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAdmin: currentUser?.role === 'admin',
        isLoggedIn: currentUser !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
