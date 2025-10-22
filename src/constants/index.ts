// Application constants
export const APP_CONFIG = {
  name: 'Shopping Cart',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com',
} as const;

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product',
  CART: '/cart',
  CONTACT: '/contact',
  LOGIN: '/login',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT: '/products/:id',
  CATEGORIES: '/products/categories',
  CART: '/carts',
  USERS: '/users',
} as const;

export const THEME_CONFIG = {
  primaryColor: '#1890ff',
  borderRadius: 6,
  fontFamily: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
} as const;
