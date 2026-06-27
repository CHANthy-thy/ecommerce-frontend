<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'
import SearchBar from '@/components/SearchBar.vue'

const cart = useCartStore()
const wishlist = useWishlistStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const open = ref(false)
const profileOpen = ref(false)

const navLinks = [
  { to: '/', key: 'nav.home' },
  { to: '/products', key: 'nav.products' },
  { to: '/wishlist', key: 'nav.wishlist' },
  { to: '/cart', key: 'nav.cart' },
  { to: '/orders', key: 'nav.orders' },
]

function close() {
  open.value = false
  profileOpen.value = false
}

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const cartLabel = computed(() => cart.count)

const { t, setLang, lang } = useI18n()
const { toggle, isDark } = useTheme()

function logout() {
  auth.logout()
  close()
  router.push('/')
}
</script>

<template>
  <header class="nav-root">
    <div class="container nav-inner">
      <RouterLink to="/" class="brand" @click="close">
        <span class="brand-mark">SM</span>
        <span class="brand-name">GlowMart</span>
      </RouterLink>

      <nav class="nav-center" :class="{ open: open }">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
          @click="close"
        >
          {{ t(link.key) }}
        </RouterLink>
      </nav>

      <div class="nav-right">
        <div class="search-wrap">
          <SearchBar />
        </div>

          <RouterLink to="/wishlist" class="icon-btn hide-sm" :aria-label="t('nav.wishlist')">
            <span class="material-symbols-rounded" aria-hidden="true">favorite</span>
            <span v-if="wishlist.count" class="badge">{{ wishlist.count }}</span>
          </RouterLink>

          <RouterLink to="/cart" class="icon-btn cart-btn" :aria-label="t('nav.cart')">
            <span class="material-symbols-rounded" aria-hidden="true">shopping_bag</span>
            <span v-if="cartLabel" class="badge accent">{{ cartLabel }}</span>
          </RouterLink>

          <!-- Language + Theme toggles -->
          <div class="toggles hide-sm">
            <div class="lang" role="group" :aria-label="t('nav.lang')">
              <button type="button" class="toggle-btn" :class="{ active: lang === 'kh' }" @click="setLang('kh')">{{ t('nav.lang.kh') }}</button>
              <button type="button" class="toggle-btn" :class="{ active: lang === 'en' }" @click="setLang('en')">{{ t('nav.lang.en') }}</button>
            </div>

            <button type="button" class="toggle-theme" @click="toggle" :aria-label="t('nav.theme')">
              <span class="toggle-emoji">{{ isDark ? '🌙' : '🌞' }}</span>
              <span class="toggle-text">{{ isDark ? t('nav.theme.dark') : t('nav.theme.light') }}</span>
            </button>
          </div>

        <template v-if="auth.isAuthenticated && auth.user">
          <button class="profile hide-sm" @click="profileOpen = !profileOpen" aria-label="Profile">
            <img :src="auth.user.avatar" :alt="auth.user.name" />
            <Transition name="fade">
              <div v-if="profileOpen" class="profile-menu" @click.stop>
                <div class="profile-head">
                  <strong>{{ auth.user.name }}</strong>
                  <span>{{ auth.user.email }}</span>
                </div>
                <RouterLink to="/profile" class="profile-item" @click="close">{{ t('nav.profile') }}</RouterLink>
                <RouterLink to="/orders" class="profile-item" @click="close">{{ t('nav.orders') }}</RouterLink>
                <RouterLink to="/wishlist" class="profile-item" @click="close">{{ t('nav.wishlist') }}</RouterLink>
                <button class="profile-item danger" @click="logout">Logout</button>
              </div>
            </Transition>
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn ghost hide-sm" @click="close">{{ t('nav.login') }}</RouterLink>
          <RouterLink to="/register" class="btn primary hide-sm" @click="close">{{ t('nav.register') }}</RouterLink>
        </template>

        <button
          class="icon-btn hamburger"
          :class="{ open }"
          aria-label="Menu"
          @click="open = !open"
        >
          <span class="material-symbols-rounded" aria-hidden="true">{{ open ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-root {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-bottom: 1px solid var(--border-soft);
}

.nav-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  height: 72px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-h);
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
  box-shadow: var(--shadow-accent);
  letter-spacing: 0.04em;
}
.brand-name {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.02em;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  font-size: 14.5px;
  transition: color 160ms ease, background 160ms ease;
}
.nav-link:hover {
  color: var(--text-h);
  background: var(--accent-soft);
}
.nav-link.active {
  color: var(--text-h);
  background: var(--accent-soft);
}
.nav-link.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  transform: translateX(-50%);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search-wrap {
  width: 220px;
}

.icon-btn {
  position: relative;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
  cursor: pointer;
  text-decoration: none;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease;
}
.icon-btn:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.icon-btn .material-symbols-rounded {
  font-size: 22px;
  line-height: 1;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.cart-btn:hover .material-symbols-rounded {
  transform: translateY(-1px);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--danger);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 2px #fff;
}
.badge.accent {
  background: var(--accent);
}

.btn {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  cursor: pointer;
}
.btn.ghost {
  color: var(--text-h);
  background: transparent;
  border-color: var(--border);
}
.btn.ghost:hover {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: var(--accent-border);
}
.btn.primary {
  color: #fff;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-1px);
}

.profile {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  border: 2px solid var(--border);
  background: #fff;
  cursor: pointer;
  overflow: visible;
  transition: border-color 160ms ease, transform 160ms ease;
}
.profile:hover {
  border-color: var(--accent-border);
  transform: translateY(-1px);
}
.profile img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 220px;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-lg);
  padding: 8px;
  z-index: 60;
}
.profile-head {
  display: flex;
  flex-direction: column;
  padding: 10px 12px 12px;
  border-bottom: 1px solid var(--border-soft);
  margin-bottom: 6px;
}
.profile-head strong {
  color: var(--text-h);
  font-size: 14px;
}
.profile-head span {
  color: var(--text-muted);
  font-size: 12px;
}
.profile-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--text);
  background: transparent;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  transition: background 140ms ease, color 140ms ease;
}
.profile-item:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.profile-item.danger {
  color: var(--danger);
}
.profile-item.danger:hover {
  background: var(--danger-soft);
  color: var(--danger);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: transparent;
  border: 1px solid var(--border);
  cursor: pointer;
  color: var(--text-h);
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}
.hamburger:hover {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: var(--accent-border);
}
.hamburger .material-symbols-rounded {
  font-size: 24px;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.hide-sm {
  display: inline-flex;
}

@media (max-width: 1024px) {
  .search-wrap {
    width: 160px;
  }
}

@media (max-width: 860px) {
  .nav-inner {
    grid-template-columns: auto 1fr auto;
    height: 64px;
    gap: 12px;
  }
  .search-wrap {
    display: none;
  }
  .hide-sm {
    display: none;
  }
  .hamburger {
    display: inline-flex;
  }
  .nav-center {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom: 1px solid var(--border-soft);
    flex-direction: column;
    align-items: stretch;
    padding: 8px;
    gap: 0;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 200ms ease, opacity 200ms ease;
    box-shadow: var(--shadow);
  }
  .nav-center.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav-link {
    height: 44px;
    border-radius: 10px;
  }
  .nav-link.active::after {
    display: none;
  }
}
.toggles {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang {
  display: flex;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px;
  gap: 2px;
}

.toggle-btn {
  border: 0;
  cursor: pointer;
  background: transparent;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12.5px;
  color: var(--text);
}

.toggle-btn.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.toggle-theme {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  height: 40px;
  padding: 0 12px;
  cursor: pointer;
  color: var(--text-h);
  font-weight: 700;
}

.toggle-emoji {
  font-size: 16px;
}

.toggle-text {
  font-size: 12.5px;
}

@media (max-width: 860px) {
  .toggles {
    width: 100%;
    justify-content: space-between;
  }
  .toggle-text {
    display: none;
  }
}

</style>
