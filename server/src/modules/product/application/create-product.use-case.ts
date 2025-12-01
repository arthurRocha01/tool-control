import { Product } from '../domain/product.entity.js'
import type { ProductRepository } from './../domain/product.repository.js'
import type { CreateProductInputDTO } from './create-product.dto.js'

export class CreateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: CreateProductInputDTO): Promise<Product> {
    const product = Product.create({
      nome: input.nome,
      marca: input.marca,
      modelo: input.modelo,
      preco: input.preco,
      caracteristicas: {
        tipo_material: input.caracteristicas.tipo_material,
        tamanho: input.caracteristicas.tamanho,
        tensao: input.caracteristicas.tensao,
      },
    })

    const productSaved = await this.productRepo.save(product)

    return productSaved
  }
}
