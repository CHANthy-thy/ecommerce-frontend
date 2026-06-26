<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

function logout() {
  auth.logout()
}
</script>

<template>
  <div class="admin-shell">
    <aside class="side">
      <div class="brand">
        <span class="mark">SM</span>
        <div>
          <strong class="title">Admin</strong>
          <span class="sub">Management Console</span>
        </div>
      </div>

      <nav class="nav">
        <RouterLink to="/admin" class="item">Dashboard</RouterLink>
        <RouterLink to="/admin/categories" class="item">Categories</RouterLink>
        <RouterLink to="/admin/products" class="item">Products</RouterLink>
        <RouterLink to="/admin/orders" class="item">Orders</RouterLink>
        <RouterLink to="/admin/users" class="item">Users</RouterLink>
        <RouterLink to="/admin/settings" class="item">Settings</RouterLink>
        <RouterLink to="/admin/audit" class="item">Audit Log</RouterLink>
        <RouterLink to="/admin/reports" class="item">Reports</RouterLink>
      </nav>

      <div class="foot">
        <div class="who">
          <img :src="auth.user?.avatar" alt="Admin" />
          <div>
            <strong>{{ auth.user?.name ?? 'Admin' }}</strong>
            <span>{{ auth.user?.email }}</span>
          </div>
        </div>
        <button class="btn" type="button" @click="logout">Logout</button>
      </div>
    </aside>

    <main class="main">
      <header class="top">
        <h1>Admin Panel</h1>
        <p class="muted">Only admin can access these pages.</p>
      </header>

      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: calc(100svh - 72px);
}

.side {
  position: sticky;
  top: 72px;
  align-self: start;
  height: calc(100svh - 72px);
  background: #0b0a14;
  color: #fff;
  padding: 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
}

.mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  font-weight: 900;
}

.title {
  font-size: 16px;
}

.sub {
  display: block;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
}

.item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.item.router-link-active {
  background: rgba(196, 181, 253, 0.18);
  border-color: rgba(196, 181, 253, 0.35);
  color: #fff;
}

.foot {
  margin-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 16px;
}

.who {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.who img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.18);
  object-fit: cover;
}

.who strong {
  display: block;
  font-size: 13.5px;
}

.who span {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
}

.btn {
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.main {
  padding: 28px 20px 60px;
}

.top {
  margin-bottom: 18px;
}

.top h1 {
  margin: 0;
  font-size: 26px;
}

.muted {
  color: var(--text-muted);
  margin-top: 6px;
  font-size: 14px;
}

.content {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-xl);
  padding: 20px;
}

@media (max-width: 980px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>

