import { Product } from '../domain/product.entity.js'
import type { ProductRepository } from './../domain/product.repository.js'
import type { ProductRequestDTO } from './product-request.dto.js'

export class CreateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(data: ProductRequestDTO): Promise<Product> {
    const product = Product.create({
      nome: data.nome,
      marca: data.marca,
      modelo: data.modelo,
      preco: data.preco,
      caracteristicas: {
        tipo_material: data.caracteristicas.tipo_material,
        tamanho: data.caracteristicas.tamanho,
        tensao: data.caracteristicas.tensao,
      },
    })

    return await this.productRepo.save(product)
  }
}
