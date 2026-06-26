<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore, type OrderStatus } from '@/stores/orders'

const cart = useCartStore()
const router = useRouter()
const auth = useAuthStore()
const ordersStore = useOrdersStore()

const form = reactive({ name: '', phone: '', address: '', city: '', zip: '', payment: 'card' })
const errors = reactive<Record<string, string>>({})
const placing = ref(false)
const placed = ref(false)
const orderId = ref('')


const shipping = computed(() => (cart.subtotal >= 75 ? 0 : 9.99))
const total = computed(() => cart.subtotal + shipping.value)

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.name.trim() || form.name.trim().length < 3) errors.name = 'Please enter your full name'
  if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number'
  if (!form.address.trim()) errors.address = 'Address is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!/^[A-Za-z0-9\- ]{3,}$/.test(form.zip.trim())) errors.zip = 'Enter a valid ZIP / postal code'
  return Object.keys(errors).length === 0
}

function placeOrder() {
  if (cart.count === 0) return
  if (!validate()) return

  placing.value = true
  setTimeout(() => {
    orderId.value = 'SM-' + Math.floor(100000 + Math.random() * 900000).toString()

    const status: OrderStatus = 'Processing'
    const ownerKey = auth.user?.email ?? 'guest@local'

    ordersStore.addOrder({
        id: orderId.value,
        date: new Date().toISOString(),
        status,
        total: total.value,
        items: cart.items.map((it) => ({
          name: it.name,
          qty: it.quantity,
          price: it.price,
          image: it.image,
        })),
        ownerKey,
      })


    placed.value = true
    cart.clear()
    placing.value = false
  }, 700)
}


function goOrders() {
  router.push('/orders')
}
function goShop() {
  router.push('/products')
}
</script>

<template>
  <div class="page container">
    <header class="head">
      <h1>Checkout</h1>
      <p class="muted">Almost there. Review your details and place your order.</p>
    </header>

    <!-- Success -->
    <div v-if="placed" class="success">
      <div class="check">
        <span class="micon">check</span>
      </div>
      <h2>Order placed!</h2>
      <p>Your order <strong>#{{ orderId }}</strong> has been placed successfully.</p>
      <div class="actions">
        <button class="btn primary" @click="goOrders">View my orders</button>
        <button class="btn ghost" @click="goShop">Continue shopping</button>
      </div>
    </div>

    <div v-else-if="cart.count === 0" class="empty">
      <span class="micon">shopping_bag</span>
      <h2>Your cart is empty</h2>
      <p>Add a product before checkout.</p>
      <RouterLink to="/products" class="btn primary">Browse products</RouterLink>
    </div>

    <div v-else class="layout">
      <section class="form">
        <h3>Shipping details</h3>
        <div class="grid2">
          <label class="field" :class="{ invalid: errors.name }">
            <span>Full name</span>
            <input v-model="form.name" type="text" placeholder="Alex Carter" />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>
          <label class="field" :class="{ invalid: errors.phone }">
            <span>Phone number</span>
            <input v-model="form.phone" type="tel" placeholder="+1 555 000 1234" />
            <small v-if="errors.phone">{{ errors.phone }}</small>
          </label>
        </div>
        <label class="field" :class="{ invalid: errors.address }">
          <span>Address</span>
          <input v-model="form.address" type="text" placeholder="123 Market Street, Apt 4B" />
          <small v-if="errors.address">{{ errors.address }}</small>
        </label>
        <div class="grid2">
          <label class="field" :class="{ invalid: errors.city }">
            <span>City</span>
            <input v-model="form.city" type="text" placeholder="San Francisco" />
            <small v-if="errors.city">{{ errors.city }}</small>
          </label>
          <label class="field" :class="{ invalid: errors.zip }">
            <span>ZIP / Postal</span>
            <input v-model="form.zip" type="text" placeholder="94103" />
            <small v-if="errors.zip">{{ errors.zip }}</small>
          </label>
        </div>

        <h3>Payment method</h3>
        <div class="pay">
          <label class="pay-opt" :class="{ active: form.payment === 'card' }">
            <input v-model="form.payment" type="radio" value="card" />
            <span class="micon">credit_card</span>
            <div>
              <strong>Credit / debit card</strong>
              <span>Visa, Mastercard, Amex</span>
            </div>
          </label>
          <label class="pay-opt" :class="{ active: form.payment === 'paypal' }">
            <input v-model="form.payment" type="radio" value="paypal" />
            <span class="micon">account_balance</span>
            <div>
              <strong>PayPal</strong>
              <span>Pay securely with PayPal</span>
            </div>
          </label>
          <label class="pay-opt" :class="{ active: form.payment === 'cod' }">
            <input v-model="form.payment" type="radio" value="cod" />
            <span class="micon">local_shipping</span>
            <div>
              <strong>Cash on delivery</strong>
              <span>Pay when your order arrives</span>
            </div>
          </label>
        </div>
      </section>

      <aside class="summary">
        <h3>Order summary</h3>
        <ul class="items">
          <li v-for="item in cart.items" :key="item.id">
            <img :src="item.image" :alt="item.name" />
            <div class="meta">
              <strong>{{ item.name }}</strong>
              <span>Qty {{ item.quantity }}</span>
            </div>
            <span class="price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>

        <div class="line-row"><span>Subtotal</span><span>${{ cart.subtotal.toFixed(2) }}</span></div>
        <div class="line-row">
          <span>Shipping</span>
          <span>{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
        </div>
        <div class="line-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <button class="btn primary lg" :disabled="placing" @click="placeOrder">
          <span v-if="!placing">Place order</span>
          <span v-else class="spin"></span>
        </button>

        <p class="note">By placing your order, you agree to our Terms and Privacy Policy.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 32px 20px 48px;
}
.head {
  margin-bottom: 24px;
}
.muted {
  color: var(--text-muted);
  font-size: 14px;
  margin-top: 6px;
}

.empty {
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: var(--r-xl);
  padding: 60px 20px;
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
}
.empty .btn {
  display: inline-flex;
  margin-top: 10px;
}

.success {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-xl);
  padding: 60px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.success .check {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  margin-bottom: 8px;
}
.success .check .micon {
  font-size: 36px;
  font-family: 'Material Symbols Rounded', 'Material Icons';
}
.success h2 {
  margin: 0;
}
.success p {
  color: var(--text);
}
.success .actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  align-items: start;
}

.form,
.summary {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 24px;
}
.summary {
  position: sticky;
  top: 88px;
}

.form h3,
.summary h3 {
  margin-bottom: 14px;
}
.form h3:not(:first-child) {
  margin-top: 24px;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.field {
  display: block;
  margin-bottom: 14px;
}
.field > span {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 6px;
}
.field input {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 14.5px;
  color: var(--text-h);
  outline: 0;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.field input:focus {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.field.invalid input {
  border-color: var(--danger);
  box-shadow: 0 0 0 4px var(--danger-soft);
}
.field small {
  display: block;
  color: var(--danger);
  font-size: 12.5px;
  margin-top: 6px;
}

.pay {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pay-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 160ms ease, background 160ms ease;
}
.pay-opt:hover {
  border-color: var(--accent-border);
}
.pay-opt.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.pay-opt input {
  accent-color: var(--accent);
}
.pay-opt .micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 22px;
  color: var(--accent);
}
.pay-opt div {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.pay-opt strong {
  color: var(--text-h);
  font-size: 14.5px;
}
.pay-opt span {
  color: var(--text-muted);
  font-size: 12.5px;
}

.items {
  list-style: none;
  margin: 0 0 12px;
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
.items .meta {
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
.items .meta span {
  color: var(--text-muted);
  font-size: 12px;
}
.items .price {
  font-weight: 600;
  color: var(--text-h);
  font-size: 13.5px;
}

.line-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  color: var(--text);
  font-size: 14px;
}
.line-row.total {
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--border-soft);
  font-size: 17px;
  font-weight: 700;
  color: var(--text-h);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: transform 160ms ease, background 160ms ease, color 160ms ease, opacity 160ms ease, box-shadow 160ms ease;
}
.btn.lg {
  height: 50px;
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  border-radius: 14px;
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
  opacity: 0.7;
  cursor: not-allowed;
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
.spin {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.note {
  margin: 12px 0 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 12.5px;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .summary {
    position: static;
  }
  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>