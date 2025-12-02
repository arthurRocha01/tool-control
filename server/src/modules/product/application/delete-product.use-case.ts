import type { Product } from '../domain/product.entity.js'
import type { ProductRepository } from './../domain/product.repository.js'

export class DeleteProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: string): Promise<Product> {
    const product = await this.productRepo.findById(input)
    await this.productRepo.delete(input)
    return product!
  }
}
