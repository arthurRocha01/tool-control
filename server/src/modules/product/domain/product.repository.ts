import type { Product } from './product.entity.js'

export interface ProductRepository {
  save(product: Product): Promise<Product>
  findAll(): Promise<Product[]>
}
