<script setup lang="ts">
import { computed } from 'vue'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const featured = computed(() => products.filter((p) => p.isFeatured).slice(0, 8))
const newArrivals = computed(() => products.filter((p) => p.isNew).slice(0, 8))
const bestSellers = computed(() => products.filter((p) => p.isBestSeller).slice(0, 8))

const topJapanProducts = computed(() =>
  products
    .filter((p) => p.country === 'Japan')
    .slice()
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 8),
)

const topUsaProducts = computed(() =>
  products
    .filter((p) => p.country === 'USA')
    .slice()
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 8),
)
</script>


<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
<span class="kicker">{{ t('home.hero.kicker') }}</span>
          <h1>
            {{ t('home.hero.title.line1') }}<br />
            <span class="grad">{{ t('home.hero.title.line2') }}</span><br />
            {{ t('home.hero.title.line3') }}
          </h1>
          <p class="lede">
            {{ t('home.hero.desc') }}
          </p>
          <div class="cta">
            <RouterLink to="/products" class="btn primary lg">
              {{ t('home.cta.shopNew') }}
              <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
            </RouterLink>
            <RouterLink to="/products?cat=Gaming" class="btn ghost lg">{{ t('home.cta.gamingDeals') }}</RouterLink>
          </div>

          <ul class="pills">
            <li><span class="material-symbols-rounded" aria-hidden="true">local_shipping</span> {{ t('home.hero.pills.shipping') }}</li>
            <li><span class="material-symbols-rounded" aria-hidden="true">undo</span> {{ t('home.hero.pills.returns') }}</li>
            <li><span class="material-symbols-rounded" aria-hidden="true">verified</span> {{ t('home.hero.pills.warranty') }}</li>
          </ul>
        </div>

        <div class="hero-art" aria-hidden="true">
          <div class="blob blob-a"></div>
          <div class="blob blob-b"></div>
          <img
            class="hero-img"
            src="https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=900&q=80&auto=format&fit=crop"
            alt=""
          />
          <div class="float-card">
            <div class="float-icon">⚡</div>
            <div>
              <strong>Apple iPhone 16 Pro</strong>
              <span>From $999 · In stock now</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="container cats">
      <div v-for="c in categories" :key="c.name" class="cat">
        <RouterLink :to="`/products?cat=${c.name}`" class="cat-link">
          <div class="cat-img">
            <img :src="c.cover" :alt="c.name" />
          </div>
          <div class="cat-info">
            <h3>{{ c.name }}</h3>
            <span class="link">
              Shop now
              <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="container section">
      <div class="section-head">
        <div>
          <span class="kicker">Featured</span>
          <h2>Editor's picks</h2>
        </div>
        <RouterLink to="/products" class="link">View all <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span></RouterLink>
      </div>

      <div class="grid">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- BANNER -->
    <section class="container banner-wrap">
      <div class="banner">
        <div class="banner-copy">
          <span class="kicker light">Limited time</span>
          <h2>Up to 30% off on selected pieces.</h2>
          <p>Apple, Samsung, Sony, Razer — biggest savings of the season.</p>
          <RouterLink to="/products" class="btn primary lg light">
            Shop the sale
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </RouterLink>
        </div>
        <div class="banner-art">
          <div class="b-blob"></div>
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80&auto=format&fit=crop"
            alt=""
          />
        </div>
      </div>
    </section>

    <!-- BEST SELLERS -->
    <section class="container section">
      <div class="section-head">
        <div>
          <span class="kicker">Customer favorites</span>
          <h2>Best sellers</h2>
        </div>
        <RouterLink to="/products" class="link">View all <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span></RouterLink>
      </div>

      <div class="grid">
        <ProductCard v-for="p in bestSellers" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- NEW ARRIVALS -->
    <section v-if="newArrivals.length" class="container section">
      <div class="section-head">
        <div>
          <span class="kicker">Fresh in</span>
          <h2>New arrivals</h2>
        </div>
        <RouterLink to="/products" class="link">View all <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span></RouterLink>
      </div>

      <div class="grid">
        <ProductCard v-for="p in newArrivals" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- TOP BY COUNTRY -->
    <section class="container section">
      <div class="section-head">
        <div>
          <span class="kicker">Trending</span>
          <h2>Top Japan Products</h2>
        </div>
        <RouterLink to="/products?country=Japan" class="link">
          View all
          <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </RouterLink>
      </div>

      <div class="grid">
        <ProductCard v-for="p in topJapanProducts" :key="p.id" :product="p" />
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <div>
          <span class="kicker">Trending</span>
          <h2>Top USA Products</h2>
        </div>
        <RouterLink to="/products?country=USA" class="link">
          View all
          <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </RouterLink>
      </div>

      <div class="grid">
        <ProductCard v-for="p in topUsaProducts" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>


<style scoped>
.home {
  padding-bottom: 40px;
}

/* HERO */
.hero {
  position: relative;
  padding: 48px 0 32px;
  overflow: hidden;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
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
.kicker.light {
  color: #c4b5fd;
  background: rgba(255, 255, 255, 0.1);
}
.hero-copy h1 {
  margin: 18px 0 16px;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.grad {
  background: linear-gradient(120deg, var(--accent) 0%, var(--accent-2) 60%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lede {
  font-size: 17px;
  line-height: 1.6;
  color: var(--text);
  max-width: 520px;
}
.cta {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
  cursor: pointer;
}
.btn.lg {
  height: 52px;
  padding: 0 24px;
  font-size: 15px;
  border-radius: 14px;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-2px);
}
.btn.primary.light {
  background: #fff;
  color: var(--accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
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
.btn .material-symbols-rounded {
  font-size: 18px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.pills {
  display: flex;
  gap: 24px;
  margin-top: 28px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  font-size: 13.5px;
  color: var(--text);
}
.pills li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.pills .material-symbols-rounded {
  font-size: 18px;
  color: var(--accent);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* HERO art */
.hero-art {
  position: relative;
  aspect-ratio: 5 / 4.5;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  box-shadow: var(--shadow-lg);
}
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
}
.blob-a {
  width: 220px;
  height: 220px;
  top: -40px;
  right: -40px;
  background: #c4b5fd;
}
.blob-b {
  width: 260px;
  height: 260px;
  bottom: -60px;
  left: -60px;
  background: #f9a8d4;
}
.float-card {
  position: absolute;
  bottom: 18px;
  left: 18px;
  right: 18px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow);
}
.float-card > div {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.float-card strong {
  color: var(--text-h);
  font-size: 14px;
}
.float-card span {
  color: var(--text-muted);
  font-size: 12.5px;
}
.float-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--accent-soft);
  display: grid;
  place-items: center;
  font-size: 20px;
}

/* CATEGORIES */
.cats {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 14px;
  margin: 56px auto 24px;
}
.cat {
  position: relative;
  height: 200px;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border-soft);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.cat:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
.cat-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
.cat-img {
  position: absolute;
  inset: 0;
}
.cat-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}
.cat:hover .cat-img img {
  transform: scale(1.06);
}
.cat::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 100%);
}
.cat-info {
  position: absolute;
  inset: auto 14px 14px 14px;
  z-index: 1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.cat-info h3 {
  color: #fff;
  font-size: 15px;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: gap 160ms ease;
}
.link:hover {
  gap: 10px;
}
.link .material-symbols-rounded,
.cat-info .material-symbols-rounded {
  font-size: 16px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* SECTIONS */
.section {
  margin: 48px auto;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 24px;
}
.section-head h2 {
  margin-top: 6px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* BANNER */
.banner-wrap {
  margin: 56px auto;
}
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: linear-gradient(135deg, #1f1d2e 0%, #0b0a14 100%);
  border-radius: 28px;
  overflow: hidden;
  color: #fff;
  min-height: 320px;
}
.banner-copy {
  padding: 44px 44px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}
.banner-copy h2 {
  color: #fff;
  font-size: 36px;
  line-height: 1.1;
}
.banner-copy p {
  color: #c8c6d0;
  font-size: 15px;
}
.banner-art {
  position: relative;
  overflow: hidden;
}
.banner-art img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
}
.b-blob {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: var(--accent);
  filter: blur(60px);
  opacity: 0.4;
  top: -40px;
  right: -40px;
}

@media (max-width: 1200px) {
  .cats {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .hero-copy h1 {
    font-size: 44px;
  }
}
@media (max-width: 860px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .cats {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .banner {
    grid-template-columns: 1fr;
  }
  .banner-copy {
    padding: 28px;
  }
  .banner-copy h2 {
    font-size: 26px;
  }
  .banner-art {
    display: none;
  }
}
@media (max-width: 480px) {
  .hero-copy h1 {
    font-size: 34px;
  }
  .lede {
    font-size: 15px;
  }
  .cats {
    grid-template-columns: 1fr;
  }
}
</style>