// src/services/authService.js
import api from './Api';

// Register a new user
export const registerUser = (data) => api.post('/auth/register', data);

// Login existing user
export const loginUser = (data) => api.post('/auth/login', data);

// Logout current user
export const logoutUser = () => api.post('/auth/logout');

// Get currently logged-in user's profile
export const getMe = () => api.get('/auth/me');

// Update user profile
export const updateProfile = (data) => api.put('/auth/profile', data);

// Change password
export const changePassword = (data) => api.put('/auth/change-password', data);

// Forgot password (request reset email)
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);

// Reset password using token
export const resetPassword = (token, data) => api.put(`/auth/reset-password/${token}`, data);