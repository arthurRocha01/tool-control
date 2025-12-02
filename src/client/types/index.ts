export interface Product {
  id: string
  name: string
  brand: string
  model: string
  price: string
  quantity: string
  minimum_quantity: string
  description: {
    material_type: string
    size: string
    voltage: string
  }
  updated_at?: string
  created_at?: string
}

export type StockStatus = 'all' | 'low' | 'ok'

export type ProductFormData = Omit<Product, 'id'>

export const initialFormData: ProductFormData = {
  name: '',
  brand: '',
  model: '',
  price: '',
  quantity: '',
  minimum_quantity: '',
  description: {
    material_type: '',
    size: '',
    voltage: '',
  },
}

export interface StockAlert {
  product: Product
  message: string
  severity: 'warning' | 'critical'
}

// Settings types
export interface Settings {
  alertsEnabled: boolean
  defaultUnit: 'kg' | 'g' | 'cm' | 'mm' | 'volts'
  theme: 'light' | 'dark'
  language: string
}
