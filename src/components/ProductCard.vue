<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/data/products'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()
const wishlist = useWishlistStore()

const liked = computed(() => wishlist.has(props.product.id))
const fullStars = computed(() => Math.floor(props.product.rating))
const hasHalf = computed(() => props.product.rating - fullStars.value >= 0.5)
const onSale = computed(() => !!props.product.oldPrice)
const discount = computed(() => {
  if (!props.product.oldPrice) return 0
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100)
})

function add() {
  cart.add(
    {
      id: props.product.id,
      name: props.product.name,
      price: props.product.price,
      image: props.product.image,
    },
    1,
  )
}

function toggleWish() {
  wishlist.toggle({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    rating: props.product.rating,
  })
}
</script>

<template>
  <article class="card">
    <div class="media">
      <RouterLink :to="`/products/${product.id}`" class="media-link" aria-label="View product">
        <img :src="product.image" :alt="product.name" loading="lazy" />
      </RouterLink>

      <div class="badges">
        <span v-if="product.isNew" class="chip new">New</span>
        <span v-if="onSale" class="chip sale">−{{ discount }}%</span>
      </div>

      <button
        class="wish"
        :class="{ active: liked }"
        :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
        @click="toggleWish"
      >
        <span class="material-symbols-rounded" aria-hidden="true">
          {{ liked ? 'favorite' : 'favorite_border' }}
        </span>
      </button>
    </div>

    <div class="body">
      <div class="meta">
        <span v-if="product.iCategory" class="chip outline cat">
          {{ product.iCategory }}
        </span>
        <span v-if="product.country" class="chip outline country">
          <span class="flag">{{ product.flag ?? '' }}</span>
          {{ product.country }}
        </span>
      </div>

      <div class="made" v-if="product.country">
        Made in <strong>{{ product.country }}</strong>
      </div>

      <div class="cultural" v-if="product.culturalTags?.length">
        <span
          v-for="t in product.culturalTags"
          :key="t"
          class="chip cultural"
          :class="t.toLowerCase()"
        >
          {{ t }}
        </span>
      </div>

      <RouterLink :to="`/products/${product.id}`" class="name">
        {{ product.name }}
      </RouterLink>

      <div v-if="product.brand" class="brand">{{ product.brand }}</div>

      <div class="rating" aria-label="Rating">
        <span class="stars">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ on: i <= fullStars, half: i === fullStars + 1 && hasHalf }"
            aria-hidden="true"
          >★</span>
        </span>
        <span class="rate">{{ product.rating.toFixed(1) }}</span>
      </div>

      <div class="stock" :class="{ out: product.stock <= 0 }">
        <span class="material-symbols-rounded" aria-hidden="true">
          {{ product.stock > 0 ? 'check_circle' : 'cancel' }}
        </span>
        {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
      </div>

      <div class="ship" v-if="product.shippingType">
        <span class="material-symbols-rounded" aria-hidden="true">local_shipping</span>
        {{ product.shippingType }} shipping
      </div>

      <div class="row">
        <div class="price">
          <span class="now">${{ product.price.toFixed(2) }}</span>
          <span v-if="onSale" class="old">${{ product.oldPrice!.toFixed(2) }}</span>
        </div>

        <div class="actions">
          <button class="add" @click="add" aria-label="Add to cart">
            <span class="material-symbols-rounded" aria-hidden="true">add_shopping_cart</span>
          </button>
        </div>
      </div>

      <button
        class="wishlist-btn"
        :class="{ active: liked }"
        :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
        @click="toggleWish"
      >
        <span class="material-symbols-rounded" aria-hidden="true">
          {{ liked ? 'favorite' : 'favorite_border' }}
        </span>
        {{ liked ? 'Wishlisted' : 'Wishlist' }}
      </button>
    </div>
  </article>
</template>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  height: 100%;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--accent-border);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.chip.outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.chip .flag {
  margin-right: 6px;
}

.made {
  font-size: 12.5px;
  color: var(--text-muted);
}

.stock {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.stock.out {
  color: var(--danger);
}

.ship {
  font-size: 12.5px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.actions {
  display: flex;
  align-items: center;
}

.wishlist-btn {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}
.wishlist-btn:hover {
  transform: translateY(-1px);
  border-color: var(--accent-border);
  background: var(--accent-soft);
}
.wishlist-btn.active {
  background: var(--danger-soft);
  border-color: var(--danger-border);
  color: var(--danger);
}
.wishlist-btn .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.wishlist-btn.active .material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}


.media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: linear-gradient(135deg, #F5EBDD 0%, #e8e0d5 100%);
  overflow: hidden;
}
.media-link {
  display: block;
  width: 100%;
  height: 100%;
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}
.card:hover .media img {
  transform: scale(1.06);
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.chip {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
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

.chip.cultural {
  background: var(--accent-soft);
  color: var(--accent);
}

.chip.cultural.local {
  background: rgba(34, 197, 94, 0.14);
  color: #22c55e;
}

.chip.cultural.imported {
  background: rgba(59, 130, 246, 0.14);
  color: #3b82f6;
}

.chip.cultural.handmade {
  background: rgba(245, 158, 11, 0.14);
  color: #f59e0b;
}

.chip.cultural.premium {
  background: rgba(236, 72, 153, 0.14);
  color: #ec4899;
}


.wish {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border-soft);
  cursor: pointer;
  color: var(--text-muted);
  transition: color 160ms ease, background 160ms ease, transform 160ms ease;
}
.wish:hover {
  color: var(--danger);
  transform: scale(1.05);
}
.wish.active {
  color: var(--danger);
  background: var(--danger-soft);
  border-color: var(--danger-border);
}
.wish .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.wish.active .material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 auto;
}
.brand {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-h);
  font-weight: 600;
  font-size: 15px;
  line-height: 1.35;
  min-height: 41px;
}
.name:hover {
  color: var(--accent);
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
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

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
}
.price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.now {
  color: var(--text-h);
  font-weight: 700;
  font-size: 18px;
}
.old {
  color: var(--text-muted);
  font-size: 13px;
  text-decoration: line-through;
}
.add {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  border: 0;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-accent);
  transition: transform 160ms ease;
}
.add:hover {
  transform: scale(1.06);
}
.add .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>