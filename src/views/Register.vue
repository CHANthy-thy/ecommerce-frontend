<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({ name: '', email: '', password: '', confirm: '' })
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.name.trim() || form.name.trim().length < 3) errors.name = 'Please enter your full name'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (form.password.length < 6) errors.password = 'Min 6 characters'
  if (form.password !== form.confirm) errors.confirm = 'Passwords do not match'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) return
  submitting.value = true
  setTimeout(() => {
    auth.register(form.name, form.email)
    submitting.value = false
    // Customer-only frontend: new accounts are always 'customer'
    // Admin access remains restricted by router guard.
    router.push('/')
  }, 500)
}
</script>

<template>
  <div class="auth">
    <div class="card">
      <div class="head">
        <span class="brand-mark">SM</span>
        <h2>Create your account</h2>
        <p>Join SkinCare Haven in a few seconds.</p>
      </div>

      <form @submit.prevent="submit" novalidate>
        <label class="field" :class="{ invalid: errors.name }">
          <span>Full name</span>
          <div class="input">
            <span class="micon">person</span>
            <input v-model="form.name" type="text" placeholder="Alex Carter" autocomplete="name" />
          </div>
          <small v-if="errors.name">{{ errors.name }}</small>
        </label>

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
            <input v-model="form.password" type="password" placeholder="At least 6 characters" autocomplete="new-password" />
          </div>
          <small v-if="errors.password">{{ errors.password }}</small>
        </label>

        <label class="field" :class="{ invalid: errors.confirm }">
          <span>Confirm password</span>
          <div class="input">
            <span class="micon">lock_reset</span>
            <input v-model="form.confirm" type="password" placeholder="Repeat your password" autocomplete="new-password" />
          </div>
          <small v-if="errors.confirm">{{ errors.confirm }}</small>
        </label>

        <label class="check">
          <input type="checkbox" required />
          I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </label>

        <button class="btn primary lg" :disabled="submitting" type="submit">
          <span v-if="!submitting">Create account</span>
          <span v-else class="spin"></span>
        </button>

        <p class="alt">
          Already have an account?
          <RouterLink to="/login">Sign in</RouterLink>
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
  max-width: 480px;
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
.field.invalid .input {
  border-color: var(--danger);
  box-shadow: 0 0 0 4px var(--danger-soft);
}
.field small {
  display: block;
  color: var(--danger);
  font-size: 12.5px;
  margin-top: 6px;
}
.check {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 6px 0 16px;
  font-size: 13.5px;
  color: var(--text);
}
.check a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}
.check a:hover {
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
  width: 100%;
}
.btn.lg {
  height: 50px;
}
.btn.primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  color: #fff;
  box-shadow: var(--shadow-accent);
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
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