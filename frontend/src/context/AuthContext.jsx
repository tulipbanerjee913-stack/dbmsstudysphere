import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { currentUser, demoFacultyUser, demoAdminUser } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('studysphere_user');
    return savedUser ? JSON.parse(savedUser) : currentUser;
  });
  const [token, setToken] = useState(() => localStorage.getItem('studysphere_token') || 'mock-student-token');
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('studysphere_role');
    return savedRole || 'STUDENT';
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('studysphere_user', JSON.stringify(user));
      localStorage.setItem('studysphere_role', user.role);
      setRole(user.role);
    } else {
      localStorage.removeItem('studysphere_user');
      localStorage.removeItem('studysphere_role');
      localStorage.removeItem('studysphere_token');
    }
  }, [user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      setToken(data.token);
      setRole(data.user.role);
      localStorage.setItem('studysphere_token', data.token);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      const data = await api.register(formData);
      setUser(data.user);
      setToken(data.token);
      setRole(data.user.role);
      localStorage.setItem('studysphere_token', data.token);
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole('STUDENT');
    localStorage.removeItem('studysphere_user');
    localStorage.removeItem('studysphere_token');
    localStorage.removeItem('studysphere_role');
  };

  // Instant demo role switcher for quick evaluator preview
  const switchRole = (newRole) => {
    if (newRole === 'FACULTY') {
      setUser(demoFacultyUser);
      setRole('FACULTY');
      setToken('mock-faculty-token');
      localStorage.setItem('studysphere_token', 'mock-faculty-token');
    } else if (newRole === 'ADMIN') {
      setUser(demoAdminUser);
      setRole('ADMIN');
      setToken('mock-admin-token');
      localStorage.setItem('studysphere_token', 'mock-admin-token');
    } else {
      setUser(currentUser);
      setRole('STUDENT');
      setToken('mock-student-token');
      localStorage.setItem('studysphere_token', 'mock-student-token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
