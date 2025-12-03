import { Product, Settings, User } from '../types'

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
  },
  {
    id: '2',
    username: 'joao',
    password: 'joao123',
    name: 'João Silva',
  },
  {
    id: '3',
    username: 'maria',
    password: 'maria123',
    name: 'Maria Santos',
  },
]

// Mock data para produtos - Updated schema
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Furadeira de Impacto',
    brand: 'Bosch',
    model: 'GSB 13 RE',
    price: 'R$ 389,90',
    quantity: '5',
    minimum_quantity: '3',
    description: {
      material_type: 'Plástico ABS',
      size: '28cm x 8cm',
      voltage: '110V',
    },
    updated_at: '2025-11-15T10:30:00',
  },
  {
    id: '2',
    name: 'Martelo de Aço',
    brand: 'Stanley',
    model: 'STHT51512',
    price: 'R$ 45,00',
    quantity: '2',
    minimum_quantity: '5',
    description: {
      material_type: 'Aço Carbono',
      size: '30cm',
      voltage: 'N/A',
    },
    updated_at: '2025-11-20T14:00:00',
  },
  {
    id: '3',
    name: 'Chave de Fenda',
    brand: 'Tramontina',
    model: 'CF-6',
    price: 'R$ 15,90',
    quantity: '15',
    minimum_quantity: '8',
    description: {
      material_type: 'Aço Cromo-Vanádio',
      size: '15cm',
      voltage: 'N/A',
    },
    updated_at: '2025-11-25T09:15:00',
  },
  {
    id: '4',
    name: 'Serra Tico-Tico',
    brand: 'Makita',
    model: '4329',
    price: 'R$ 520,00',
    quantity: '1',
    minimum_quantity: '2',
    description: {
      material_type: 'Alumínio',
      size: '22cm x 7cm',
      voltage: '220V',
    },
    updated_at: '2025-11-18T16:45:00',
  },
  {
    id: '5',
    name: 'Alicate Universal',
    brand: 'Gedore',
    model: '8" RED',
    price: 'R$ 89,90',
    quantity: '12',
    minimum_quantity: '6',
    description: {
      material_type: 'Aço Cromo-Vanádio',
      size: '20cm',
      voltage: 'N/A',
    },
    updated_at: '2025-11-22T11:20:00',
  },
  {
    id: '6',
    name: 'Nível a Laser',
    brand: 'DeWalt',
    model: 'DW088K',
    price: 'R$ 1.250,00',
    quantity: '3',
    minimum_quantity: '2',
    description: {
      material_type: 'Plástico ABS',
      size: '12cm x 10cm',
      voltage: 'Bateria 12V',
    },
    updated_at: '2025-11-28T08:00:00',
  },
]

// Mock settings
export const mockSettings: Settings = {
  alertsEnabled: true,
  defaultUnit: 'kg',
  theme: 'light',
  language: 'pt-BR',
}

// Helper functions for localStorage
export const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem('products')
  return stored ? JSON.parse(stored) : mockProducts
}

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products))
}

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('currentUser')
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  } else {
    localStorage.removeItem('currentUser')
  }
}
