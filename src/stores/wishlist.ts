import { defineStore } from 'pinia'
import { wishlistApi } from '@/api'

export interface WishItem {
  id: number
  product_id: number
  name: string
  price: number
  image: string
  rating: number
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as WishItem[],
    loading: false,
  }),
  getters: {
    count: (s) => s.items.length,
    has: (s) => (id: number) => s.items.some((i) => i.product_id === id),
  },
  actions: {
    async fetch() {
      this.loading = true
      try {
        const response = await wishlistApi.getAll()
        this.items = response.data.data.map((item: any) => ({
          id: item.id,
          product_id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image_url || item.product.image,
          rating: item.product.rating || 0,
        }))
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async add(productId: number) {
      try {
        const response = await wishlistApi.add({ product_id: productId })
        const item = response.data.data
        this.items.push({
          id: item.id,
          product_id: item.product_id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image_url || item.product.image,
          rating: item.product.rating || 0,
        })
      } catch (error) {
        throw error
      }
    },

    async remove(id: number) {
      try {
        await wishlistApi.remove(id)
        this.items = this.items.filter((i) => i.id !== id)
      } catch (error) {
        throw error
      }
    },
  },
})