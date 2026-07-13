// src/services/orderService.js
import api from './Api';

export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = () => api.get('/orders/my-orders');
export const getAllOrders = () => api.get('/orders'); // admin
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });