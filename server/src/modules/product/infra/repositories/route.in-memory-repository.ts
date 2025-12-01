import type { Product } from '../../domain/product.entity.js'
import type { ProductRepository } from '../../domain/product.repository.js'

export class RouteInMemoryRepository implements ProductRepository {
  items: Product[] = []
  async save(product: Product): Promise<Product> {
    product.adddMetaData('id_ldkdfjdklfj', new Date(), new Date())
    this.items.push(product)
    return product
  }

  async findAll(): Promise<Product[]> {
    return this.items
  }
}
