export interface Product {
  id: string
  name: string
  brand: string
  model: string
  price: number
  quantity: number
  minimum_quantity: number
  description: {
    material_type: string
    size: string
    voltage: string
  }
}

export type StockStatus = 'all' | 'low' | 'ok'

export type ProductFormData = Omit<Product, 'id'>

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
