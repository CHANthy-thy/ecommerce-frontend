<script setup lang="ts">
import { ref, computed } from 'vue'
import { products, categories } from '@/data/products'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const { t } = useI18n()

const q = computed(() => (route.query.q as string | undefined) ?? '')
const cat = computed(() => (route.query.cat as string | undefined) ?? '')
const country = computed(() => (route.query.country as string | undefined) ?? '')
const sort = ref<'default' | 'price-asc' | 'price-desc' | 'rating'>('default')

const filtered = computed(() => {
  let list = products.slice()
  if (q.value.trim()) {
    const term = q.value.trim().toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term))
  }
  if (cat.value) list = list.filter((p) => p.category === cat.value)
  if (country.value) list = list.filter((p) => p.country === country.value)
  if (sort.value === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price)
  if (sort.value === 'rating') list = list.slice().sort((a, b) => b.rating - a.rating)
  return list
})
</script>

<template>
  <div class="page container">
    <header class="head">
      <div>
        <h1>{{ t('pages.products.title') }}</h1>
        <p class="muted">{{ t('products.head.subtitle', { count: products.length }) }}</p>
      </div>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <div class="panel">
          <h3>{{ t('products.filters.category') }}</h3>
          <ul>
            <li><RouterLink to="/products">{{ t('products.filters.option.all') }}</RouterLink></li>
            <li v-for="c in categories" :key="c.name"><RouterLink :to="`/products?cat=${c.name}`">{{ c.name }}</RouterLink></li>
          </ul>
        </div>

        <div class="panel">
          <h3>{{ t('products.filters.sort') }}</h3>
          <select v-model="sort">
            <option value="default">{{ t('products.filters.option.all') }}</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </aside>

      <section class="main">
        <div v-if="filtered.length === 0" class="empty">
          <p>{{ t('products.empty.title') }}</p>
          <small>{{ t('products.empty.desc') }}</small>
        </div>

        <div class="grid">
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px 20px 48px; }
.head { margin-bottom: 18px; }
.head h1 { margin: 0; font-size: 28px; }
.head .muted { color: var(--text-muted); font-size: 14px; margin-top: 6px; }

.layout { display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start; }
.sidebar { display: flex; flex-direction: column; gap: 18px; }
.panel { background: #fff; border: 1px solid var(--border-soft); border-radius: var(--r-lg); padding: 14px; }
.panel h3 { margin: 0 0 10px; font-size: 14px; }
.panel ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.panel li a { display: block; padding: 8px 10px; border-radius: 8px; color: var(--text); text-decoration: none; font-size: 14px; }
.panel li a:hover { background: var(--accent-soft); color: var(--accent); }
.panel select { width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border); }

.main { display: flex; flex-direction: column; gap: 18px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

.empty { text-align: center; padding: 60px 20px; background: #fff; border: 1px solid var(--border); border-radius: var(--r-xl); }
.empty p { margin: 0; font-size: 16px; font-weight: 600; }
.empty small { color: var(--text-muted); }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
