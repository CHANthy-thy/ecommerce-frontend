<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/api/axios'

const status = ref<'idle' | 'ok' | 'error'>('idle')
const message = ref<string>('')

onMounted(async () => {
  try {
    // Calls GET {VITE_API_URL||http://localhost:8000/api}/ping
    const res = await api.get('/ping')

    status.value = 'ok'
    message.value = res.data?.message ?? 'Ping success'
    // Requirement: log success message to browser console
    console.log('[API PING SUCCESS]', res.data)
  } catch (err: any) {
    status.value = 'error'
    message.value = err?.response?.data?.message ?? err?.message ?? 'Ping failed'
    console.error('[API PING ERROR]', err)
  }
})
</script>

<template>
  <div class="container">
    <h1>API Ping Test</h1>
    <p v-if="status === 'idle'">Checking API...</p>
    <p v-else-if="status === 'ok'">✅ {{ message }}</p>
    <p v-else>❌ {{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  padding: 24px;
}
</style>

