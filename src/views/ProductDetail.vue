<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const wishlist = useWishlistStore()

const id = computed(() => Number(route.params.id))
const product = computed(() => products.find((p) => p.id === id.value))
const qty = ref(1)
const activeImage = ref(0)
const selectedColor = ref(0)
const tab = ref<'description' | 'specs' | 'reviews'>('description')

const liked = computed(() => (product.value ? wishlist.has(product.value.id) : false))
const fullStars = computed(() => (product.value ? Math.floor(product.value.rating) : 0))
const hasHalf = computed(() => (product.value ? product.value.rating - fullStars.value >= 0.5 : false))
const onSale = computed(() => !!product.value?.oldPrice)
const discount = computed(() => {
  if (!product.value?.oldPrice) return 0
  return Math.round(((product.value.oldPrice - product.value.price) / product.value.oldPrice) * 100)
})

const galleryImages = computed(() => {
  if (!product.value) return []
  const main = product.value.image
  const variants = [main, main, main, main]
  return variants
})

const related = computed(() => {
  if (!product.value) return []
  return products.filter((p) => p.category === product.value!.category && p.id !== product.value!.id).slice(0, 4)
})

const reviews = computed(() => {
  if (!product.value) return []
  const base = [
    {
      name: 'Marcus T.',
      rating: 5,
      date: '2 weeks ago',
      title: 'Absolutely love it',
      body: 'Exceeded my expectations. Build quality, performance, and battery life are all top notch.',
      verified: true,
      avatar: 'https://i.pravatar.cc/150?u=marcus',
    },
    {
      name: 'Sophia L.',
      rating: 5,
      date: '1 month ago',
      title: 'Worth every penny',
      body: 'Fast shipping and great packaging. The product feels premium and works exactly as advertised.',
      verified: true,
      avatar: 'https://i.pravatar.cc/150?u=sophia',
    },
    {
      name: 'Daniel K.',
      rating: 4,
      date: '1 month ago',
      title: 'Solid, with one small note',
      body: 'Performance is excellent. Only wish the included cable was a bit longer.',
      verified: true,
      avatar: 'https://i.pravatar.cc/150?u=daniel',
    },
  ]
  return base
})

function add() {
  if (!product.value) return
  cart.add({ id: product.value.id, name: product.value.name, price: product.value.price, image: product.value.image }, qty.value)
}
function buy() {
  add()
  router.push('/cart')
}
function toggleWish() {
  if (!product.value) return
  wishlist.toggle({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    rating: product.value.rating,
  })
}
</script>

<template>
  <div v-if="!product" class="empty container">
    <h2>Product not found</h2>
    <RouterLink to="/products" class="btn primary">Back to shop</RouterLink>
  </div>

  <div v-else class="page container">
    <nav class="crumbs">
      <RouterLink to="/">Home</RouterLink>
      <span>/</span>
      <RouterLink to="/products">Shop</RouterLink>
      <span>/</span>
      <RouterLink :to="`/products?cat=${product.category}`">{{ product.category }}</RouterLink>
      <span>/</span>
      <span class="here">{{ product.name }}</span>
    </nav>

    <div class="layout">
      <div class="gallery">
        <div class="main">
          <img :src="galleryImages[activeImage]" :alt="product.name" />
          <div class="badges">
            <span v-if="product.isNew" class="chip new">New</span>
            <span v-if="onSale" class="chip sale">−{{ discount }}%</span>
          </div>
        </div>
        <div class="thumbs">
          <button
            v-for="(img, i) in galleryImages"
            :key="i"
            class="thumb"
            :class="{ active: i === activeImage }"
            @click="activeImage = i"
            :aria-label="`Image ${i + 1}`"
          >
            <img :src="img" :alt="product.name" />
          </button>
        </div>
      </div>

      <div class="info">
        <div class="meta-row">
          <span class="brand">{{ product.brand }}</span>
          <span class="cat">{{ product.category }}</span>
        </div>
        <h1>{{ product.name }}</h1>
        <p class="short">{{ product.shortDescription }}</p>

        <div class="rating">
          <span class="stars" :aria-label="`Rated ${product.rating} out of 5`">
            <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= fullStars, half: i === fullStars + 1 && hasHalf }">★</span>
          </span>
          <span class="rate">{{ product.rating.toFixed(1) }}</span>
          <span class="rev">· {{ product.reviews }} reviews</span>
        </div>

        <div class="price-row">
          <span class="now">${{ product.price.toFixed(2) }}</span>
          <span v-if="onSale" class="old">${{ product.oldPrice!.toFixed(2) }}</span>
          <span v-if="onSale" class="off">Save ${{ (product.oldPrice! - product.price).toFixed(0) }}</span>
        </div>

        <div class="stock" :class="{ low: product.stock < 10, out: product.stock === 0 }">
          <span class="dot"></span>
          <span v-if="product.stock === 0">Out of stock</span>
          <span v-else-if="product.stock < 10">Only {{ product.stock }} left in stock — order soon</span>
          <span v-else>In stock · Ships in 1–2 business days</span>
        </div>

        <div v-if="product.colors && product.colors.length" class="opts">
          <div class="opt-head">
            <span>Color</span>
            <strong>{{ product.colors[selectedColor] }}</strong>
          </div>
          <div class="colors">
            <button
              v-for="(c, i) in product.colors"
              :key="c"
              class="color"
              :class="{ active: i === selectedColor }"
              :aria-label="c"
              @click="selectedColor = i"
            >
              <span class="color-dot" :data-c="c"></span>
              <span class="color-name">{{ c }}</span>
            </button>
          </div>
        </div>

        <div v-if="product.highlights && product.highlights.length" class="highlights">
          <h4>Highlights</h4>
          <ul>
            <li v-for="h in product.highlights" :key="h">
              <span class="material-symbols-rounded" aria-hidden="true">check_circle</span>
              {{ h }}
            </li>
          </ul>
        </div>

        <div class="actions">
          <div class="qty">
            <button @click="qty = Math.max(1, qty - 1)" aria-label="Decrease">−</button>
            <input v-model.number="qty" type="number" min="1" />
            <button @click="qty++" aria-label="Increase">+</button>
          </div>
          <button class="btn primary lg" @click="add" :disabled="product.stock === 0">
            <span class="material-symbols-rounded" aria-hidden="true">add_shopping_cart</span> Add to cart
          </button>
          <button
            class="btn ghost lg"
            :class="{ active: liked }"
            @click="toggleWish"
            :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
          >
            <span class="material-symbols-rounded" aria-hidden="true">
              {{ liked ? 'favorite' : 'favorite_border' }}
            </span>
            {{ liked ? 'Saved' : 'Save' }}
          </button>
        </div>

        <button class="btn buy" @click="buy" :disabled="product.stock === 0">Buy now · ${{ (product.price * qty).toFixed(2) }}</button>

        <ul class="meta">
          <li><span class="material-symbols-rounded" aria-hidden="true">local_shipping</span> Free express shipping over $199</li>
          <li><span class="material-symbols-rounded" aria-hidden="true">undo</span> Free 30-day returns</li>
          <li><span class="material-symbols-rounded" aria-hidden="true">verified</span> Official manufacturer warranty</li>
        </ul>
      </div>
    </div>

    <!-- TABS -->
    <section class="tabs">
      <div class="tab-heads">
        <button :class="{ active: tab === 'description' }" @click="tab = 'description'">Description</button>
        <button :class="{ active: tab === 'specs' }" @click="tab = 'specs'">Specifications</button>
        <button :class="{ active: tab === 'reviews' }" @click="tab = 'reviews'">Reviews ({{ product.reviews }})</button>
      </div>

      <div class="tab-body">
        <div v-if="tab === 'description'" class="prose">
          <p>{{ product.description }}</p>
        </div>

        <div v-else-if="tab === 'specs'" class="specs">
          <div class="spec-row"><span>Brand</span><strong>{{ product.brand }}</strong></div>
          <div class="spec-row"><span>Category</span><strong>{{ product.category }}</strong></div>
          <div class="spec-row"><span>Stock</span><strong>{{ product.stock }} units</strong></div>
          <div class="spec-row"><span>Rating</span><strong>{{ product.rating }} / 5</strong></div>
          <div class="spec-row"><span>SKU</span><strong>SM-{{ String(product.id).padStart(5, '0') }}</strong></div>
          <div v-if="product.highlights" class="spec-row">
            <span>Key features</span>
            <strong>{{ product.highlights.join(' · ') }}</strong>
          </div>
        </div>

        <div v-else class="reviews">
          <div class="review-summary">
            <div class="big">
              <strong>{{ product.rating.toFixed(1) }}</strong>
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= fullStars, half: i === fullStars + 1 && hasHalf }">★</span>
              </div>
              <span class="based">Based on {{ product.reviews }} reviews</span>
            </div>
            <div class="bars">
              <div v-for="(p, idx) in [78, 14, 5, 2, 1]" :key="idx" class="bar">
                <span class="lbl">{{ 5 - idx }} stars</span>
                <span class="track"><span class="fill" :style="{ width: p + '%' }"></span></span>
                <span class="pct">{{ p }}%</span>
              </div>
            </div>
          </div>

          <ul class="review-list">
            <li v-for="r in reviews" :key="r.name">
              <img :src="r.avatar" :alt="r.name" />
              <div class="rbody">
                <div class="rhead">
                  <strong>{{ r.name }}</strong>
                  <span v-if="r.verified" class="v">
                    <span class="material-symbols-rounded" aria-hidden="true">verified</span> Verified buyer
                  </span>
                  <span class="rdate">{{ r.date }}</span>
                </div>
                <div class="rstars">
                  <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= r.rating }">★</span>
                </div>
                <h4>{{ r.title }}</h4>
                <p>{{ r.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- RELATED -->
    <section v-if="related.length" class="related">
      <div class="section-head">
        <div>
          <span class="kicker">You may also like</span>
          <h2>Similar products</h2>
        </div>
        <RouterLink :to="`/products?cat=${product.category}`" class="link">View all <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span></RouterLink>
      </div>
      <div class="grid">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: 24px 20px 48px;
}
.empty {
  text-align: center;
  padding: 80px 20px;
}
.empty .btn {
  display: inline-flex;
  margin-top: 14px;
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.crumbs a {
  color: var(--text-muted);
  text-decoration: none;
}
.crumbs a:hover {
  color: var(--accent);
}
.crumbs .here {
  color: var(--text-h);
  font-weight: 500;
}

.layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  align-items: start;
}
.gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.main {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: var(--r-xl);
  overflow: hidden;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  box-shadow: var(--shadow);
}
.main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.badges {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 6px;
}
.chip {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.chip.new {
  background: #ecfeff;
  color: #0e7490;
}
.chip.sale {
  background: var(--danger-soft);
  color: var(--danger);
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.thumb {
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f3ff;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: border-color 160ms ease, transform 160ms ease;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
}
.thumb.active {
  border-color: var(--accent);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 5px 10px;
  border-radius: 999px;
}
.cat {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.info h1 {
  font-size: 32px;
  margin: 0;
  line-height: 1.15;
}
.short {
  font-size: 15.5px;
  color: var(--text);
  line-height: 1.5;
  margin: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-muted);
}
.stars {
  display: inline-flex;
  color: #d1d5db;
  letter-spacing: 1px;
}
.star.on {
  color: #f59e0b;
}
.star.half {
  background: linear-gradient(90deg, #f59e0b 50%, #d1d5db 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rate {
  font-weight: 600;
  color: var(--text-h);
}
.rev {
  font-size: 13px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.now {
  font-size: 30px;
  font-weight: 700;
  color: var(--text-h);
}
.old {
  color: var(--text-muted);
  text-decoration: line-through;
  font-size: 16px;
}
.off {
  background: var(--danger-soft);
  color: var(--danger);
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.stock {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: var(--text);
  padding: 8px 12px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 10px;
  width: max-content;
}
.stock .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
}
.stock.low {
  background: rgba(245, 158, 11, 0.1);
}
.stock.low .dot {
  background: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18);
}
.stock.out {
  background: var(--danger-soft);
  color: var(--danger);
}
.stock.out .dot {
  background: var(--danger);
  box-shadow: 0 0 0 4px var(--danger-soft);
}

.opts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
}
.opt-head {
  display: flex;
  gap: 10px;
  align-items: baseline;
  font-size: 13.5px;
}
.opt-head span {
  color: var(--text-muted);
}
.opt-head strong {
  color: var(--text-h);
}
.colors {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.color {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px 6px 6px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 999px;
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;
  font-size: 13px;
  color: var(--text);
}
.color:hover {
  border-color: var(--accent-border);
}
.color.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
.color-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #c4b5fd 0%, #7c3aed 100%);
}

.highlights {
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  border-radius: 14px;
  padding: 16px;
}
.highlights h4 {
  color: var(--text-h);
  font-size: 14px;
  margin-bottom: 10px;
}
.highlights ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  font-size: 13.5px;
  color: var(--text-h);
}
.highlights li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.highlights .material-symbols-rounded {
  color: var(--accent);
  font-size: 18px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6px;
}
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.qty button {
  width: 42px;
  height: 48px;
  background: transparent;
  border: 0;
  font-size: 18px;
  color: var(--text-h);
  cursor: pointer;
  transition: background 140ms ease;
}
.qty button:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.qty input {
  width: 48px;
  height: 48px;
  border: 0;
  outline: 0;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-h);
  background: transparent;
  -moz-appearance: textfield;
}
.qty input::-webkit-outer-spin-button,
.qty input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
  cursor: pointer;
  background: transparent;
}
.btn.lg {
  height: 48px;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-1px);
}
.btn.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.btn.ghost {
  background: #fff;
  color: var(--text-h);
  border-color: var(--border);
}
.btn.ghost:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-soft);
}
.btn.ghost.active {
  color: var(--danger);
  border-color: var(--danger-border);
  background: var(--danger-soft);
}
.btn.buy {
  background: #0b0a14;
  color: #fff;
  width: 100%;
  justify-content: center;
}
.btn.buy:hover {
  background: #1f1d2e;
}
.btn.buy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn .material-symbols-rounded {
  font-size: 18px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.btn.ghost.active .material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.meta {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  color: var(--text);
  font-size: 13.5px;
}
.meta li {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.meta .material-symbols-rounded {
  color: var(--accent);
  font-size: 18px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* TABS */
.tabs {
  margin-top: 48px;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
}
.tab-heads {
  display: flex;
  border-bottom: 1px solid var(--border-soft);
  overflow-x: auto;
}
.tab-heads button {
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  padding: 16px 20px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 160ms ease, border-color 160ms ease;
}
.tab-heads button:hover {
  color: var(--text-h);
}
.tab-heads button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.tab-body {
  padding: 24px;
}
.prose {
  color: var(--text);
  font-size: 15px;
  line-height: 1.7;
  max-width: 760px;
}

.specs {
  display: grid;
  gap: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-soft);
}
.spec-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  padding: 14px 18px;
  background: #fff;
  border-bottom: 1px solid var(--border-soft);
}
.spec-row:nth-child(odd) {
  background: rgba(124, 58, 237, 0.03);
}
.spec-row span {
  color: var(--text-muted);
  font-size: 13.5px;
}
.spec-row strong {
  color: var(--text-h);
  font-size: 14px;
  font-weight: 600;
}

.reviews {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.review-summary {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  background: linear-gradient(135deg, #1f1d2e 0%, #0b0a14 100%);
  color: #fff;
  padding: 24px;
  border-radius: var(--r-lg);
}
.big {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}
.big strong {
  font-size: 56px;
  line-height: 1;
  color: #fff;
}
.big .stars {
  font-size: 20px;
  color: #fbbf24;
}
.based {
  color: #c8c6d0;
  font-size: 12.5px;
}
.bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}
.bar {
  display: grid;
  grid-template-columns: 60px 1fr 40px;
  gap: 10px;
  align-items: center;
  font-size: 12.5px;
  color: #c8c6d0;
}
.track {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}
.fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%);
  border-radius: 999px;
}
.pct {
  text-align: right;
  font-weight: 600;
  color: #fff;
}

.review-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.review-list li {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-md);
}
.review-list img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.rbody {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rhead {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.rhead strong {
  color: var(--text-h);
  font-size: 14px;
}
.v {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  background: var(--accent-soft);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}
.v .material-symbols-rounded {
  font-size: 14px;
  font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24;
}
.rdate {
  color: var(--text-muted);
  font-size: 12.5px;
  margin-left: auto;
}
.rstars {
  color: #f59e0b;
  letter-spacing: 1px;
}
.rbody h4 {
  color: var(--text-h);
  font-size: 15px;
  margin: 2px 0;
}
.rbody p {
  color: var(--text);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* RELATED */
.related {
  margin-top: 56px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 18px;
  gap: 16px;
  flex-wrap: wrap;
}
.kicker {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 6px 12px;
  border-radius: 999px;
}
.section-head h2 {
  margin: 6px 0 0;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
.link .material-symbols-rounded {
  font-size: 16px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .info h1 {
    font-size: 24px;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .spec-row {
    grid-template-columns: 130px 1fr;
  }
  .review-summary {
    grid-template-columns: 1fr;
  }
  .highlights ul {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
  .qty {
    align-self: flex-start;
  }
  .thumbs {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>