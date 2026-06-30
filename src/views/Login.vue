<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const show = reactive({ password: false })
const errors = reactive<{ email?: string; password?: string; general?: string }>({})
const submitting = ref(false)

function validate() {
  errors.email = ''
  errors.password = ''
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.password) errors.password = 'Password is required'
  else if (form.password.length < 6) errors.password = 'Min 6 characters'
  return !errors.email && !errors.password
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  errors.general = ''

  try {
    await auth.login(form.email, form.password)
    router.push('/')
  } catch (error: any) {
    errors.general = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="auth">
    <div class="card">
      <div class="head">
        <span class="brand-mark">SM</span>
        <h2>Welcome back</h2>
        <p>Sign in to continue your shopping.</p>
      </div>

      <form @submit.prevent="submit" novalidate>
        <label class="field" :class="{ invalid: errors.email }">
          <span>Email</span>
          <div class="input">
            <span class="micon">mail</span>
            <input v-model="form.email" type="email" placeholder="you@email.com" autocomplete="email" />
          </div>
          <small v-if="errors.email">{{ errors.email }}</small>
        </label>

        <label class="field" :class="{ invalid: errors.password }">
          <span>Password</span>
          <div class="input">
            <span class="micon">lock</span>
            <input
              v-model="form.password"
              :type="show.password ? 'text' : 'password'"
              placeholder="Your password"
              autocomplete="current-password"
            />
            <button type="button" class="eye" @click="show.password = !show.password" aria-label="Toggle visibility">
              {{ show.password ? '🙈' : '👁️' }}
            </button>
          </div>
          <small v-if="errors.password">{{ errors.password }}</small>
        </label>

        <small v-if="errors.general" class="general-error">{{ errors.general }}</small>

        <div class="row">
          <label class="check">
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" class="muted-link">Forgot password?</a>
        </div>

        <button class="btn primary lg" :disabled="submitting" type="submit">
          <span v-if="!submitting">Sign in</span>
          <span v-else class="spin"></span>
        </button>

        <p class="alt">
          Don't have an account?
          <RouterLink to="/register">Create one</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 40px 20px;
}
.card {
  width: 100%;
  max-width: 440px;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-xl);
  padding: 32px;
  box-shadow: var(--shadow);
}
.head {
  text-align: center;
  margin-bottom: 22px;
}
.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-accent);
  letter-spacing: 0.04em;
}
.head h2 {
  margin: 0 0 6px;
  font-size: 24px;
}
.head p {
  color: var(--text-muted);
  font-size: 14px;
}

.field {
  display: block;
  margin-bottom: 14px;
}
.field > span {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 6px;
}
.input {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #fff;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.input:focus-within {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.input input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 14.5px;
  color: var(--text-h);
}
.micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 18px;
  color: var(--text-muted);
}
.eye {
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}
.field.invalid .input {
  border-color: var(--danger);
  box-shadow: 0 0 0 4px var(--danger-soft);
}
.field small, .general-error {
  display: block;
  color: var(--danger);
  font-size: 12.5px;
  margin-top: 6px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0 16px;
  font-size: 13.5px;
  color: var(--text-muted);
}
.check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.muted-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}
.muted-link:hover {
  text-decoration: underline;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  padding: 0 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  border: 0;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
  width: 100%;
}
.btn.lg {
  height: 50px;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
}
.btn.primary:hover {
  transform: translateY(-1px);
}
.btn.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.spin {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.alt {
  text-align: center;
  margin-top: 16px;
  color: var(--text-muted);
  font-size: 14px;
}
.alt a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}
.alt a:hover {
  text-decoration: underline;
}
</style>