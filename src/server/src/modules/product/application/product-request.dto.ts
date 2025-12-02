export interface ProductRequestDTO {
  name: string
  brand: string
  model: string
  price: number
  description: {
    material_type: string
    size: string
    voltage: string
  }
  quantity: number
  minimum_quantity: number
}
