<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const tab = ref<'personal' | 'password' | 'preferences'>('personal')

const profile = reactive({
    name: auth.user?.name ?? 'SkinCare Haven',
    email: auth.user?.email ?? 'skincare.customer@skincarehaven.com',
    phone: '+1 555 000 1234',
    address: '123 Beauty Boulevard, Los Angeles, CA 90001',
  })
const profileErrors = reactive<Record<string, string>>({})
const saving = ref(false)
const saved = ref(false)

const password = reactive({ current: '', next: '', confirm: '' })
const passwordErrors = reactive<Record<string, string>>({})
const pwdSaving = ref(false)
const pwdSaved = ref(false)

const prefs = reactive({ newsletter: true, sms: false, theme: 'light' })

const stats = computed(() => [
  { label: 'Orders', value: 24, icon: 'package' },
  { label: 'Wishlist', value: 7, icon: 'favorite' },
  { label: 'Reviews', value: 12, icon: 'star' },
  { label: 'Points', value: 1240, icon: 'toll' },
])

function saveProfile() {
  for (const k of Object.keys(profileErrors)) delete profileErrors[k]
  if (!profile.name.trim() || profile.name.trim().length < 3) profileErrors.name = 'Name is too short'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) profileErrors.email = 'Enter a valid email'
  if (Object.keys(profileErrors).length) return
  saving.value = true
  setTimeout(() => {
    if (auth.user) auth.user.name = profile.name
    saving.value = false
    saved.value = true
    setTimeout(() => (saved.value = false), 2200)
  }, 600)
}

function changePassword() {
  for (const k of Object.keys(passwordErrors)) delete passwordErrors[k]
  if (password.current.length < 6) passwordErrors.current = 'Enter your current password'
  if (password.next.length < 6) passwordErrors.next = 'Min 6 characters'
  if (password.next !== password.confirm) passwordErrors.confirm = 'Passwords do not match'
  if (Object.keys(passwordErrors).length) return
  pwdSaving.value = true
  setTimeout(() => {
    password.current = password.next = password.confirm = ''
    pwdSaving.value = false
    pwdSaved.value = true
    setTimeout(() => (pwdSaved.value = false), 2200)
  }, 700)
}
</script>

<template>
  <div class="page container">
    <header class="head">
      <div class="who">
        <img :src="auth.user?.avatar" :alt="profile.name" />
        <div>
          <h1>{{ profile.name }}</h1>
          <p class="muted">{{ profile.email }}</p>
        </div>
      </div>
      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <span class="micon">{{ s.icon }}</span>
          <div>
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="layout">
      <aside class="side">
        <button :class="{ active: tab === 'personal' }" @click="tab = 'personal'">
          <span class="micon">person</span> Personal information
        </button>
        <button :class="{ active: tab === 'password' }" @click="tab = 'password'">
          <span class="micon">lock</span> Change password
        </button>
        <button :class="{ active: tab === 'preferences' }" @click="tab = 'preferences'">
          <span class="micon">tune</span> Preferences
        </button>
        <RouterLink to="/orders" class="link">
          <span class="micon">receipt_long</span> My orders
        </RouterLink>
        <RouterLink to="/wishlist" class="link">
          <span class="micon">favorite</span> My wishlist
        </RouterLink>
      </aside>

      <section class="content">
        <!-- PERSONAL -->
        <div v-if="tab === 'personal'" class="card">
          <h3>Personal information</h3>
          <p class="muted">Update your account details and shipping address.</p>

          <div class="grid2">
            <label class="field" :class="{ invalid: profileErrors.name }">
              <span>Full name</span>
              <input v-model="profile.name" type="text" />
              <small v-if="profileErrors.name">{{ profileErrors.name }}</small>
            </label>
            <label class="field" :class="{ invalid: profileErrors.email }">
              <span>Email</span>
              <input v-model="profile.email" type="email" />
              <small v-if="profileErrors.email">{{ profileErrors.email }}</small>
            </label>
            <label class="field">
              <span>Phone</span>
              <input v-model="profile.phone" type="tel" />
            </label>
            <label class="field">
              <span>Country</span>
              <select>
                <option>United States</option>
                <option>Cambodia</option>
                <option>Singapore</option>
                <option>United Kingdom</option>
              </select>
            </label>
            <label class="field full">
              <span>Address</span>
              <input v-model="profile.address" type="text" />
            </label>
          </div>

          <div class="actions">
            <span v-if="saved" class="ok"><span class="micon">check_circle</span> Saved</span>
            <button class="btn primary" :disabled="saving" @click="saveProfile">
              <span v-if="!saving">Save changes</span>
              <span v-else class="spin"></span>
            </button>
          </div>
        </div>

        <!-- PASSWORD -->
        <div v-else-if="tab === 'password'" class="card">
          <h3>Change password</h3>
          <p class="muted">Choose a strong password you don't use anywhere else.</p>

          <label class="field" :class="{ invalid: passwordErrors.current }">
            <span>Current password</span>
            <input v-model="password.current" type="password" />
            <small v-if="passwordErrors.current">{{ passwordErrors.current }}</small>
          </label>
          <div class="grid2">
            <label class="field" :class="{ invalid: passwordErrors.next }">
              <span>New password</span>
              <input v-model="password.next" type="password" />
              <small v-if="passwordErrors.next">{{ passwordErrors.next }}</small>
            </label>
            <label class="field" :class="{ invalid: passwordErrors.confirm }">
              <span>Confirm new password</span>
              <input v-model="password.confirm" type="password" />
              <small v-if="passwordErrors.confirm">{{ passwordErrors.confirm }}</small>
            </label>
          </div>

          <div class="actions">
            <span v-if="pwdSaved" class="ok"><span class="micon">check_circle</span> Password updated</span>
            <button class="btn primary" :disabled="pwdSaving" @click="changePassword">
              <span v-if="!pwdSaving">Update password</span>
              <span v-else class="spin"></span>
            </button>
          </div>
        </div>

        <!-- PREFERENCES -->
        <div v-else class="card">
          <h3>Preferences</h3>
          <p class="muted">Customize how SkinCare Haven communicates with you.</p>

          <div class="pref">
            <div>
              <strong>Email newsletter</strong>
              <span>New drops, sales and weekly picks.</span>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="prefs.newsletter" />
              <span></span>
            </label>
          </div>
          <div class="pref">
            <div>
              <strong>SMS updates</strong>
              <span>Order status via text message.</span>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="prefs.sms" />
              <span></span>
            </label>
          </div>

          <div class="theme">
            <strong>Theme</strong>
            <div class="theme-row">
              <label class="t-opt" :class="{ active: prefs.theme === 'light' }">
                <input v-model="prefs.theme" type="radio" value="light" />
                <span>☀️ Light</span>
              </label>
              <label class="t-opt" :class="{ active: prefs.theme === 'dark' }">
                <input v-model="prefs.theme" type="radio" value="dark" />
                <span>🌙 Dark</span>
              </label>
              <label class="t-opt" :class="{ active: prefs.theme === 'system' }">
                <input v-model="prefs.theme" type="radio" value="system" />
                <span>🖥️ System</span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 32px 20px 48px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #1f1d2e 0%, #0b0a14 100%);
  color: #fff;
  border-radius: var(--r-xl);
  padding: 24px;
}
.who {
  display: flex;
  align-items: center;
  gap: 16px;
}
.who img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
}
.who h1 {
  color: #fff;
  font-size: 22px;
  margin: 0 0 4px;
}
.muted {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
}
.who .muted {
  color: #c8c6d0;
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 14px;
  border-radius: 14px;
  min-width: 120px;
}
.stat .micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 22px;
  color: #c4b5fd;
}
.stat div {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.stat strong {
  color: #fff;
  font-size: 16px;
}
.stat span {
  color: #c8c6d0;
  font-size: 11.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}
.side {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: sticky;
  top: 88px;
}
.side button,
.side .link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  background: transparent;
  border: 0;
  color: var(--text);
  font-size: 14.5px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 140ms ease, color 140ms ease;
}
.side .link {
  color: var(--text);
}
.side button:hover,
.side .link:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
.side button.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
.side .micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 18px;
}

.content .card {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--r-lg);
  padding: 28px;
}
.content h3 {
  margin: 0 0 4px;
}
.content .muted {
  margin: 0 0 18px;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.field {
  display: block;
  margin-bottom: 14px;
}
.field.full {
  grid-column: 1 / -1;
}
.field > span {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 6px;
}
.field input,
.field select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 14.5px;
  color: var(--text-h);
  outline: 0;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.field input:focus,
.field select:focus {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.field.invalid input {
  border-color: var(--danger);
  box-shadow: 0 0 0 4px var(--danger-soft);
}
.field small {
  display: block;
  color: var(--danger);
  font-size: 12.5px;
  margin-top: 6px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
.ok {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #059669;
  font-size: 13.5px;
  font-weight: 600;
}
.ok .micon {
  font-family: 'Material Symbols Rounded', 'Material Icons';
  font-size: 18px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  border: 0;
  cursor: pointer;
  transition: transform 160ms ease, opacity 160ms ease, box-shadow 160ms ease;
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
  width: 16px;
  height: 16px;
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

.pref {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-soft);
  gap: 16px;
}
.pref:last-of-type {
  border-bottom: 0;
}
.pref strong {
  display: block;
  color: var(--text-h);
  font-size: 14.5px;
  margin-bottom: 2px;
}
.pref span {
  color: var(--text-muted);
  font-size: 13px;
}
.switch {
  position: relative;
  width: 44px;
  height: 26px;
  flex: none;
}
.switch input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.switch span {
  position: absolute;
  inset: 0;
  background: var(--border);
  border-radius: 999px;
  transition: background 180ms ease;
}
.switch span::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: transform 200ms ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.switch input:checked + span {
  background: var(--accent);
}
.switch input:checked + span::before {
  transform: translateX(18px);
}

.theme {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border-soft);
}
.theme > strong {
  display: block;
  color: var(--text-h);
  font-size: 14.5px;
  margin-bottom: 10px;
}
.theme-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.t-opt {
  cursor: pointer;
}
.t-opt input {
  display: none;
}
.t-opt span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13.5px;
  color: var(--text);
  background: #fff;
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
}
.t-opt:hover span {
  border-color: var(--accent-border);
  color: var(--accent);
}
.t-opt.active span {
  background: var(--accent-soft);
  border-color: var(--accent-border);
  color: var(--accent);
  font-weight: 600;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
  .side button,
  .side .link {
    white-space: nowrap;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>