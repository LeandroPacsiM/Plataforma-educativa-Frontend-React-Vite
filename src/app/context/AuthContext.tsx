import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  purchasedCourses: string[]; // List of course IDs the user owns
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
  purchaseCourses: (courseIds: string[]) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use state to track login. Null means logged out.
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // For this mock, let's say the user starts owning courses c1 and c2
    setUser({ 
      id: '1', 
      name: 'Estudiante Ejemplo', 
      email: 'estudiante@ejemplo.com', 
      initials: 'EE',
      purchasedCourses: ['c1', 'c2'] 
    });
  };

  const logout = () => {
    setUser(null);
  };

  const purchaseCourses = (courseIds: string[]) => {
    if (user) {
      setUser({
        ...user,
        purchasedCourses: [...new Set([...(user.purchasedCourses || []), ...courseIds])]
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, purchaseCourses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
