import { Product } from '../domain/product.entity.js'
import type { ProductRepository } from '../domain/product.repository.js'
import type { ProductRequestDTO } from './product-request.dto.js'

export class CreateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(data: ProductRequestDTO): Promise<Product> {
    const product = Product.create({
      name: data.name,
      brand: data.brand,
      model: data.model,
      price: data.price,
      quantity: data.quantity,
      minimum_quantity: data.minimum_quantity,
      description: {
        material_type: data.description.material_type,
        size: data.description.size,
        voltage: data.description.voltage,
      },
    })

    return await this.productRepo.save(product)
  }
}
