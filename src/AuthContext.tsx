import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  fullName: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const signup = async (fullName: string, email: string, phone: string, password: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Save new user
    const newUser = { email, fullName, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after signup
    const userData = { email, fullName, phone };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, error: 'Invalid credentials' };
    }

    const userData = { email: foundUser.email, fullName: foundUser.fullName, phone: foundUser.phone };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
