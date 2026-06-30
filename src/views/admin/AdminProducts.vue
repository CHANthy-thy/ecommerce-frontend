<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import api from '@/api'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category_id: number
  category?: { id: number; name: string }
  image?: string
}

interface Category {
  id: number
  name: string
}

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const search = ref('')
const loading = ref(false)

const form = reactive<{ id?: number; name: string; description: string; price: number; stock: number; category_id: number; image: string; image_url: string }>({
  id: undefined,
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: 0,
  image: '',
  image_url: '',
})

const errors = reactive<{ name?: string; price?: string; stock?: string; category_id?: string }>({})

const list = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter((p) => p.name.toLowerCase().includes(q))
})

async function loadProducts() {
  loading.value = true
  try {
    const response = await api.get('/admin/products')
    products.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to load products', error)
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  try {
    const response = await api.get('/admin/categories')
    categories.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}

function resetForm() {
  form.id = undefined
  form.name = ''
  form.description = ''
  form.price = 0
  form.stock = 0
  form.category_id = 0
  form.image = ''
  form.image_url = ''
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function edit(p: Product) {
  form.id = p.id
  form.name = p.name
  form.description = p.description
  form.price = p.price
  form.stock = p.stock
  form.category_id = p.category_id
  form.image_url = p.image || ''
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function validate() {
  errors.name = ''
  errors.price = ''
  errors.stock = ''
  errors.category_id = ''

  if (!form.name.trim()) errors.name = 'Name is required'
  if (form.price <= 0) errors.price = 'Price must be greater than 0'
  if (form.stock < 0) errors.stock = 'Stock cannot be negative'
  if (!form.category_id) errors.category_id = 'Category is required'

  return !errors.name && !errors.price && !errors.stock && !errors.category_id
}

async function save() {
  if (!validate()) return

  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('description', form.description)
  formData.append('price', form.price.toString())
  formData.append('stock', form.stock.toString())
  formData.append('category_id', form.category_id.toString())
  if (form.image) formData.append('image', form.image)
  if (form.image_url) formData.append('image_url', form.image_url)

  try {
    if (form.id) {
      await api.post(`/admin/products/${form.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { _method: 'PUT' },
      })
    } else {
      await api.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    await loadProducts()
    resetForm()
  } catch (error) {
    console.error('Failed to save product', error)
  }
}

async function remove(id: number) {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await api.delete(`/admin/products/${id}`)
    await loadProducts()
  } catch (error) {
    console.error('Failed to delete product', error)
  }
}

const onImageFile = (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (file) form.image = file
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<template>
  <div>
    <header class="head">
      <div>
        <h2>Products</h2>
        <p class="muted">Manage your product inventory</p>
      </div>

      <div class="right">
        <input v-model="search" class="search" type="text" placeholder="Search products..." />
        <button class="btn primary" type="button" @click="resetForm">New Product</button>
      </div>
    </header>

    <div class="layout">
      <section class="list">
        <div class="toolbar">
          <span class="k">Products</span>
          <span class="k">{{ list.length }} item(s)</span>
        </div>

        <div v-if="loading" class="loading">Loading...</div>

        <ul v-else class="ul">
          <li v-for="p in list" :key="p.id" class="li">
            <div class="left">
              <div class="img" aria-hidden="true">
                <img v-if="p.image" :src="p.image" :alt="p.name" />
                <span v-else class="placeholder">No image</span>
              </div>
              <div>
                <strong>{{ p.name }}</strong>
                <span class="sub">{{ p.category?.name || 'No category' }}</span>
                <span class="price">${{ p.price.toFixed(2) }}</span>
              </div>
            </div>

            <div class="right">
              <span class="stock" :class="{ low: p.stock < 10 }">Stock: {{ p.stock }}</span>
              <button class="btn small" type="button" @click="edit(p)">Edit</button>
              <button class="btn small danger" type="button" @click="remove(p.id)">Delete</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="form">
        <h3>{{ form.id ? 'Edit product' : 'Add product' }}</h3>

        <form class="f" @submit.prevent="save">
          <label class="field" :class="{ invalid: errors.name }">
            <span>Name *</span>
            <input v-model="form.name" placeholder="Product name" />
            <small v-if="errors.name" class="err">{{ errors.name }}</small>
          </label>

          <label class="field">
            <span>Description</span>
            <textarea v-model="form.description" placeholder="Product description" rows="3"></textarea>
          </label>

          <label class="field" :class="{ invalid: errors.price }">
            <span>Price *</span>
            <input v-model.number="form.price" type="number" step="0.01" min="0" placeholder="0.00" />
            <small v-if="errors.price" class="err">{{ errors.price }}</small>
          </label>

          <label class="field" :class="{ invalid: errors.stock }">
            <span>Stock *</span>
            <input v-model.number="form.stock" type="number" min="0" placeholder="0" />
            <small v-if="errors.stock" class="err">{{ errors.stock }}</small>
          </label>

          <label class="field" :class="{ invalid: errors.category_id }">
            <span>Category *</span>
            <select v-model="form.category_id">
              <option value="">Select category</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
            <small v-if="errors.category_id" class="err">{{ errors.category_id }}</small>
          </label>

          <label class="field">
            <span>Image file</span>
            <input type="file" accept="image/*" @change="onImageFile" />
          </label>

          <label class="field">
            <span>Image URL</span>
            <input v-model="form.image_url" placeholder="https://..." />
          </label>

          <div class="actions">
            <button class="btn primary" type="submit">Save</button>
            <button class="btn ghost" type="button" @click="resetForm">Reset</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
h2 {
  margin: 0;
  font-size: 20px;
}
.muted {
  color: var(--text-muted);
  font-size: 13.5px;
  margin-top: 6px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 14px;
  align-items: start;
}
.list,
.form {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
}
.list {
  padding: 14px;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.k {
  color: var(--text-muted);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 12px;
}
.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}
.ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.li {
  border: 1px solid var(--border-soft);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--accent-soft);
  display: grid;
  place-items: center;
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.placeholder {
  font-size: 10px;
  color: var(--text-muted);
}
.left strong {
  display: block;
  color: var(--text-h);
}
.sub {
  display: block;
  color: var(--text-muted);
  font-size: 12.5px;
}
.price {
  display: block;
  color: var(--accent);
  font-weight: 600;
  font-size: 13px;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stock {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  background: var(--success-soft);
  color: var(--success);
}
.stock.low {
  background: var(--danger-soft);
  color: var(--danger);
}

.form {
  padding: 14px;
}
.form h3 {
  margin: 0 0 10px;
}
.f {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: block;
}
.field > span {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
}
.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
}
.actions {
  display: flex;
  gap: 10px;
}
.actions .btn {
  flex: 1;
}
.err {
  display: block;
  margin-top: 4px;
  color: #d32f2f;
  font-weight: 700;
  font-size: 12px;
}
.invalid input,
.invalid select {
  border-color: #d32f2f;
}

.search {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 14px;
  width: 200px;
}
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.btn.primary {
  background: var(--accent);
  color: #fff;
}
.btn.ghost {
  background: #fff;
  border-color: var(--border);
  color: var(--text);
}
.btn.small {
  padding: 6px 12px;
  font-size: 12px;
}
.btn.danger {
  background: var(--danger-soft);
  color: var(--danger);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
