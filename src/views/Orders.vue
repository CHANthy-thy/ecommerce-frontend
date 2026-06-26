<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore, type OrderStatus } from '@/stores/orders'

const auth = useAuthStore()
const ordersStore = useOrdersStore()

const filter = ref<'All' | OrderStatus>('All')
const open = ref<string | null>(null)

const myOrders = computed(() => {
  const ownerKey = auth.user?.email ?? 'guest@local'
  return ordersStore.listByOwnerKey(ownerKey)
})


const list = computed(() => {
  if (filter.value === 'All') return myOrders.value
  return myOrders.value.filter((o) => o.status === filter.value)
})

function toggle(id: string) {
  open.value = open.value === id ? null : id
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>


<template>
  <div class="page container">
    <header class="head">
      <div>
        <h1>My orders</h1>
        <p class="muted">Track, view and manage your recent purchases.</p>
      </div>

      <div class="tabs">
        <button v-for="t in (['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const)" :key="t" :class="{ active: filter === t }" @click="filter = t">
          {{ t }}
        </button>
      </div>
    </header>

    <div v-if="list.length === 0" class="empty">
      <span class="micon">receipt_long</span>
      <h2>No orders here</h2>
      <p>When you place an order it will show up in this list.</p>
      <RouterLink to="/products" class="btn primary">Start shopping</RouterLink>
    </div>

    <ul v-else class="orders">
      <li v-for="o in list" :key="o.id" class="order" :class="{ open: open === o.id }">
        <button class="row" @click="toggle(o.id)">
          <div class="id">
            <strong>{{ o.id }}</strong>
            <span>{{ fmt(o.date) }}</span>
          </div>
          <span class="status" :class="o.status.toLowerCase()">{{ o.status }}</span>
          <span class="total">${{ o.total.toFixed(2) }}</span>
          <span class="items-count">{{ o.items.reduce((a, i) => a + i.qty, 0) }} item{{ o.items.length === 1 ? '' : 's' }}</span>
          <span class="micon chev">expand_more</span>
        </button>

        <Transition name="slide">
          <div v-if="open === o.id" class="details">
            <div class="line"></div>
            <ul class="items">
              <li v-for="(it, i) in o.items" :key="i">
                <img :src="it.image" :alt="it.name" />
                <div>
                  <strong>{{ it.name }}</strong>
                  <span>Qty {{ it.qty }} · ${{ it.price.toFixed(2) }}</span>
                </div>
                <span class="line-price">${{ (it.price * it.qty).toFixed(2) }}</span>
              </li>
            </ul>
            <div class="actions">
              <button class="btn ghost">Reorder</button>
              <button class="btn primary">View details</button>
            </div>
          </div>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  padding: 32px 20px 48px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.muted {
  color: var(--text-muted);
  font-size: 14px;
  margin-top: 6px;
}
.tabs {
  display: inline-flex;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  padding: 4px;
  gap: 2px;
  overflow-x: auto;
}
.tabs button {
  border: 0;
  background: transparent;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13.5px;
  color: var(--text);
  cursor: pointer;
  white-space: nowrap;
  transition: background 140ms ease, color 140ms ease;
}
.tabs button:hover {
  color: var(--text-h);
}
.tabs button.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.empty {
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: var(--r-xl);
  padding: 70px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.empty .micon {
  font-size: 48px;
  color: var(--accent);
  background: var(--accent-soft);
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 6px;
  font-family: 'Material Symbols Rounded', 'Material Icons';
}

.orders {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.order {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.order.open {
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}
.row {
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 40px;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}
.id {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.id strong {
  color: var(--text-h);
  font-size: 14.5px;
}
.id span {
  color: var(--text-muted);
  font-size: 12.5px;
}
.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: max-content;
}
.status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.status.delivered {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}
.status.shipped {
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}
.status.processing {
  background: rgba(245, 158, 11, 0.12);
  color: #b45309;
}
.status.cancelled {
  background: var(--danger-soft);
  color: var(--danger);
}
.total {
  color: var(--text-h);
  font-weight: 700;
  font-size: 16px;
}
.items-count {
  color: var(--text-muted);
  font-size: 13.5px;
}
.chev {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 22px;
  color: var(--text-muted);
  transition: transform 200ms ease;
}
.order.open .chev {
  transform: rotate(180deg);
  color: var(--accent);
}

.details {
  padding: 0 16px 18px;
}
.line {
  height: 1px;
  background: var(--border-soft);
  margin: 0 0 12px;
}
.items {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.items li {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 10px;
}
.items img {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  background: #f5f3ff;
}
.items div {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.items strong {
  color: var(--text-h);
  font-size: 13.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.items div span {
  color: var(--text-muted);
  font-size: 12.5px;
}
.line-price {
  font-weight: 600;
  color: var(--text-h);
  font-size: 14px;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13.5px;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-1px);
}
.btn.ghost {
  background: #fff;
  color: var(--text-h);
  border-color: var(--border);
}
.btn.ghost:hover {
  border-color: var(--accent-border);
  color: var(--accent);
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 240ms ease, opacity 200ms ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 600px;
  opacity: 1;
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'id status'
      'total items'
      'count chev';
    gap: 8px 12px;
  }
  .id {
    grid-area: id;
  }
  .status {
    grid-area: status;
    justify-self: end;
  }
  .total {
    grid-area: total;
  }
  .items-count {
    grid-area: count;
  }
  .chev {
    grid-area: chev;
  }
}
</style>