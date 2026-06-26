<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const roleLabel = computed(() => {
  const role = auth.user?.role
  if (role === 'admin') return 'Admin'
  if (role === 'customer') return 'Customer'
  return 'User'
})

const rules = computed(() => {
  // UI-only rules text. Backend/admin management can be wired later.
  return [
    'You must follow the rules set by the Admin.',
    'Do not attempt to bypass role restrictions.',
    'Respect the platform policies during browsing, checkout, and orders.',
  ]
})
</script>

<template>
  <section v-if="auth.isAuthenticated && auth.user" class="wrap">
    <div class="title">
      <span class="chip">{{ roleLabel }}</span>
      <strong>Rules</strong>
    </div>

    <ul class="list">
      <li v-for="(r, i) in rules" :key="i">{{ r }}</li>
    </ul>
  </section>
</template>

<style scoped>
.wrap {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(16, 185, 129, 0.10) 100%);
  border: 1px solid var(--accent-border);
  border-radius: var(--r-lg);
  padding: 16px 18px;
  margin: 18px 0;
}
.title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.chip {
  font-size: 12px;
  font-weight: 800;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}
.list {
  margin: 0;
  padding-left: 18px;
  color: var(--text);
  font-size: 14.5px;
  line-height: 1.6;
  display: grid;
  gap: 6px;
}
</style>

