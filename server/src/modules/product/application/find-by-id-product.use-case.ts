import type { Product } from '../domain/product.entity.js'
import type { ProductRepository } from '../domain/product.repository.js'

export class FindByIdProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: string): Promise<Product | null> {
    const result = await this.productRepo.findById(input)

    if (!result) return null
    return result
  }
}
