<script setup lang="ts">
import { computed, ref } from 'vue'

const product = ref<any>(null)
const activeImage = ref(0)

const BACKEND_URL = 'http://localhost:8000'

function toProductImageSrc(imageUrlOrPath: unknown): string {
  const v = typeof imageUrlOrPath === 'string' ? imageUrlOrPath : ''
  if (!v) return ''
  if (/^https?:\/\//i.test(v)) return v
  if (v.startsWith('/storage/')) return `${BACKEND_URL}${v}`
  if (v.startsWith('storage/')) return `${BACKEND_URL}/${v}`
  return `${BACKEND_URL}/storage/${v.replace(/^\/+/, '')}`
}

const galleryImages = computed(() => {
  if (!product.value) return []
  const main = toProductImageSrc(product.value.image_url ?? product.value.image)
  return [main, main, main, main]
})
</script>

