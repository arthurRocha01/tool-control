import type { Product } from '../domain/product.entity.js'
import type { ProductRepository } from '../domain/product.repository.js'

export class ListAllProductCaseUse {
  constructor(private productRepo: ProductRepository) {}
  async execute(): Promise<Product[] | null> {
    return await this.productRepo.findAll()
  }
}
