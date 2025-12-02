import type { Product } from '../domain/product.entity.js'
import type { ProductRepository } from '../domain/product.repository.js'

export class DeleteProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepo.findById(id)
    await this.productRepo.delete(id)
    return product!
  }
}
