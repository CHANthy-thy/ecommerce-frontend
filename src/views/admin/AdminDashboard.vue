<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const admin = useAdminStore()
const range = ref<'7d' | '30d' | '90d'>('30d')

const stats = computed(() => {
  const mult = range.value === '7d' ? 0.35 : range.value === '90d' ? 2.2 : 1
  const baseOrders = 24
  const baseRevenue = 587
  return [
    { label: 'Orders', value: Math.round(baseOrders * mult), icon: 'receipt_long' },
    { label: 'Revenue', value: '$' + (baseRevenue * mult).toFixed(0), icon: 'payments' },
    { label: 'Users', value: admin.users.length.toString(), icon: 'groups' },
    { label: 'Products', value: (admin.products.length || 18).toString(), icon: 'inventory_2' },
  ]
})
</script>

<template>
  <div>
    <header class="head">
      <div>
        <h2>Dashboard</h2>
        <p class="muted">Admin statistics overview (mock data).</p>
      </div>

      <div class="filters">
        <button :class="{ active: range === '7d' }" @click="range = '7d'">Last 7 days</button>
        <button :class="{ active: range === '30d' }" @click="range = '30d'">Last 30 days</button>
        <button :class="{ active: range === '90d' }" @click="range = '90d'">Last 90 days</button>
      </div>
    </header>

    <section class="grid">
      <div v-for="s in stats" :key="s.label" class="card">
        <span class="micon material-symbols-rounded" aria-hidden="true">{{ s.icon }}</span>
        <div>
          <strong>{{ s.value }}</strong>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </section>

    <section class="table-card">
      <h3>Recent orders</h3>
      <p class="muted">Latest activity from mock orders list.</p>

      <div class="table">
        <div class="th">
          <span>Order</span>
          <span>User</span>
          <span>Status</span>
          <span>Total</span>
        </div>
        <div v-for="o in admin.orders.slice(0, 5)" :key="o.id" class="tr">
          <span class="mono">{{ o.id }}</span>
          <span class="user">{{ o.userEmail }}</span>
          <span class="status">{{ o.status }}</span>
          <span class="total">${{ o.total.toFixed(2) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.head h2 {
  margin: 0;
  font-size: 22px;
}
.muted {
  color: var(--text-muted);
  margin: 6px 0 0;
  font-size: 13.5px;
}
.filters {
  display: flex;
  gap: 8px;
}
.filters button {
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  padding: 0 14px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
}
.filters button.active {
  background: var(--accent-soft);
  border-color: var(--accent-border);
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}
.card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
}
.micon {
  font-size: 26px;
  color: var(--accent);
}
.card strong {
  display: block;
  font-size: 18px;
  color: var(--text-h);
}
.card span {
  display: block;
  font-size: 12.5px;
  color: var(--text-muted);
  margin-top: 2px;
}

.table-card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-xl);
  padding: 18px;
}
.table-card h3 {
  margin: 0 0 4px;
}
.table {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.th, .tr {
  display: grid;
  grid-template-columns: 1.1fr 1.2fr 0.9fr 0.7fr;
  gap: 12px;
  align-items: center;
}
.th {
  color: var(--text-muted);
  font-size: 12.5px;
  font-weight: 800;
}
.tr {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-soft);
}
.tr .mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
.status {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 800;
  font-size: 12px;
}
.total {
  text-align: right;
  font-weight: 900;
  color: var(--text-h);
}

@media (max-width: 980px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .th, .tr { grid-template-columns: 1.2fr 1.2fr 0.9fr; }
  .th span:nth-child(4), .tr span:nth-child(4) { display: none; }
}
</style>
