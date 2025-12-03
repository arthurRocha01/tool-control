import { create } from 'zustand'
import { User } from '../types'
import { mockUsers, getStoredUser, saveUser } from './mockData'

interface AuthStore {
  currentUser: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  initAuth: () => {
    const storedUser = getStoredUser()
    if (storedUser) {
      set({ currentUser: storedUser, isAuthenticated: true })
    }
  },

  login: (username: string, password: string) => {
    const user = mockUsers.find((u) => u.username === username && u.password === password)

    if (user) {
      const userWithoutPassword = { ...user, password: '' }
      saveUser(userWithoutPassword)
      set({ currentUser: userWithoutPassword, isAuthenticated: true })
      return true
    }
    return false
  },

  logout: () => {
    saveUser(null)
    set({ currentUser: null, isAuthenticated: false })
  },
}))
