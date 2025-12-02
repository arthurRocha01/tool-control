import type { Product } from '../domain/product.entity.js'
import type { ProductRepository } from '../domain/product.repository.js'

export class FindByIdProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: string): Promise<Product | null> {
    return await this.productRepo.findById(input)
  }
}
