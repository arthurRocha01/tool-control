import { Product } from '../../domain/product.entity.js'
import type { ProductRepository } from '../../domain/product.repository.js'
import { pool } from '../../../../core/database/connection.js'
import type { OkPacket, RowDataPacket } from 'mysql2'

interface ProdutoRow extends RowDataPacket {
  nome: string
  marca: string
  modelo: string
  preco: number
  tipo_material: string
  tamanho: string
  tensao: string
}

export class ProductMysqlRepository implements ProductRepository {
  private mapRowToProduct(row: ProdutoRow): Product {
    const product = Product.create({
      nome: row.nome,
      marca: row.marca,
      modelo: row.modelo,
      preco: row.preco,
      caracteristicas: {
        tipo_material: row.tipo_material,
        tamanho: row.tamanho,
        tensao: row.tensao,
      },
    })

    product._setMetaData(row.id, row.data_criacao, row.data_ultima_atualizacao)
    return product
  }

  async findAll(): Promise<Product[] | null> {
    const [rows] = await pool.query<ProdutoRow[]>(`SELECT * FROM produtos`)
    if (rows.length == 0) return null
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

    product._setMetaData(result.insertId.toString(), new Date(), new Date())
    return product
  }

  async edit(product: Product): Promise<Product> {
    const { nome, marca, modelo, preco, caracteristicas } = product.getProps()

    await pool.query(
      `UPDATE produtos 
      SET nome = ?, marca = ?, modelo = ?, preco = ?, tipo_material = ?, tamanho = ?, tensao = ?, data_ultima_atualizacao = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        nome,
        marca,
        modelo,
        preco,
        caracteristicas.tipo_material,
        caracteristicas.tamanho,
        caracteristicas.tensao,
        product.getId(),
      ],
    )

    product.updatedLastModified()
    return product
  }

  async delete(id: string): Promise<void> {
    await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])
  }
}
