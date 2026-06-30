import { defineStore } from 'pinia'
import { cartApi } from '@/api'

export interface CartItem {
  id: number
  product_id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    loading: false,
  }),
  getters: {
    count: (s) => s.items.reduce((a, i) => a + i.quantity, 0),
    subtotal: (s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0),
    total(state) {
      const s = state as { items: CartItem[] }
      return s.items.reduce((a, i) => a + i.price * i.quantity, 0)
    },
  },
  actions: {
    async fetch() {
      this.loading = true
      try {
        const response = await cartApi.get()
        const cartData = response.data.data
        this.items = (cartData.items || []).map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image_url || item.product.image,
          quantity: item.quantity,
        }))
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async add(productId: number, quantity = 1) {
      try {
        const response = await cartApi.add({ product_id: productId, quantity })
        const item = response.data.data as any
        const product = item.product as any
        const existing = this.items.find((i) => i.product_id === productId)
        if (existing) {
          existing.quantity += quantity
        } else {
          this.items.push({
            id: item.id,
            product_id: item.product_id,
            name: product.name,
            price: product.price,
            image: product.image_url || product.image,
            quantity: item.quantity,
          })
        }
      } catch (error) {
        throw error
      }
    },

    async update(productId: number, quantity: number) {
      try {
        const response = await cartApi.update(productId, { quantity })
        const updated = response.data.data as any
        const item = this.items.find((i) => i.product_id === productId)
        if (item) {
          item.quantity = updated.quantity
        }
      } catch (error) {
        throw error
      }
    },

    async remove(productId: number) {
      try {
        await cartApi.remove(productId)
        this.items = this.items.filter((i) => i.product_id !== productId)
      } catch (error) {
        throw error
      }
    },

    async clear() {
      // Remove all items one by one
      for (const item of [...this.items]) {
        await this.remove(item.product_id)
      }
    },
  },
})