<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useI18n } from '@/composables/useI18n'
import { productApi, categoryApi } from '@/api'

type Category = { name: string }

const { t } = useI18n()

const categories = ref<Category[]>([])
const brands = ref<string[]>(['CeraVe', 'La Roche-Posay', 'COSRX', 'Beauty of Joseon', 'Anua', 'SKIN1004', 'Round Lab', 'Cetaphil', 'The Ordinary', 'Eucerin'])

const products = ref<any[]>([])
const loading = ref(false)

const featured = computed(() => products.value.slice(0, 8))

const productCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of products.value) {
    const catName = p?.category?.name || p?.iCategory
    if (catName) counts[catName] = (counts[catName] || 0) + 1
  }
  return counts
})

async function load() {
  loading.value = true
  try {
    const [catRes, prodRes] = await Promise.all([categoryApi.getAll(), productApi.getAll({ per_page: 50 })])

    categories.value = (catRes.data.data || catRes.data) as Category[]
    const allProducts = (prodRes.data.data || prodRes.data) as any[]

    // Prefer “featured/latest” if backend supports it via a boolean; otherwise show latest page.
    products.value = allProducts
      .filter((p: any) => p?.isFeatured || p?.isBestSeller)
      .slice(0, 8)

    if (products.value.length === 0) {
      products.value = allProducts.slice(0, 8)
    }
  } catch (e) {
    console.error('Failed to load home data', e)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="home">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <span class="kicker">{{ t('home.hero.kicker') }}</span>
          <h1 class="hero-title">
            {{ t('home.hero.title.line1') }}<br />
            <span class="highlight">{{ t('home.hero.title.line2') }}</span><br />
            {{ t('home.hero.title.line3') }}
          </h1>
          <p class="hero-desc">
            {{ t('home.hero.desc') }}
          </p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn primary lg">
              {{ t('home.cta.shopNew') }}
              <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
            </RouterLink>
          </div>
          <div class="trust-badges">
            <div class="badge">
              <span class="material-symbols-rounded">verified</span>
              Dermatologist Tested
            </div>
            <div class="badge">
              <span class="material-symbols-rounded">verified_user</span>
              100% Authentic
            </div>
            <div class="badge">
              <span class="material-symbols-rounded">local_shipping</span>
              Fast Delivery
            </div>
            <div class="badge">
              <span class="material-symbols-rounded">lock</span>
              Secure Payment
            </div>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <img
            src="https://skinney.com/cdn/shop/files/Skinney.com-skincare-banner.jpg?v=1711786394&width=3000"
            alt="Skincare products"
            class="hero-image"
          />
          <div class="float-badge">
            <span class="badge-icon">✨</span>
            <div>
              <strong>CeraVe Hydrating Cleanser</strong>
              <span>From $12.99 · In stock now</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES SECTION -->
    <section class="container categories-section">
      <div class="section-header">
        <h2>Shop by Category</h2>
        <p>Find your perfect skincare routine</p>
      </div>
      <div class="categories-grid">
        <RouterLink
          v-for="cat in categories"
          :key="cat.name"
          :to="`/products?cat=${cat.name}`"
          class="category-card"
        >
<div class="category-image" aria-hidden="true"></div>
          <div class="category-info">
            <h3>{{ cat.name }}</h3>
            <span class="product-count">{{ productCounts[cat.name] || 0 }} products</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="container section">
      <div class="section-head">
        <div>
          <h2>Editor's Picks</h2>
          <p>Our best-selling skincare essentials</p>
        </div>
        <RouterLink to="/products" class="link">
          View all <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
        </RouterLink>
      </div>
      <div class="grid">
        <ProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- POPULAR BRANDS -->
    <section class="container brands-section">
      <div class="section-header">
        <h2>Popular Brands</h2>
        <p>Trusted by skincare enthusiasts worldwide</p>
      </div>
      <div class="brands-grid">
        <div v-for="brand in brands" :key="brand" class="brand-card">
          <div class="brand-logo">{{ brand.split(' ')[0][0] }}{{ brand.split(' ').pop()?.[0] || '' }}</div>
          <span class="brand-name">{{ brand }}</span>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="container why-section">
      <div class="why-grid">
        <div class="why-card">
          <div class="why-icon">
            <span class="material-symbols-rounded">verified</span>
          </div>
          <h3>Authentic Products</h3>
          <p>100% genuine skincare from authorized retailers</p>
        </div>
        <div class="why-card">
          <div class="why-icon">
            <span class="material-symbols-rounded">local_shipping</span>
          </div>
          <h3>Fast Shipping</h3>
          <p>Quick delivery on orders over $50</p>
        </div>
        <div class="why-card">
          <div class="why-icon">
            <span class="material-symbols-rounded">science</span>
          </div>
          <h3>Dermatologist Recommended</h3>
          <p>Scientifically formulated for all skin types</p>
        </div>
        <div class="why-card">
          <div class="why-icon">
            <span class="material-symbols-rounded">lock</span>
          </div>
          <h3>Secure Payment</h3>
          <p>Your payment information is always protected</p>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter-section">
      <div class="container newsletter-container">
        <h2>Glow with us</h2>
        <p>Get the latest skincare tips, new arrivals, and exclusive offers delivered to your inbox</p>
        <form class="newsletter-form" @submit.prevent>
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button type="submit" class="btn primary">Subscribe</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #8BC6A2 0%, #6A9C89 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.kicker {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 999px;
  align-self: flex-start;
}

.hero-title {
  font-size: 48px;
  line-height: 1.1;
  color: #fff;
  margin: 0;
}

.highlight {
  color: #F5EBDD;
}

.hero-desc {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: #fff;
}

.hero-image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-image {
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.float-badge {
  position: absolute;
  bottom: -20px;
  left: 40px;
  background: #fff;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.badge-icon {
  font-size: 20px;
}

/* Categories */
.categories-section {
  padding: 80px 0 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 32px;
  color: #0b0a14;
}

.section-header p {
  color: #6b6375;
  margin-top: 8px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.category-card {
  text-decoration: none;
  background: #fff;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.category-image {
  aspect-ratio: 1 / 1;
  background: #F5EBDD;
  overflow: hidden;
}
.category-image::after {
  content: '';
  display: block;
  width: 68%;
  height: 68%;
  margin: 16% auto 0;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(139, 198, 162, 0.35), rgba(106, 156, 137, 0.12));
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-info {
  padding: 16px;
  text-align: center;
}

.category-info h3 {
  margin: 0 0 4px;
  font-size: 16px;
  color: #0b0a14;
}

.product-count {
  font-size: 12px;
  color: #6b6375;
}

/* Featured Products */
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.section-head h2 {
  font-size: 28px;
}

.section-head p {
  color: #6b6375;
  margin: 4px 0 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

/* Brands */
.brands-section {
  padding: 60px 0;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
}

.brand-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 24px 16px;
  text-align: center;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.brand-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.brand-logo {
  width: 60px;
  height: 60px;
  margin: 0 auto 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8BC6A2, #6A9C89);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 20px;
}

.brand-name {
  font-size: 13px;
  color: #0b0a14;
  font-weight: 600;
}

/* Why Choose Us */
.why-section {
  padding: 60px 0;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.why-card {
  background: #F5EBDD;
  border-radius: var(--r-lg);
  padding: 32px 20px;
  text-align: center;
  transition: transform 200ms ease;
}

.why-card:hover {
  transform: translateY(-4px);
}

.why-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #8BC6A2;
  display: grid;
  place-items: center;
}

.why-icon .material-symbols-rounded {
  font-size: 28px;
  color: #fff;
}

.why-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.why-card p {
  margin: 0;
  font-size: 14px;
  color: #6b6375;
  line-height: 1.5;
}

/* Newsletter */
.newsletter-section {
  background: linear-gradient(135deg, #6A9C89 0%, #8BC6A2 100%);
  padding: 60px 0;
  margin-top: 40px;
}

.newsletter-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-section h2 {
  color: #fff;
  font-size: 32px;
  margin-bottom: 12px;
}

.newsletter-section p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 480px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 14px 18px;
  border: 0;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
}

.newsletter-form input::placeholder {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .trust-badges {
    justify-content: center;
  }

  .hero-image {
    max-width: 400px;
    margin: 40px auto 0;
  }

  .float-badge {
    left: auto;
    right: 20px;
  }

  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>