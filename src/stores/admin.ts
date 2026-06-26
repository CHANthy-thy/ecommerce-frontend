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
    { id: 1, name: 'Smartphones', icon: 'smartphone' },
    { id: 2, name: 'Laptops', icon: 'laptop_mac' },
    { id: 3, name: 'Tablets', icon: 'tablet_mac' },
    { id: 4, name: 'Smart Watches', icon: 'watch' },
    { id: 5, name: 'Headphones', icon: 'headphones' },
    { id: 6, name: 'Accessories', icon: 'cable' },
    { id: 7, name: 'Gaming', icon: 'sports_esports' },
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
      { id: 'u_1', name: 'Alex Carter', email: 'alex.carter@shopmart.io', role: 'customer', status: 'Active' },
      { id: 'u_2', name: 'Mia Johnson', email: 'mia.johnson@shopmart.io', role: 'customer', status: 'Active' },
      { id: 'u_3', name: 'Admin', email: 'admin@shopmart.io', role: 'admin', status: 'Active' },
      { id: 'u_4', name: 'Noah Brown', email: 'noah.brown@shopmart.io', role: 'customer', status: 'Suspended' },
    ] as AdminUser[],
    orders: [
      {
        id: 'SM-482103',
        date: '2026-01-12',
        status: 'Delivered',
        total: 587.0,
        items: [
          {
            name: 'Modern Lounge Chair',
            qty: 1,
            price: 549,
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80&auto=format&fit=crop',
          },
          {
            name: 'Ceramic Pour-Over Set',
            qty: 1,
            price: 38,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80&auto=format&fit=crop',
          },
        ],
        userEmail: 'alex.carter@shopmart.io',
      },
      {
        id: 'SM-482078',
        date: '2026-01-08',
        status: 'Shipped',
        total: 249.0,
        items: [
          {
            name: 'Wireless Noise-Cancel Headphones',
            qty: 1,
            price: 249,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format&fit=crop',
          },
        ],
        userEmail: 'mia.johnson@shopmart.io',
      },
      {
        id: 'SM-481950',
        date: '2025-12-30',
        status: 'Processing',
        total: 318.0,
        items: [
          {
            name: 'Smart Fitness Watch',
            qty: 1,
            price: 179,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop',
          },
        ],
        userEmail: 'alex.carter@shopmart.io',
      },
    ],
  }),

  getters: {
    revenueByUser: () => 0,
  },

  actions: {},
})

 
