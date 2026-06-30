<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import api from '@/api'

interface Order {
  id: number
  user_id: number
  user?: { id: number; name: string; email: string }
  total: number
  status: string
  shipping_address: string
  billing_address?: string
  payment_method: string
  created_at: string
  items?: OrderItem[]
}

interface OrderItem {
  id: number
  product_id: number
  product?: { id: number; name: string; price: number; image?: string }
  quantity: number
  price: number
}

const orders = ref<Order[]>([])
const search = ref('')
const loading = ref(false)
const selectedOrder = ref<Order | null>(null)
const showDetail = ref(false)

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const list = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return orders.value
  return orders.value.filter((o) => 
    o.id.toString().includes(q) || 
    (o.user?.email || '').toLowerCase().includes(q) ||
    o.status.toLowerCase().includes(q)
  )
})

async function loadOrders() {
  loading.value = true
  try {
    const response = await api.get('/admin/orders')
    orders.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to load orders', error)
  } finally {
    loading.value = false
  }
}

async function loadOrderDetail(id: number) {
  try {
    const response = await api.get(`/admin/orders/${id}`)
    selectedOrder.value = response.data
    showDetail.value = true
  } catch (error) {
    console.error('Failed to load order detail', error)
  }
}

async function updateStatus(orderId: number, status: string) {
  try {
    await api.put(`/admin/orders/${orderId}/status`, { status })
    await loadOrders()
    if (selectedOrder.value?.id === orderId) {
      selectedOrder.value.status = status
    }
  } catch (error) {
    console.error('Failed to update order status', error)
  }
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: '#f59e0b',
    processing: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#10b981',
    cancelled: '#ef4444',
  }
  return colors[status] || '#6b7280'
}

function closeDetail() {
  showDetail.value = false
  selectedOrder.value = null
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <div>
    <header class="head">
      <div>
        <h2>Orders</h2>
        <p class="muted">Manage customer orders</p>
      </div>

      <div class="right">
        <input v-model="search" class="search" type="text" placeholder="Search orders..." />
      </div>
    </header>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="table-card">
      <div class="table">
        <div class="th">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Status</span>
          <span>Total</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        <div v-for="o in list" :key="o.id" class="tr">
          <span class="mono">#{{ o.id }}</span>
          <span class="user">{{ o.user?.email || 'User ' + o.user_id }}</span>
          <span class="status" :style="{ background: getStatusColor(o.status) + '20', color: getStatusColor(o.status) }">
            {{ o.status }}
          </span>
          <span class="total">${{ o.total.toFixed(2) }}</span>
          <span class="date">{{ new Date(o.created_at).toLocaleDateString() }}</span>
          <span class="actions">
            <button class="btn small" @click="loadOrderDetail(o.id)">View</button>
            <select 
              class="status-select" 
              :value="o.status" 
              @change="updateStatus(o.id, $target.value)"
            >
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </span>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showDetail && selectedOrder" class="modal-overlay" @click="closeDetail">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Order #{{ selectedOrder.id }}</h3>
          <button class="close-btn" @click="closeDetail">×</button>
        </div>
        
        <div class="modal-body">
          <div class="order-info">
            <div class="info-group">
              <span class="label">Customer:</span>
              <span>{{ selectedOrder.user?.email || 'User ' + selectedOrder.user_id }}</span>
            </div>
            <div class="info-group">
              <span class="label">Status:</span>
              <span 
                class="status-badge"
                :style="{ background: getStatusColor(selectedOrder.status) + '20', color: getStatusColor(selectedOrder.status) }"
              >
                {{ selectedOrder.status }}
              </span>
            </div>
            <div class="info-group">
              <span class="label">Payment Method:</span>
              <span>{{ selectedOrder.payment_method }}</span>
            </div>
            <div class="info-group">
              <span class="label">Shipping Address:</span>
              <span>{{ selectedOrder.shipping_address }}</span>
            </div>
            <div class="info-group">
              <span class="label">Billing Address:</span>
              <span>{{ selectedOrder.billing_address || 'Same as shipping' }}</span>
            </div>
          </div>

          <div class="order-items">
            <h4>Order Items</h4>
            <div v-if="selectedOrder.items && selectedOrder.items.length > 0" class="items-list">
              <div v-for="item in selectedOrder.items" :key="item.id" class="item-row">
                <div class="item-info">
                  <img v-if="item.product?.image" :src="item.product.image" :alt="item.product.name" class="item-img" />
                  <div>
                    <strong>{{ item.product?.name || 'Product ' + item.product_id }}</strong>
                    <span class="item-meta">Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}</span>
                  </div>
                </div>
                <span class="item-total">${{ (item.quantity * item.price).toFixed(2) }}</span>
              </div>
            </div>
            <div v-else class="no-items">No items found</div>
          </div>

          <div class="order-total">
            <strong>Total: ${{ selectedOrder.total.toFixed(2) }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
h2 {
  margin: 0;
  font-size: 20px;
}
.muted {
  color: var(--text-muted);
  font-size: 13.5px;
  margin-top: 6px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}

.table-card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 18px;
}
.table {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.th, .tr {
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 1fr 0.8fr 1fr 1.2fr;
  gap: 12px;
  align-items: center;
}
.th {
  color: var(--text-muted);
  font-size: 12.5px;
  font-weight: 800;
  padding: 12px;
  border-bottom: 1px solid var(--border-soft);
}
.tr {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: 600;
}
.user {
  font-size: 14px;
}
.status {
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  text-transform: capitalize;
}
.total {
  text-align: right;
  font-weight: 900;
  color: var(--text-h);
}
.date {
  font-size: 13px;
  color: var(--text-muted);
}
.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.search {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 14px;
  width: 200px;
}
.btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
.btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
}
.btn.small {
  padding: 4px 10px;
}
.status-select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  font-size: 12px;
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: var(--r-lg);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid var(--border-soft);
}
.modal-header h3 {
  margin: 0;
  font-size: 18px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-muted);
}
.modal-body {
  padding: 18px;
}
.order-info {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}
.info-group {
  display: flex;
  gap: 8px;
}
.label {
  font-weight: 600;
  color: var(--text-muted);
  min-width: 120px;
}
.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  text-transform: capitalize;
}
.order-items h4 {
  margin: 0 0 12px;
  font-size: 16px;
}
.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-soft);
  border-radius: 10px;
}
.item-info {
  display: flex;
  gap: 12px;
  align-items: center;
}
.item-img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}
.item-meta {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
}
.item-total {
  font-weight: 700;
}
.no-items {
  color: var(--text-muted);
  padding: 20px;
  text-align: center;
}
.order-total {
  padding-top: 12px;
  border-top: 1px solid var(--border-soft);
  text-align: right;
  font-size: 18px;
}

@media (max-width: 768px) {
  .th, .tr {
    grid-template-columns: 0.6fr 1fr 0.8fr 0.7fr;
  }
  .th span:nth-child(5), .tr span:nth-child(5),
  .th span:nth-child(6), .tr span:nth-child(6) {
    display: none;
  }
}
</style>
