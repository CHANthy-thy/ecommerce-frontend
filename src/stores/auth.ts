import { defineStore } from 'pinia'
import { authApi } from '@/api'

const TOKEN_KEY = 'sm_auth_token'
const USER_KEY = 'sm_auth_user'

type UserRole = 'customer' | 'admin' | 'user'

type StoredUser = {
  id: number
  name: string
  email: string
  avatar: string
  role: UserRole
}

function safeParseUser(json: string | null): StoredUser | null {
  if (!json) return null
  try {
    const data = JSON.parse(json) as unknown
    if (!data || typeof data !== 'object') return null
    const d = data as Partial<StoredUser>

    if (!d.id || !d.name || !d.email || !d.avatar) return null
    if (d.role !== 'customer' && d.role !== 'admin' && d.role !== 'user') return null

    // Normalize 'user' to 'customer' for frontend
    const role = d.role === 'user' ? 'customer' : d.role

    return { id: d.id, name: d.name, email: d.email, avatar: d.avatar, role: role as UserRole }
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const stored = safeParseUser(localStorage.getItem(USER_KEY))

    return {
      user: stored as StoredUser | null,
      isAuthenticated: Boolean(stored),
      token: localStorage.getItem(TOKEN_KEY),
    }
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const response = await authApi.login({ email, password })
        const { access_token, data } = response.data

        // Normalize 'user' role to 'customer'
        const normalizedRole = (data.role === 'user' ? 'customer' : data.role) as UserRole

        this.token = access_token
        this.user = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: normalizedRole || 'customer',
          avatar: 'https://i.pravatar.cc/150?u=' + data.email,
        }
        this.isAuthenticated = true

        localStorage.setItem(TOKEN_KEY, access_token)
        localStorage.setItem(USER_KEY, JSON.stringify(this.user))
      } catch (error) {
        throw error
      }
    },

    async register(name: string, email: string, password: string, password_confirmation: string): Promise<void> {
      try {
        const response = await authApi.register({
          name,
          email,
          password,
          password_confirmation,
        })

        // Backend /register does NOT return access_token.
        // Keep user logged out after successful registration.
        const { data } = response.data

        this.token = null
        this.isAuthenticated = false

        // Normalize 'user' role to 'customer'
        const normalizedRole = data?.role === 'user' ? 'customer' : data?.role

        this.user = data
          ? {
              id: data.id,
              name: data.name,
              email: data.email,
              role: (normalizedRole as UserRole) || 'customer',
              avatar: 'https://i.pravatar.cc/150?u=' + data.email,
            }
          : null

        // Do not persist a token from registration.
        if (this.user) localStorage.setItem(USER_KEY, JSON.stringify(this.user))
      } catch (error) {
        throw error
      }
    },

    async logout(): Promise<void> {
      try {
        if (this.token) {
          await authApi.logout()
        }
      } catch {
        // Ignore errors on logout
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    },

    async fetchProfile(): Promise<void> {
      try {
        const response = await authApi.getProfile()
        const { data } = response.data

        // Normalize 'user' role to 'customer'
        const normalizedRole = (data.role === 'user' ? 'customer' : data.role) as UserRole

        this.user = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: normalizedRole || 'customer',
          avatar: 'https://i.pravatar.cc/150?u=' + data.email,
        }
        localStorage.setItem(USER_KEY, JSON.stringify(this.user))
      } catch (error) {
        throw error
      }
    },

    async updateProfile(data: { name: string; email: string }): Promise<void> {
      try {
        await authApi.updateProfile(data)
        if (this.user) {
          this.user.name = data.name
          this.user.email = data.email
          this.user.avatar = 'https://i.pravatar.cc/150?u=' + data.email
          localStorage.setItem(USER_KEY, JSON.stringify(this.user))
        }
      } catch (error) {
        throw error
      }
    },

    async changePassword(data: { current_password: string; password: string; password_confirmation: string }): Promise<void> {
      try {
        await authApi.changePassword(data)
      } catch (error) {
        throw error
      }
    },
  },
})

