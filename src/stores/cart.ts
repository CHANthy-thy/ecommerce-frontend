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
    shipping: (s) => (s.items.length === 0 ? 0 : 9.99),
    total(): number {
      return this.subtotal + (this.items.length === 0 ? 0 : 9.99)
    },
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