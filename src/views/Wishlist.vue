<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlist = useWishlistStore()
const cart = useCartStore()

function moveToCart(item: { id: number; name: string; price: number; image: string }) {
  cart.add({ id: item.id, name: item.name, price: item.price, image: item.image }, 1)
  wishlist.remove(item.id)
}
</script>

<template>
  <div class="page container">
    <header class="head">
      <div>
        <h1>Your wishlist</h1>
        <p class="muted">{{ wishlist.count }} saved item{{ wishlist.count === 1 ? '' : 's' }}</p>
      </div>
      <RouterLink to="/products" class="btn ghost">
        <span class="micon">arrow_back</span> Continue shopping
      </RouterLink>
    </header>

    <div v-if="wishlist.count === 0" class="empty">
      <span class="micon">favorite_border</span>
      <h2>Nothing saved yet</h2>
      <p>Tap the heart on any product to save it for later.</p>
        <RouterLink to="/products" class="btn primary">Discover skincare</RouterLink>
    </div>

    <div v-else class="grid">
      <div v-for="item in wishlist.items" :key="item.id" class="card">
        <div class="media">
          <RouterLink :to="`/products/${item.id}`">
            <img :src="item.image" :alt="item.name" />
          </RouterLink>
          <button class="remove" @click="wishlist.remove(item.id)" aria-label="Remove from wishlist">
            <span class="micon">close</span>
          </button>
        </div>
        <div class="body">
          <RouterLink :to="`/products/${item.id}`" class="name">{{ item.name }}</RouterLink>
          <div class="rating">
            <span class="star">★</span>
            <span class="rate">{{ item.rating.toFixed(1) }}</span>
          </div>
          <div class="row">
            <span class="price">${{ item.price.toFixed(2) }}</span>
            <button class="btn primary sm" @click="moveToCart(item)">
              <span class="micon">shopping_cart</span> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
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
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
  cursor: pointer;
}
.btn.sm {
  height: 38px;
  padding: 0 14px;
  font-size: 13px;
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
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-1px);
}
.micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 18px;
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
  font-size: 56px;
  color: var(--accent);
  background: var(--accent-soft);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 6px;
}
.empty h2 {
  margin: 0;
}
.empty p {
  color: var(--text-muted);
  margin: 0 0 12px;
}
.empty .btn {
  display: inline-flex;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
.media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.remove {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--border-soft);
  color: var(--text);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: color 160ms ease, background 160ms ease;
}
.remove:hover {
  color: var(--danger);
  background: var(--danger-soft);
}
.remove .micon {
  font-size: 18px;
}

.body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.name {
  text-decoration: none;
  color: var(--text-h);
  font-weight: 600;
  font-size: 14.5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 38px;
}
.name:hover {
  color: var(--accent);
}
.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-size: 13px;
}
.star {
  color: #f59e0b;
}
.rate {
  font-weight: 600;
  color: var(--text-h);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
}
.price {
  font-weight: 700;
  color: var(--text-h);
  font-size: 17px;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 460px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>