import type { EditProductInputDTO } from './edit-product.dto.js'
import type { ProductRepository } from '../domain/product.repository.js'
import type { Product } from '../domain/product.entity.js'

export class EditProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: EditProductInputDTO): Promise<Product> {
    const product = await this.productRepo.findById(input.id)
    product!.edit(input.data)
    return await this.productRepo.edit(product!)
  }
}
