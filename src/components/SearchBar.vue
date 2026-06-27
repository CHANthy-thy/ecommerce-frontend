<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const q = ref('')
const router = useRouter()

function submit() {
  const term = q.value.trim()
  if (!term) return
  router.push({ path: '/products', query: { q: term } })
}
</script>

<template>
  <form class="search" role="search" @submit.prevent="submit">
    <span class="micon" aria-hidden="true">search</span>
    <input
      v-model="q"
      type="search"
      placeholder="Search skincare…"
      aria-label="Search products"
    />
  </form>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.search:focus-within {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 18px;
  color: var(--text-muted);
}
input {
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: var(--text-h);
}
input::placeholder {
  color: var(--text-muted);
}
</style>