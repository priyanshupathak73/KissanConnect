import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/api';

// Provides authentication state and actions to the app.
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'kissanconnect_user';
const TOKEN_STORAGE_KEY = 'kissanconnect_token';

// Safely read stored auth (user object) from localStorage.
const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(false);

  // Persist auth state (user + token) to localStorage and context.
  const persistAuth = useCallback((nextUser, token) => {
    try {
      if (nextUser) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setUser(nextUser || null);
    } catch (err) {
      // Store errors shouldn't block UI; log for debugging.
      // eslint-disable-next-line no-console
      console.error('persistAuth error', err);
    }
  }, []);

  // Attempt to login with credentials. Returns the user on success.
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      persistAuth(data.user, data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [persistAuth]);

  // Register a new account and persist returned credentials.
  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      persistAuth(data.user, data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [persistAuth]);

  // Refresh the current user's profile from the server.
  const refreshProfile = useCallback(async () => {
    if (!user?._id) return null;
    setLoading(true);
    try {
      const data = await authService.getProfile(user._id);
      // server may return user object directly
      const latest = data.user || data;
      setUser(latest);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(latest));
      setLoading(false);
      return latest;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [user]);

  // Update profile server-side and refresh local state.
  const updateProfile = useCallback(async (payload) => {
    if (!user?._id) throw new Error('No authenticated user');
    setLoading(true);
    try {
      const data = await authService.updateProfile(user._id, payload);
      const updated = data.user || data;
      setUser(updated);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      setLoading(false);
      return updated;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, [user]);

  // Clear auth state and storage.
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (err) {
      // ignore storage errors
    }
    setUser(null);
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
