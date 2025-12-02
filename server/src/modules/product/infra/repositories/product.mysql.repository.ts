import { Product } from '../../domain/product.entity.js'
import type { ProductRepository } from '../../domain/product.repository.js'
import { pool } from '../../../../core/database/connection.js'
import type { OkPacket, RowDataPacket } from 'mysql2'

interface ProdutoRow extends RowDataPacket {
  id: number
  nome: string
  marca: string
  modelo: string
  preco: number
  tipo_material: string
  tamanho: string
  tensao: string
  data_criacao: Date
  data_ultima_atualizacao: Date
}

export class ProductMysqlRepository implements ProductRepository {
  private mapRowToProduct(row: ProdutoRow): Product {
    const {
      id,
      nome,
      marca,
      modelo,
      preco,
      tipo_material,
      tamanho,
      tensao,
      data_criacao,
      data_ultima_atualizacao,
    } = row

    const product = Product.create({
      nome,
      marca,
      modelo,
      preco,
      caracteristicas: { tipo_material, tamanho, tensao },
    })

    product.adddMetaData(id.toString(), data_criacao, data_ultima_atualizacao)
    return product
  }

  async findAll(): Promise<Product[]> {
    const [rows] = await pool.query<ProdutoRow[]>(`SELECT * FROM produtos`)
    return rows.map(this.mapRowToProduct)
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await pool.query<ProdutoRow[]>(`SELECT * FROM produtos WHERE id = ?`, [id])

    if (!rows[0]) return null
    return this.mapRowToProduct(rows[0])
  }

  async save(product: Product): Promise<Product> {
    const { nome, marca, modelo, preco, caracteristicas } = product.getProps()

    const [result] = await pool.query<OkPacket>(
      `INSERT INTO produtos (nome, marca, modelo, preco, tipo_material, tamanho, tensao)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        marca,
        modelo,
        preco,
        caracteristicas.tipo_material,
        caracteristicas.tamanho,
        caracteristicas.tensao,
      ],
    )

    product.adddMetaData(result.insertId.toString(), new Date(), new Date())
    return product
  }
}
