// // src/contexts/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from 'react';

// // Create the AuthContext with default values
// const AuthContext = createContext({
//   user: null,
//   login: () => {},
//   logout: () => {},
//   isAuthenticated: false,
  
// });

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // You can replace this with your authentication logic
//     // For example, checking local storage for a logged-in user
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
      
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true)
//       setLoading(false)
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setLoading(false)
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user');
//     setLoading(false)
//   };




//   return (
//     // <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Create a custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);





// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';

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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await axios.get(`${URL}/api/auth/admin/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        // Token is invalid
        localStorage.removeItem('access_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('access_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${URL}/api/auth/admin/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, admin } = response.data.data;
        
        localStorage.setItem('access_token', token);
        setUser(admin);
        setIsAuthenticated(true);
        
        return { success: true, data: admin };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
