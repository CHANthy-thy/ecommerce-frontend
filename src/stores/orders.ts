import { defineStore } from 'pinia'
import { orderApi } from '@/api'

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderItem {
  id: number
  product_id: number
  name: string
  price: number

  quantity: number
}

export interface Order {
  id: number
  order_number: string
  date: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  shipping_address: string
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    loading: false,
  }),
  getters: {
    list: (s) => s.orders,
  },
  actions: {
    async fetch() {
      this.loading = true
      try {
        const response = await orderApi.getAll()
        this.orders = response.data.data.map((order: any) => ({
          id: order.id,
          order_number: order.order_number,
          date: order.created_at,
          status: order.status as OrderStatus,
          total: order.total,
          items: order.items.map((item: any) => ({
            id: item.id,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,

          })),
          shipping_address: order.shipping_address,
        }))
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number) {
      try {
        const response = await orderApi.getById(id)
        return response.data.data as Order
      } catch (error) {
        throw error
      }
    },
  },
})