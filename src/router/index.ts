import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAuthStore } from '@/stores/auth'
import type { Role } from '@/utils/permissions'
import { isAllowed } from '@/utils/permissions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/Home.vue') },
        { path: 'products', name: 'products', component: () => import('@/views/Products.vue') },
        { path: 'products/:id', name: 'product-detail', component: () => import('@/views/ProductDetail.vue') },
        { path: 'wishlist', name: 'wishlist', component: () => import('@/views/Wishlist.vue') },
        { path: 'cart', name: 'cart', component: () => import('@/views/Cart.vue') },
        { path: 'checkout', name: 'checkout', component: () => import('@/views/Checkout.vue') },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/Orders.vue'),
          meta: { requiresAuth: true, requiresRole: 'customer' satisfies Role },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile.vue'),
          meta: { requiresAuth: true, requiresRole: 'customer' satisfies Role },
        },
        { path: 'login', name: 'login', component: () => import('@/views/Login.vue') },
        { path: 'register', name: 'register', component: () => import('@/views/Register.vue') },
      ],
    },

    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, requiresRole: 'admin' satisfies Role },
      children: [
        { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/AdminDashboard.vue') },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('@/views/admin/AdminCategories.vue'),
        },
        // Keep these routes available so AdminLayout links don't 404.
        // If/when the real pages are implemented, we can swap these for the final components.
        { path: 'products', name: 'admin-products', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'orders', name: 'admin-orders', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'users', name: 'admin-users', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'audit', name: 'admin-audit', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'reports', name: 'admin-reports', component: () => import('@/views/admin/AdminDashboard.vue') },
      ],
    },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  const requiresAuth = Boolean(to.meta?.requiresAuth)
  const requiredRole = to.meta?.requiresRole as Role | undefined

  // Auth required
  if (requiresAuth) {
    if (!auth.isAuthenticated || !auth.user) {
      return { name: 'login' }
    }
  }

  // Role required
  if (requiredRole) {
    const role = auth.user?.role
    if (!isAllowed(role, requiredRole)) {
      return { name: 'home' }
    }
  }

  return true
})

export default router

