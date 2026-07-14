import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const assetUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
};
