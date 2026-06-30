import api from './axios'

export const authApi = {
  register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
    api.post('/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/login', data),

  logout: () =>
    api.post('/logout'),

  getProfile: () =>
    api.get('/profile'),

  updateProfile: (data: { name: string; email: string }) =>
    api.put('/profile', data),

  changePassword: (data: { current_password: string; password: string; password_confirmation: string }) =>
    api.put('/change-password', data),

  getUser: () =>
    api.get('/user'),
}

export const productApi = {
  getAll: (params?: { per_page?: number }) =>
    api.get('/products', { params }),

  getById: (id: number) =>
    api.get(`/products/${id}`),

  search: (params: { q: string; per_page?: number }) =>
    api.get('/products/search', { params }),
}

export const categoryApi = {
  getAll: () =>
    api.get('/categories'),
}

export const wishlistApi = {
  getAll: () =>
    api.get('/wishlist'),

  add: (data: { product_id: number }) =>
    api.post('/wishlist', data),

  remove: (id: number) =>
    api.delete(`/wishlist/${id}`),
}

export const cartApi = {
  get: () =>
    api.get('/cart'),

  add: (data: { product_id: number; quantity?: number }) =>
    api.post('/cart', data),

  update: (productId: number, data: { quantity: number }) =>
    api.put(`/cart/${productId}`, data),

  remove: (productId: number) =>
    api.delete(`/cart/${productId}`),
}

export const checkoutApi = {
  create: (data: {
    shipping_address: string
    billing_address?: string
    payment_method: string
  }) =>
    api.post('/checkout', data),
}

export const orderApi = {
  getAll: () =>
    api.get('/orders'),

  getById: (id: number) =>
    api.get(`/orders/${id}`),
}

export const reviewApi = {
  getByProduct: (productId: number) =>
    api.get(`/products/${productId}/reviews`),

  create: (productId: number, data: { rating: number; comment?: string }) =>
    api.post(`/products/${productId}/reviews`, data),

  delete: (id: number) =>
    api.delete(`/reviews/${id}`),
}