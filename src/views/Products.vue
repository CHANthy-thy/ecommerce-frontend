<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const search = ref('')

// legacy filters
const activeCat = ref('All')
const activeBrand = ref<string>('All')

// new sidebar filters
const activeICat = ref<'All' | 'Electronics' | 'Fashion' | 'Food' | 'Books' | 'Beauty'>('All')
const activeCountry = ref<'All' | 'Cambodia' | 'Japan' | 'Korea' | 'China' | 'Italy' | 'USA'>('All')

type ShippingType = 'Local' | 'International'

type SortBy = 'newest' | 'popular' | 'price-asc' | 'price-desc'

const sort = ref<SortBy>('popular')

const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)

const activeRating = ref<number | null>(null) // 1-5

const activeShipping = ref<ShippingType | 'All'>('All')


const brands = ['All', 'Apple', 'Samsung', 'Xiaomi', 'ASUS', 'Lenovo', 'Dell', 'Sony', 'JBL', 'Logitech', 'Razer', 'Garmin']

const internationalCategories = ['All', 'Electronics', 'Fashion', 'Food', 'Books', 'Beauty'] as const

const countries = [
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Korea', flag: '🇰🇷' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'USA', flag: '🇺🇸' },
] as const


onMounted(() => {
  if (typeof route.query.q === 'string') search.value = route.query.q
  if (typeof route.query.cat === 'string') activeCat.value = route.query.cat
  if (typeof route.query.brand === 'string') activeBrand.value = route.query.brand
})

function pickCat(c: string) {
  activeCat.value = c
  router.replace({ query: { ...route.query, cat: c === 'All' ? undefined : c } })
}
function pickBrand(b: string) {
  activeBrand.value = b
  router.replace({ query: { ...route.query, brand: b === 'All' ? undefined : b } })
}

function pickICat(c: (typeof internationalCategories)[number]) {
  activeICat.value = c
  router.replace({ query: { ...route.query, iCat: c === 'All' ? undefined : c } })
}

function pickCountry(c: (typeof countries)[number]['name'] | 'All') {
  activeCountry.value = c
  router.replace({ query: { ...route.query, country: c === 'All' ? undefined : c } })
}


const filtered = computed(() => {
  let list = products.slice()

  // legacy filters
  if (activeCat.value !== 'All') {
    list = list.filter((p) => p.category === activeCat.value)
  }
  if (activeBrand.value !== 'All') {
    list = list.filter((p) => p.brand === activeBrand.value)
  }

  // international filters
  if (activeICat.value !== 'All') {
    list = list.filter((p) => p.iCategory === activeICat.value)
  }
  if (activeCountry.value !== 'All') {
    // avoid comparing with countryCode (different union types)
    list = list.filter((p) => p.country === activeCountry.value)
  }



  if (search.value.trim()) {
    const term = search.value.toLowerCase().trim()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    )
  }

  // rating (1-5)
  if (activeRating.value != null) {
    list = list.filter((p) => p.rating >= activeRating.value!)
  }

  // price range
  if (priceMin.value != null) {
    list = list.filter((p) => p.price >= priceMin.value!)
  }
  if (priceMax.value != null) {
    list = list.filter((p) => p.price <= priceMax.value!)
  }

  // shipping type
  if (activeShipping.value !== 'All') {
    list = list.filter((p) => p.shippingType === activeShipping.value)
  }

  // sorting
  switch (sort.value) {
    case 'newest':
      list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.rating - a.rating)
      break
    case 'popular':
      list.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0) || b.rating - a.rating)
      break
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
  }

  return list
})


function clearFilters() {
  search.value = ''
  activeCat.value = 'All'
  activeBrand.value = 'All'
  activeICat.value = 'All'
  activeCountry.value = 'All'

  priceMin.value = null
  priceMax.value = null
  activeRating.value = null
  activeShipping.value = 'All'
  sort.value = 'popular'

  router.replace({ query: {} })
}
</script>



<template>
  <div class="page container">
    <header class="head">
      <div>
        <h1>Shop everything</h1>
        <p class="muted">{{ filtered.length }} products · the latest in tech & electronics</p>
      </div>

      <div class="controls">
        <div class="search-box">
          <span class="material-symbols-rounded" aria-hidden="true">search</span>
          <input v-model="search" type="search" placeholder="Search products, brands…" />
        </div>

        <!-- Top filter bar (multi-filter, instant) -->
        <div class="filters">
          <select v-model="activeICat" aria-label="Category">
            <option :value="'All'">Category: All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Beauty">Beauty</option>
          </select>

          <select v-model="activeCountry" aria-label="Country">
            <option :value="'All'">Country: All</option>
            <option value="Cambodia">Cambodia 🇰🇭</option>
            <option value="Japan">Japan 🇯🇵</option>
            <option value="Korea">Korea 🇰🇷</option>
            <option value="China">China 🇨🇳</option>
            <option value="Italy">Italy 🇮🇹</option>
            <option value="USA">USA 🇺🇸</option>
          </select>

          <div class="price-range" aria-label="Price Range">
            <input
              v-model.number="priceMin"
              type="number"
              min="0"
              placeholder="Min"
            />
            <span class="dash">–</span>
            <input
              v-model.number="priceMax"
              type="number"
              min="0"
              placeholder="Max"
            />
          </div>

          <select v-model="activeRating" aria-label="Rating">
            <option :value="null">Rating: Any</option>
            <option :value="1">Rating: 1+</option>
            <option :value="2">Rating: 2+</option>
            <option :value="3">Rating: 3+</option>
            <option :value="4">Rating: 4+</option>
            <option :value="5">Rating: 5</option>
          </select>

          <select v-model="sort" aria-label="Sort By">
            <option value="newest">Sort: Newest</option>
            <option value="popular">Sort: Popular</option>
            <option value="price-asc">Sort: Price Low-High</option>
            <option value="price-desc">Sort: Price High-Low</option>
          </select>

          <select v-model="activeShipping" aria-label="Shipping Type">
            <option :value="'All'">Shipping: All</option>
            <option value="Local">Local</option>
            <option value="International">International</option>
          </select>
        </div>
      </div>
    </header>


    <div class="layout">
      <aside class="side">
        <div class="side-block">
          <h3>Categories</h3>
          <ul>
            <li>
              <button :class="{ active: activeCat === 'All' }" @click="pickCat('All')">
                <span>All categories</span>
                <span class="count">{{ products.length }}</span>
              </button>
            </li>
            <li v-for="c in categories" :key="c.name">
              <button :class="{ active: activeCat === c.name }" @click="pickCat(c.name)">
                <span>
                  <span class="material-symbols-rounded" aria-hidden="true">{{ c.icon }}</span>
                  {{ c.name }}
                </span>
                <span class="count">{{ products.filter((p) => p.category === c.name).length }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="side-block">
          <h3>Categories</h3>
          <ul>
            <li v-for="c in internationalCategories" :key="c">
              <button
                :class="{ active: activeICat === c }"
                @click="pickICat(c)"
              >
                <span>{{ c }}</span>
                <span class="count">{{ products.filter((p) => (c === 'All' ? true : p.iCategory === c)).length }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Countries -->
        <div class="side-block">
          <h3>Countries</h3>
          <ul>
            <li>
              <button
                :class="{ active: activeCountry === 'All' }"
                @click="pickCountry('All')"
              >
                <span>All</span>
                <span class="count">{{ products.length }}</span>
              </button>
            </li>
            <li v-for="c in countries" :key="c.name">
              <button
                :class="{ active: activeCountry === c.name }"
                @click="pickCountry(c.name)"
              >
                <span>
                  <span class="flag">{{ c.flag }}</span>
                  {{ c.name }}
                </span>
                <span class="count">{{ products.filter((p) => p.country === c.name).length }}</span>
              </button>
            </li>
          </ul>
        </div>


        <div class="side-block">
          <h3>Brands</h3>
          <div class="brand-grid">
            <button
              v-for="b in brands"
              :key="b"
              :class="{ active: activeBrand === b }"
              @click="pickBrand(b)"
            >
              {{ b }}
            </button>
          </div>
        </div>


        <button class="clear" @click="clearFilters">Clear filters</button>

        <div class="promo">
          <strong>Need help choosing?</strong>
          <span>Chat with our tech experts 24/7</span>
        </div>
      </aside>

      <section class="results">
        <div v-if="filtered.length === 0" class="empty">
          <span class="material-symbols-rounded" aria-hidden="true">inventory_2</span>
          <h3>No products found</h3>
          <p>Try a different search or category.</p>
          <button class="btn primary" @click="clearFilters">Clear filters</button>
        </div>
        <div v-else class="grid">
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 32px 20px 48px;
}
.head {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  padding: 18px 0;
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
.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
}

.price-range input {
  width: 84px;
  border: 0;
  outline: 0;
  font-size: 14px;
}

.price-range .dash {
  color: var(--text-muted);
}

.search-box {

  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 14px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  min-width: 280px;
}
.search-box:focus-within {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.search-box input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 14px;
}
.search-box .material-symbols-rounded {
  font-size: 18px;
  color: var(--text-muted);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
select {
  height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;
}
.side {
  position: sticky;
  top: 120px;
  align-self: start;

  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.side-block h3 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-h);
  margin-bottom: 10px;
}
.side-block ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.side-block button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: transparent;
  border: 0;
  border-radius: 10px;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
  text-align: left;
  transition: background 140ms ease, color 140ms ease;
}
.side-block button span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.side-block button .material-symbols-rounded {
  font-size: 18px;
  color: var(--text-muted);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.side-block button:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.side-block button:hover .material-symbols-rounded {
  color: var(--accent);
}
.side-block button.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
.side-block button.active .material-symbols-rounded {
  color: var(--accent);
}
.count {
  font-size: 12px;
  color: var(--text-muted);
}

.brand-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.brand-grid button {
  width: auto;
  padding: 6px 12px;
  font-size: 12.5px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
}
.brand-grid button.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  font-weight: 600;
}

.clear {
  background: transparent;
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  color: var(--text);
  cursor: pointer;
  transition: color 140ms ease, border-color 140ms ease;
}
.clear:hover {
  color: var(--accent);
  border-color: var(--accent-border);
}

.promo {
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f1d2e 0%, #0b0a14 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.promo strong {
  font-size: 14px;
}
.promo span {
  font-size: 12.5px;
  color: #c8c6d0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.empty {
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: var(--r-lg);
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.empty .material-symbols-rounded {
  font-size: 48px;
  color: var(--accent);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.empty h3 {
  margin: 4px 0;
  color: var(--text-h);
}
.empty p {
  margin: 0 0 12px;
}
.btn {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  cursor: pointer;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .layout {
    grid-template-columns: 220px 1fr;
  }
}
@media (max-width: 720px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .search-box {
    min-width: 0;
    flex: 1;
  }
}
@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>