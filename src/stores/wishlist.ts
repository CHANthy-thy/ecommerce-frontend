import { defineStore } from 'pinia'

export interface WishItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
}

const STORAGE_KEY = 'sm_wishlist_v1'

function safeParseWishItems(json: string | null): WishItem[] | null {
  if (!json) return null
  try {
    const data = JSON.parse(json) as unknown
    if (!Array.isArray(data)) return null

    const items: WishItem[] = []
    for (const x of data as unknown[]) {
      if (!x || typeof x !== 'object') return null
      const i = x as Partial<WishItem>
      if (
        typeof i.id !== 'number' ||
        typeof i.name !== 'string' ||
        typeof i.price !== 'number' ||
        typeof i.image !== 'string' ||
        typeof i.rating !== 'number'
      ) {
        return null
      }
      items.push({ id: i.id, name: i.name, price: i.price, image: i.image, rating: i.rating })
    }

    return items
  } catch {
    return null
  }
}

const seededWishlist: WishItem[] = [
  {
    id: 2,
    name: 'La Roche-Posay Hydrating Toner',
    price: 19.5,
    image: 'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=600&q=80&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'COSRX The Niacinamide Serum',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&auto=format&fit=crop',
    rating: 4.8,
  },
]

export const useWishlistStore = defineStore('wishlist', {
  state: () => {
    const stored = safeParseWishItems(localStorage.getItem(STORAGE_KEY))

    return {
      items: stored ?? seededWishlist,
    }
  },
  getters: {
    count: (s) => s.items.length,
    has: (s) => (id: number) => s.items.some((i) => i.id === id),
  },
  actions: {
    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    toggle(item: WishItem) {
      const i = this.items.findIndex((x) => x.id === item.id)
      if (i >= 0) this.items.splice(i, 1)
      else this.items.push(item)
      this._persist()
    },
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
      this._persist()
    },
  },
})