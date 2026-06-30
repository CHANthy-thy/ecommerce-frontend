<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import api from '@/api'

interface User {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

const users = ref<User[]>([])
const search = ref('')
const loading = ref(false)

const form = reactive<{ id?: number; name: string; email: string; password: string; role: string }>({
  id: undefined,
  name: '',
  email: '',
  password: '',
  role: 'customer',
})

const errors = reactive<{ name?: string; email?: string; password?: string; role?: string }>({})

const list = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return users.value
  return users.value.filter((u) => 
    u.name.toLowerCase().includes(q) || 
    u.email.toLowerCase().includes(q) ||
    u.role.toLowerCase().includes(q)
  )
})

async function loadUsers() {
  loading.value = true
  try {
    const response = await api.get('/admin/users')
    users.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to load users', error)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.id = undefined
  form.name = ''
  form.email = ''
  form.password = ''
  form.role = 'customer'
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function edit(u: User) {
  form.id = u.id
  form.name = u.name
  form.email = u.email
  form.password = ''
  form.role = u.role
  for (const k of Object.keys(errors)) delete (errors as any)[k]
}

function validate() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.role = ''

  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email format'
  if (!form.id && !form.password) errors.password = 'Password is required for new users'
  if (!form.role) errors.role = 'Role is required'

  return !errors.name && !errors.email && !errors.password && !errors.role
}

async function save() {
  if (!validate()) return

  const data = {
    name: form.name,
    email: form.email,
    role: form.role,
  }

  if (form.password) {
    (data as any).password = form.password
  }

  try {
    if (form.id) {
      await api.put(`/admin/users/${form.id}`, data)
    } else {
      await api.post('/admin/users', data)
    }
    await loadUsers()
    resetForm()
  } catch (error) {
    console.error('Failed to save user', error)
  }
}

async function remove(id: number) {
  if (!confirm('Are you sure you want to delete this user?')) return
  try {
    await api.delete(`/admin/users/${id}`)
    await loadUsers()
  } catch (error) {
    console.error('Failed to delete user', error)
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div>
    <header class="head">
      <div>
        <h2>Users</h2>
        <p class="muted">Manage system users</p>
      </div>

      <div class="right">
        <input v-model="search" class="search" type="text" placeholder="Search users..." />
        <button class="btn primary" type="button" @click="resetForm">New User</button>
      </div>
    </header>

    <div class="layout">
      <section class="list">
        <div class="toolbar">
          <span class="k">Users</span>
          <span class="k">{{ list.length }} item(s)</span>
        </div>

        <div v-if="loading" class="loading">Loading...</div>

        <ul v-else class="ul">
          <li v-for="u in list" :key="u.id" class="li">
            <div class="left">
              <div class="avatar" aria-hidden="true">
                <span>{{ u.name.charAt(0).toUpperCase() }}</span>
              </div>
              <div>
                <strong>{{ u.name }}</strong>
                <span class="sub">{{ u.email }}</span>
                <span class="role" :class="{ admin: u.role === 'admin' }">{{ u.role }}</span>
              </div>
            </div>

            <div class="right">
              <span class="date">{{ new Date(u.created_at).toLocaleDateString() }}</span>
              <button class="btn small" type="button" @click="edit(u)">Edit</button>
              <button class="btn small danger" type="button" @click="remove(u.id)">Delete</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="form">
        <h3>{{ form.id ? 'Edit user' : 'Add user' }}</h3>

        <form class="f" @submit.prevent="save">
          <label class="field" :class="{ invalid: errors.name }">
            <span>Name *</span>
            <input v-model="form.name" placeholder="Full name" />
            <small v-if="errors.name" class="err">{{ errors.name }}</small>
          </label>

          <label class="field" :class="{ invalid: errors.email }">
            <span>Email *</span>
            <input v-model="form.email" type="email" placeholder="email@example.com" />
            <small v-if="errors.email" class="err">{{ errors.email }}</small>
          </label>

          <label class="field" :class="{ invalid: errors.password }">
            <span>Password {{ form.id ? '(leave blank to keep current)' : '*' }}</span>
            <input v-model="form.password" type="password" placeholder="••••••••" />
            <small v-if="errors.password" class="err">{{ errors.password }}</small>
          </label>

          <label class="field" :class="{ invalid: errors.role }">
            <span>Role *</span>
            <select v-model="form.role">
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <small v-if="errors.role" class="err">{{ errors.role }}</small>
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
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 18px;
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
.role {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--border-soft);
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}
.role.admin {
  background: var(--accent-soft);
  color: var(--accent);
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date {
  font-size: 12px;
  color: var(--text-muted);
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
.field select {
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
