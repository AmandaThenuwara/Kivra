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

  const login = (userData) => {
    const userProfile = {
      id: Date.now(), // Simple ID generation
      email: userData.email,
      firstName: userData.firstName || userData.email.split('@')[0],
      lastName: userData.lastName || '',
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: userData.subscribeNewsletter || false,
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
