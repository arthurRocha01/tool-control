import type { Product } from './product.entity.js'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  save(product: Product): Promise<Product>
  edit(product: Product): Promise<Product>
  delete(id: string): Promise<void>
}
