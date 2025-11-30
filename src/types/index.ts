export interface Product {
  id: string
  name: string
  brand: string
  model: string
  quantity: number
  minQuantity: number
  characteristics: {
    material?: string
    size?: string
    weight?: string
    voltage?: string
  }
  photo?: string
  addedDate: string
}

export type ProductFormData = Omit<Product, 'id' | 'addedDate'>

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
