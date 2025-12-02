import type { ProductRepository } from '../domain/product.repository.js'
import type { Product } from '../domain/product.entity.js'
import type { ProductRequestDTO } from './product-request.dto.js'

export class EditProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(id: string, data: ProductRequestDTO): Promise<Product> {
    const product = await this.productRepo.findById(id)
    product!.edit(data)
    return await this.productRepo.edit(product!)
  }
}
