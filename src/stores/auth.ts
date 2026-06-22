import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'Alex Carter',
      email: 'alex.carter@shopmart.io',
      avatar: 'https://i.pravatar.cc/150?u=alexcarter',
    } as { name: string; email: string; avatar: string } | null,
    isAuthenticated: true,
  }),
  actions: {
    login(email: string, _password: string) {
      this.user = {
        name: 'Alex Carter',
        email,
        avatar: 'https://i.pravatar.cc/150?u=alexcarter',
      }
      this.isAuthenticated = true
    },
    register(name: string, email: string) {
      this.user = {
        name,
        email,
        avatar: 'https://i.pravatar.cc/150?u=alexcarter',
      }
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})