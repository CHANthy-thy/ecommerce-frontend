<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="brand-col">
        <div class="brand">
          <span class="brand-mark">SM</span>
          <span class="brand-name">ShopMart</span>
        </div>
        <p class="tagline">Curated essentials for modern living. Free shipping on orders over $75.</p>
        <div class="socials">
          <a href="#" aria-label="Twitter" class="sicon">𝕏</a>
          <a href="#" aria-label="Instagram" class="sicon">◎</a>
          <a href="#" aria-label="Facebook" class="sicon">f</a>
        </div>
      </div>

      <div class="col">
        <h4>Shop</h4>
        <RouterLink to="/products">All products</RouterLink>
        <RouterLink to="/products?cat=Electronics">Electronics</RouterLink>
        <RouterLink to="/products?cat=Fashion">Fashion</RouterLink>
        <RouterLink to="/products?cat=Home">Home</RouterLink>
      </div>

      <div class="col">
        <h4>Account</h4>
        <RouterLink to="/profile">My profile</RouterLink>
        <RouterLink to="/orders">Orders</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
      </div>

      <div class="col">
        <h4>Stay in the loop</h4>
        <p class="muted">Get drops, restocks and 10% off your first order.</p>
        <form class="news" @submit.prevent>
          <input type="email" placeholder="you@email.com" aria-label="Email" />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>

    <div class="copy">
      <div class="container row">
        <span>© {{ year }} ShopMart. All rights reserved.</span>
        <span class="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 60px;
  background: #0b0a14;
  color: #c8c6d0;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 32px;
  padding: 56px 20px 32px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  margin-bottom: 12px;
}
.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  letter-spacing: 0.04em;
}
.brand-name {
  font-weight: 700;
  font-size: 18px;
}
.tagline {
  font-size: 14px;
  line-height: 1.6;
  max-width: 320px;
}
.socials {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
.sicon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;
}
.sicon:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

.col h4 {
  color: #fff;
  font-size: 14px;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.col a {
  display: block;
  color: #c8c6d0;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 0;
  transition: color 160ms ease;
}
.col a:hover {
  color: #fff;
}
.muted {
  font-size: 14px;
  color: #8a8898;
  margin-bottom: 12px;
}

.news {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  padding: 6px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.news input {
  flex: 1 1 auto;
  background: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  padding: 8px 10px;
  font-size: 14px;
}
.news input::placeholder {
  color: #8a8898;
}
.news button {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  cursor: pointer;
}

.copy {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 18px 0;
  font-size: 13px;
  color: #8a8898;
}
.copy .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.links a {
  color: #8a8898;
  text-decoration: none;
  margin-left: 16px;
  transition: color 160ms ease;
}
.links a:hover {
  color: #fff;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 540px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>