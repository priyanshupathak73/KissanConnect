import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'kissanconnect_auth';
const TOKEN_STORAGE_KEY = 'kissanconnect_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const persisted = localStorage.getItem(AUTH_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted);
        if (token) {
          setUser(parsed);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistAuth = useCallback((nextUser, token) => {
    setUser(nextUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await authApi.login({ email, password });
    persistAuth(response.data.user, response.data.token);
    return response.data.user;
  }, [persistAuth]);

  const register = useCallback(async (payload) => {
    const response = await authApi.register(payload);
    persistAuth(response.data.user, response.data.token);
    return response.data.user;
  }, [persistAuth]);

  const refreshProfile = useCallback(async () => {
    if (!user?._id) return null;
    const response = await authApi.getProfile(user._id);
    setUser(response.data);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  }, [user]);

  const updateProfile = useCallback(async (payload) => {
    const response = await authApi.updateProfile(user._id, payload);
    setUser(response.data.user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data.user));
    return response.data.user;
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      refreshProfile,
      updateProfile,
      logout,
    }),
    [user, loading, login, register, refreshProfile, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
