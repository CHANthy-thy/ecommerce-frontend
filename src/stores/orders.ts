import { defineStore } from 'pinia'

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderItem {
  name: string
  qty: number
  price: number
  image: string
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  ownerKey: string
}

const STORAGE_KEY = 'sm_orders_v1'



function safeParse(json: string | null): Order[] {
  if (!json) return []
  try {
    const data = JSON.parse(json) as unknown
    if (!Array.isArray(data)) return []
    return data as Order[]
  } catch {
    return []
  }
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: safeParse(localStorage.getItem(STORAGE_KEY)) as Order[],
  }),
  getters: {
    listByOwnerKey: (s) => (ownerKey: string) => s.orders.filter((o) => o.ownerKey === ownerKey),
  },

  actions: {
    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders))
    },
    addOrder(payload: { id: string; date: string; status: OrderStatus; total: number; items: OrderItem[]; ownerKey: string }) {
      this.orders.unshift(payload)
      this._persist()
    },


    setOrders(orders: Order[]) {
      this.orders = orders
      this._persist()
    },
    updateStatus(id: string, status: OrderStatus) {
      const o = this.orders.find((x) => x.id === id)
      if (!o) return
      o.status = status
      this._persist()
    },
  },
})

