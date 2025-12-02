import type { CreateProductInputDTO } from './create-product.dto.js'

export interface EditProductInputDTO {
  id: string
  data: CreateProductInputDTO
}
