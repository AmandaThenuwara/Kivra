import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage on app start
    const savedUser = localStorage.getItem('kivra_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('kivra_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // For demo purposes, we'll create a user profile
    const userProfile = {
      id: Date.now(), // Simple ID generation
      email: email,
      firstName: email.split('@')[0],
      lastName: '',
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: false,
        notifications: true
      }
    };
    
    setUser(userProfile);
    localStorage.setItem('kivra_user', JSON.stringify(userProfile));
    return userProfile;
  };

  const register = (email, password, firstName, lastName) => {
    // For demo purposes, we'll create a user profile
    const userProfile = {
      id: Date.now(), // Simple ID generation
      email: email,
      firstName: firstName,
      lastName: lastName,
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: false,
        notifications: true
      }
    };
    
    setUser(userProfile);
    localStorage.setItem('kivra_user', JSON.stringify(userProfile));
    return userProfile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kivra_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('kivra_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
