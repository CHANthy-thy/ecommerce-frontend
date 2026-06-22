import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      {
        id: 1,
        name: 'Wireless Noise-Cancel Headphones',
        price: 249.0,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format&fit=crop',
        quantity: 1,
      },
      {
        id: 3,
        name: 'Smart Fitness Watch',
        price: 179.0,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop',
        quantity: 2,
      },
    ] as CartItem[],
  }),
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.quantity, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0),
    shipping: (s) => (s.items.length === 0 ? 0 : 9.99),
    total(): number {
      return this.subtotal + (this.items.length === 0 ? 0 : 9.99)
    },
  },
  actions: {
    add(item: Omit<CartItem, 'quantity'>, qty = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += qty
      } else {
        this.items.push({ ...item, quantity: qty })
      }
    },
    increment(id: number) {
      const i = this.items.find((x) => x.id === id)
      if (i) i.quantity++
    },
    decrement(id: number) {
      const i = this.items.find((x) => x.id === id)
      if (i && i.quantity > 1) i.quantity--
    },
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})