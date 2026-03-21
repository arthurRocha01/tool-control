import { create } from 'zustand'
import { type User } from '../types'

interface AuthStore {
  currentUser: User | null
  isAuthenticated: boolean
  loginAPI: (username: string, password: string) => Promise<boolean>
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  loginAPI: async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()

        const userLogged = data.user || { username, role: 'admin' }

        set({ currentUser: userLogged, isAuthenticated: true })

        return true
      }

      return false
    } catch (error) {
      console.error('Erro de conexão com o backend:', error)
      return false
    }
  },
}))
