<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const total = computed(() => cart.subtotal + (cart.items.length === 0 ? 0 : cart.subtotal >= 50 ? 0 : 9.99))
const shipping = computed(() => (cart.items.length === 0 ? 0 : cart.subtotal >= 50 ? 0 : 9.99))

function checkout() {
  if (cart.count === 0) return
  router.push('/checkout')
}
</script>

<template>
  <div class="page container">
    <header class="head">
      <div>
        <h1>Your cart</h1>
        <p class="muted">{{ cart.count }} item{{ cart.count === 1 ? '' : 's' }} in your cart</p>
      </div>
      <RouterLink to="/products" class="btn ghost">
        <span class="micon">arrow_back</span> Continue shopping
      </RouterLink>
    </header>

    <div v-if="cart.count === 0" class="empty">
      <span class="micon">shopping_bag</span>
      <h2>Your cart is empty</h2>
      <p>Add a product to start your order.</p>
          <RouterLink to="/products" class="btn primary">Browse skincare</RouterLink>
    </div>

    <div v-else class="layout">
      <section class="items">
        <div v-for="item in cart.items" :key="item.id" class="row-item">
          <RouterLink :to="`/products/${item.id}`" class="thumb">
            <img :src="item.image" :alt="item.name" />
          </RouterLink>
          <div class="info">
            <RouterLink :to="`/products/${item.id}`" class="name">{{ item.name }}</RouterLink>
            <span class="muted">In stock · Ships in 1–2 days</span>
          </div>
          <div class="qty">
            <button @click="cart.decrement(item.id)" aria-label="Decrease">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="cart.increment(item.id)" aria-label="Increase">+</button>
          </div>
          <div class="line">
            ${{ (item.price * item.quantity).toFixed(2) }}
            <span class="muted">${{ item.price.toFixed(2) }} each</span>
          </div>
          <button class="remove" @click="cart.remove(item.id)" aria-label="Remove">
            <span class="micon">delete</span>
          </button>
        </div>
      </section>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="line-row">
          <span>Subtotal</span>
          <span>${{ cart.subtotal.toFixed(2) }}</span>
        </div>
        <div class="line-row">
          <span>Shipping</span>
          <span>{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
        </div>
        <div class="line-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <button class="btn primary lg" @click="checkout">
          Proceed to checkout <span class="micon">arrow_forward</span>
        </button>

<ul class="meta">
           <li><span class="micon">local_shipping</span> Free shipping over $50</li>
           <li><span class="micon">undo</span> 30-day returns</li>
           <li><span class="micon">verified_user</span> Dermatologist-tested</li>
         </ul>
      </aside>
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
  font-size: 13px;
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
.btn.lg {
  height: 50px;
  padding: 0 22px;
  font-size: 15px;
  border-radius: 14px;
  width: 100%;
  justify-content: center;
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

.layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

.items {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  overflow: hidden;
}
.row-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto 40px;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid var(--border-soft);
}
.row-item:last-child {
  border-bottom: 0;
}
.thumb {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.name {
  text-decoration: none;
  color: var(--text-h);
  font-weight: 600;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.name:hover {
  color: var(--accent);
}

.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.qty button {
  width: 34px;
  height: 36px;
  background: transparent;
  border: 0;
  font-size: 16px;
  color: var(--text-h);
  cursor: pointer;
}
.qty button:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.qty span {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
  color: var(--text-h);
  font-size: 14px;
}

.line {
  display: flex;
  flex-direction: column;
  align-items: end;
  font-weight: 700;
  color: var(--text-h);
  font-size: 15px;
}
.line .muted {
  font-weight: 400;
  font-size: 12px;
}

.remove {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: color 140ms ease, background 140ms ease, border-color 140ms ease;
}
.remove:hover {
  color: var(--danger);
  background: var(--danger-soft);
  border-color: var(--danger-border);
}
.remove .micon {
  font-size: 18px;
}

.summary {
  position: sticky;
  top: 88px;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 20px;
}
.summary h3 {
  margin-bottom: 14px;
}
.line-row {
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  color: var(--text);
  padding: 8px 0;
}
.line-row.total {
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--border-soft);
  font-size: 17px;
  font-weight: 700;
  color: var(--text-h);
}
.meta {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.meta li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.meta .micon {
  color: var(--accent);
  font-size: 18px;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .summary {
    position: static;
  }
  .row-item {
    grid-template-columns: 80px 1fr auto;
    grid-template-areas:
      'thumb info info'
      'thumb qty line'
      'thumb remove remove';
    gap: 10px 14px;
  }
  .thumb {
    grid-area: thumb;
    width: 80px;
    height: 80px;
  }
  .info {
    grid-area: info;
  }
  .qty {
    grid-area: qty;
  }
  .line {
    grid-area: line;
    align-items: end;
  }
  .remove {
    grid-area: remove;
    width: 100%;
  }
}
</style>