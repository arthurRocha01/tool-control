import { Product, Settings, User } from '../types'

// Mock users continuam os mesmos (ou você pode implementar login via API também)
export const mockUsers: User[] = [
  { id: '1', username: 'admin', password: 'admin123', name: 'Administrador' },
  { id: '2', username: 'joao', password: 'joao123', name: 'João Silva' },
  { id: '3', username: 'maria', password: 'maria123', name: 'Maria Santos' },
]

// Mock settings
export const mockSettings: Settings = {
  alertsEnabled: true,
  defaultUnit: 'kg',
  theme: 'light',
  language: 'pt-BR',
}

// ====== API PRODUCTS ======
export const getProductsFromAPI = async (): Promise<Product[]> => {
  try {
    const response = await fetch('http://localhost:5000/produtos')
    if (!response.ok) throw new Error('Erro ao buscar produtos da API')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Falha ao buscar produtos:', error)
    // fallback para caso a API falhe, pode retornar um array vazio ou os mockProducts
    return []
  }
}

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products))
}

export const saveProduct = (product: Product) => {
  fetch('http://localhost:5000/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((data) => {
      alert('Produto cadastrado com sucesso!')
      console.log(data.json())
    })
    .catch(() => console.log('Erro ao salvar produto'))
}

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('currentUser')
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user: User | null) => {
  if (user) localStorage.setItem('currentUser', JSON.stringify(user))
  else localStorage.removeItem('currentUser')
}
