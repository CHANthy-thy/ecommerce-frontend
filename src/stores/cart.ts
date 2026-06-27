import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

const STORAGE_KEY = 'sm_cart_v1'

function safeParseCartItems(json: string | null): CartItem[] | null {
  if (!json) return null
  try {
    const data = JSON.parse(json) as unknown
    if (!Array.isArray(data)) return null

    const items: CartItem[] = []
    for (const x of data as unknown[]) {
      if (!x || typeof x !== 'object') return null
      const i = x as Partial<CartItem>
      if (
        typeof i.id !== 'number' ||
        typeof i.name !== 'string' ||
        typeof i.price !== 'number' ||
        typeof i.image !== 'string' ||
        typeof i.quantity !== 'number'
      ) {
        return null
      }
      items.push({
        id: i.id,
        name: i.name,
        price: i.price,
        image: i.image,
        quantity: i.quantity,
      })
    }

    return items
  } catch {
    return null
  }
}

const seededCart: CartItem[] = [
  {
    id: 1,
    name: 'CeraVe Foaming Cleanser (Daily Refresh)',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1615390782511-7f4d0f8d3b2a?w=600&q=80&auto=format&fit=crop',
    quantity: 1,
  },
  {
    id: 2,
    name: 'La Roche-Posay Hydrating Toner',
    price: 19.5,
    image: 'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=600&q=80&auto=format&fit=crop',
    quantity: 2,
  },
]

export const useCartStore = defineStore('cart', {
  state: () => {
    const stored = safeParseCartItems(localStorage.getItem(STORAGE_KEY))

    return {
      items: stored ?? seededCart,
    }
  },
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.quantity, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0),
  },
  actions: {
    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    add(item: Omit<CartItem, 'quantity'>, qty = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += qty
      } else {
        this.items.push({ ...item, quantity: qty })
      }
      this._persist()
    },
    increment(id: number) {
      const i = this.items.find((x) => x.id === id)
      if (i) i.quantity++
      this._persist()
    },
    decrement(id: number) {
      const i = this.items.find((x) => x.id === id)
      if (i && i.quantity > 1) i.quantity--
      this._persist()
    },
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
      this._persist()
    },
    clear() {
      this.items = []
      this._persist()
    },
  },
})