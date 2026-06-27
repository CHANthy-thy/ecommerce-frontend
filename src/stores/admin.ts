import { defineStore } from 'pinia'


export type AdminRole = 'admin'

export interface AdminCategory {
  id: number
  name: string
  icon?: string
  cover?: string
}

export interface AdminProduct {
  id: number
  name: string
  brand: string
  category: string
  price: number
  stock: number
  image: string
  description: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  status: 'Active' | 'Suspended'
}

export interface AdminOrder {
  id: string
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  total: number
  items: { name: string; qty: number; price: number; image: string }[]
  userEmail: string
}

function seedCategories(): AdminCategory[] {
  return [
    { id: 1, name: 'Cleanser', icon: 'water_drop' },
    { id: 2, name: 'Toner', icon: 'water' },
    { id: 3, name: 'Serum', icon: 'science' },
    { id: 4, name: 'Moisturizer', icon: 'spa' },
    { id: 5, name: 'Sunscreen', icon: 'wb_sunny' },
    { id: 6, name: 'Face Mask', icon: 'self_improvement' },
    { id: 7, name: 'Eye Care', icon: 'visibility' },
  ]
}

// Seed products helper is kept for future expansion.
// Keeping it commented out avoids TS6133 (unused) in this mock admin store.
/*
function seedProducts(products: Product[]): AdminProduct[] {
  return products.slice(0, 18).map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    stock: p.stock,
    image: p.image,
    description: p.description,
  }))
}
*/

export const useAdminStore = defineStore('admin', {

  state: () => ({
    categories: seedCategories() as AdminCategory[],
    products: [] as AdminProduct[],
users: [
       { id: 'u_1', name: 'SkinCare Haven', email: 'skincare.customer@skincarehaven.com', role: 'customer', status: 'Active' },
       { id: 'u_2', name: 'Mia Johnson', email: 'mia.johnson@skincarehaven.com', role: 'customer', status: 'Active' },
       { id: 'u_3', name: 'Admin', email: 'admin@skincarehaven.com', role: 'admin', status: 'Active' },
       { id: 'u_4', name: 'Noah Brown', email: 'noah.brown@skincarehaven.com', role: 'customer', status: 'Suspended' },
     ] as AdminUser[],
orders: [
       {
         id: 'SC-482103',
         date: '2026-01-12',
         status: 'Delivered',
         total: 58.70,
         items: [
           {
             name: 'CeraVe Foaming Cleanser',
             qty: 1,
             price: 14.99,
             image: 'https://images.unsplash.com/photo-1615390782511-7f4d0f8d3b2a?w=400&q=80&auto=format&fit=crop',
           },
           {
             name: 'COSRX The Niacinamide Serum',
             qty: 1,
             price: 28.99,
             image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80&auto=format&fit=crop',
           },
         ],
         userEmail: 'skincare.customer@skincarehaven.com',
       },
       {
         id: 'SC-482078',
         date: '2026-01-08',
         status: 'Shipped',
         total: 24.99,
         items: [
           {
             name: 'La Roche-Posay Hydrating Toner',
             qty: 1,
             price: 19.99,
             image: 'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=400&q=80&auto=format&fit=crop',
           },
         ],
         userEmail: 'mia.johnson@skincarehaven.com',
       },
       {
         id: 'SC-481950',
         date: '2025-12-30',
         status: 'Processing',
         total: 22.99,
         items: [
           {
             name: 'Anua Heartleaf Toner',
             qty: 1,
             price: 19.99,
             image: 'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=400&q=80&auto=format&fit=crop',
           },
         ],
         userEmail: 'skincare.customer@skincarehaven.com',
       },
     ],
  }),

  getters: {
    revenueByUser: () => 0,
  },

  actions: {},
})

 
