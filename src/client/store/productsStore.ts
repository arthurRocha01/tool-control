import { create } from 'zustand'
import { Product } from '../types'
import { getProductsFromAPI, saveProduct, saveProducts } from './mockData'

interface ProductsStore {
  products: Product[]
  initProducts: () => void
  addProduct: (product: Omit<Product, 'id' | 'updated_at'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],

  initProducts: async () => {
    const storedProducts = await getProductsFromAPI()
    set({ products: storedProducts })
  },

  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      updated_at: new Date().toISOString(),
    }
    const updatedProducts = [...get().products, newProduct]
    set({ products: updatedProducts })
    saveProducts(updatedProducts)

    saveProduct(newProduct)
  },

  updateProduct: (id, productData) => {
    const updatedProducts = get().products.map((p) =>
      p.id === id ? { ...p, ...productData, updated_at: new Date().toISOString() } : p,
    )
    set({ products: updatedProducts })

    const updatedProduct = updatedProducts.find((p) => p.id === id)
    if (updatedProduct) saveProduct(updatedProduct)
  },

  deleteProduct: (id) => {
    fetch(`http://localhost:5000/produtos/${id}`, { method: 'DELETE' }).catch(() => {
      alert('Erro ao excluir produto.')
    })

    const updatedProducts = get().products.filter((p) => p.id !== id)
    set({ products: updatedProducts })
    saveProducts(updatedProducts)
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id)
  },
}))
