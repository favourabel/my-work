// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getMe } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('elysee_token');
      if (token) {
        try {
          const response = await getMe();
          // ✅ Handle your backend's response shape: { success, data: user }
          const userData = response.data?.data || response.data?.user || response.data;
          setUser(userData);
          localStorage.setItem('elysee_user', JSON.stringify(userData));
        } catch (error) {
          localStorage.removeItem('elysee_token');
          localStorage.removeItem('elysee_user');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    
    // ✅ Your backend returns: { success, message, data: { user, token } }
    const { user: userData, token } = response.data.data;

    localStorage.setItem('elysee_token', token);
    localStorage.setItem('elysee_user', JSON.stringify(userData));
    setUser(userData);

    return userData;  // ✅ returns user WITH role
  };

  const register = async (userData) => {
    const response = await registerUser(userData);
    const { user: newUser, token } = response.data.data;

    localStorage.setItem('elysee_token', token);
    localStorage.setItem('elysee_user', JSON.stringify(newUser));
    setUser(newUser);

    return newUser;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem('elysee_token');
    localStorage.removeItem('elysee_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);