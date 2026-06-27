<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAdminStore, type AdminCategory } from '@/stores/admin'

const admin = useAdminStore()
const search = ref('')

const form = reactive<{ id?: number; name: string; icon: string; cover: string }>({
  id: undefined,
  name: '',
  icon: 'category',
  cover: '',
})

const errors = reactive<{ name?: string }>({})

const list = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return admin.categories
  return admin.categories.filter((c) => c.name.toLowerCase().includes(q))
})

function resetForm() {
  form.id = undefined
  form.name = ''
  form.icon = 'category'
  form.cover = ''
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function edit(c: AdminCategory) {
  form.id = c.id
  form.name = c.name
  form.icon = c.icon ?? 'category'
  form.cover = c.cover ?? ''
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function validate() {
  errors.name = ''
  if (!form.name.trim()) errors.name = 'Name is required'
  return !errors.name
}

function save() {
  if (!validate()) return

  if (form.id) {
    const idx = admin.categories.findIndex((c) => c.id === form.id)
    if (idx >= 0) admin.categories[idx] = { ...admin.categories[idx], name: form.name.trim(), icon: form.icon, cover: form.cover }
  } else {
    const nextId = Math.max(0, ...admin.categories.map((c) => c.id)) + 1
    admin.categories.unshift({ id: nextId, name: form.name.trim(), icon: form.icon, cover: form.cover })
  }

  resetForm()
}

function remove(id: number) {
  admin.categories = admin.categories.filter((c) => c.id !== id)
}

const onCoverFile = (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return

  const url = URL.createObjectURL(file)
  form.cover = url
}
</script>

<template>
  <div>
    <header class="head">
      <div>
        <h2>Categories</h2>
        <p class="muted">Create, update and delete categories (mock).</p>
      </div>

      <div class="right">
        <input v-model="search" class="search" type="text" placeholder="Search categories..." />
        <button class="btn primary" type="button" @click="resetForm">New</button>
      </div>
    </header>

    <div class="layout">
      <section class="list">
        <div class="toolbar">
          <span class="k">Categories</span>
          <span class="k">{{ list.length }} item(s)</span>
        </div>

        <ul class="ul">
          <li v-for="c in list" :key="c.id" class="li">
            <div class="left">
              <div class="ico" aria-hidden="true">
                <span class="micon">{{ c.icon || 'category' }}</span>
              </div>
              <div>
                <strong>{{ c.name }}</strong>
                <span class="sub">ID: {{ c.id }}</span>
              </div>
            </div>

            <div class="right">
              <button class="btn small" type="button" @click="edit(c)">Edit</button>
              <button class="btn small danger" type="button" @click="remove(c.id)">Delete</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="form">
        <h3>{{ form.id ? 'Edit category' : 'Add category' }}</h3>

        <form class="f" @submit.prevent="save">
          <label class="field" :class="{ invalid: errors.name }">
            <span>Name</span>
            <input v-model="form.name" placeholder="e.g. Cleanser" />
            <small v-if="errors.name" class="err">{{ errors.name }}</small>
          </label>

          <label class="field">
            <span>Icon (optional)</span>
            <input v-model="form.icon" placeholder="Material symbol name" />
          </label>

          <label class="field">
            <span>Cover upload (optional)</span>
            <input type="file" accept="image/*" @change="onCoverFile" />
            <small class="muted">Frontend-only. Stores selected image in memory (and optionally localStorage below).</small>
          </label>

          <label class="field">
            <span>Cover URL (optional)</span>
            <input v-model="form.cover" placeholder="https://..." />
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

/* Styles for AdminCategories */

.head {

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
.h2, h2 {
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
.ico {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  display: grid;
  place-items: center;
}
.micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 22px;
  color: var(--accent);
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
.right {
  display: flex;
  gap: 8px;
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
  margin-top: 6px;
  color: #d32f2f;
  font-weight: 700;
  font-size: 12.5px;
}

.invalid input {
  border-color: #d32f2f;
}

/* End styles */  
</style>

