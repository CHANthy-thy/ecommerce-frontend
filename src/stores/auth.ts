import { defineStore } from 'pinia'

const STORAGE_KEY = 'sm_auth_user'

type UserRole = 'customer' | 'admin'

type StoredUser = { name: string; email: string; avatar: string; role: UserRole }

type AuthStateUser = StoredUser | null

function safeParseUser(json: string | null): StoredUser | null {
  if (!json) return null
  try {
    const data = JSON.parse(json) as unknown
    if (!data || typeof data !== 'object') return null
    const d = data as Partial<StoredUser>

    if (!d.name || !d.email || !d.avatar) return null
    if (d.role !== 'customer' && d.role !== 'admin') return null

    return { name: d.name, email: d.email, avatar: d.avatar, role: d.role }
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    // keep user nullable (logout) while still persisting valid user objects

    const stored = safeParseUser(localStorage.getItem(STORAGE_KEY))

    const defaultUser: StoredUser = {
      name: 'Shop_ZhenZ',
      email: 'alex.carter@shopmart.io',
      role: 'customer',
      avatar: 'https://i.pravatar.cc/150?u=alexcarter',
    }

    return {
      user: (stored ?? defaultUser) as AuthStateUser,
      isAuthenticated: Boolean(stored),
    }
  },
  actions: {
    login(email: string, _password: string) {
      const role: UserRole =
        email.toLowerCase() === 'admin@shopmart.io' ? 'admin' : 'customer'

      this.user = {
        name: role === 'admin' ? 'Admin' : 'Shop_ZhenZ',
        email,
        role,
        avatar:
          role === 'admin'
            ? 'https://i.pravatar.cc/150?u=admin'
            : 'https://i.pravatar.cc/150?u=alexcarter',
      }
      this.isAuthenticated = true

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
    },
    register(name: string, email: string) {
      this.user = {
        name,
        email,
        role: 'customer',
        avatar: 'https://i.pravatar.cc/150?u=alexcarter',
      }
      this.isAuthenticated = true

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

