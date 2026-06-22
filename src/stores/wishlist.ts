import { defineStore } from 'pinia'

export interface WishItem {
  id: number
  name: string
  price: number
  image: string
  rating: number
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [
      {
        id: 2,
        name: 'Minimalist Leather Backpack',
        price: 129.0,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop',
        rating: 4.6,
      },
      {
        id: 4,
        name: 'Mechanical Keyboard RGB',
        price: 149.0,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80&auto=format&fit=crop',
        rating: 4.9,
      },
    ] as WishItem[],
  }),
  getters: {
    count: (s) => s.items.length,
    has: (s) => (id: number) => s.items.some((i) => i.id === id),
  },
  actions: {
    toggle(item: WishItem) {
      const i = this.items.findIndex((x) => x.id === item.id)
      if (i >= 0) this.items.splice(i, 1)
      else this.items.push(item)
    },
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
  },
})