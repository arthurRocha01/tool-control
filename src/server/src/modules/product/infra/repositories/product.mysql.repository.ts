import { Product } from '../../domain/product.entity.js'
import type { ProductRepository } from '../../domain/product.repository.js'
import { pool } from '../../../../core/database/connection.js'
import type { OkPacket, RowDataPacket } from 'mysql2'

interface ProdutoRow extends RowDataPacket {
  name: string
  brand: string
  model: string
  price: number
  quantity: number
  minimum_quantity: number
  material_type: string
  size: string
  voltage: string
}

export class ProductMysqlRepository implements ProductRepository {
  private mapRowToProduct(row: ProdutoRow): Product {
    const product = Product.create({
      name: row.name,
      brand: row.brand,
      model: row.model,
      price: row.price,
      quantity: row.quantity,
      minimum_quantity: row.minimum_quantity,
      description: {
        material_type: row.material_type,
        size: row.size,
        voltage: row.voltage,
      },
    })

    product._setMetaData(row.id, row.data_criacao, row.updated_at)
    return product
  }

  async findAll(): Promise<Product[] | null> {
    const [rows] = await pool.query<ProdutoRow[]>(`SELECT * FROM products`)
    if (rows.length == 0) return null
    return rows.map(this.mapRowToProduct)
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await pool.query<ProdutoRow[]>(`SELECT * FROM products WHERE id = ?`, [id])
    if (!rows[0]) return null
    return this.mapRowToProduct(rows[0])
  }

  async save(product: Product): Promise<Product> {
    const { name, brand, model, price, quantity, minimum_quantity, description } =
      product.getProps()

    const [result] = await pool.query<OkPacket>(
      `INSERT INTO products (name, brand, model, price, quantity, minimum_quantity, material_type, size, voltage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        brand,
        model,
        price,
        quantity,
        minimum_quantity,
        description.material_type,
        description.size,
        description.voltage,
      ],
    )

    product._setMetaData(result.insertId.toString(), new Date(), new Date())
    return product
  }

  async edit(product: Product): Promise<Product> {
    const { name, brand, model, price, quantity, minimum_quantity, description } =
      product.getProps()

    await pool.query(
      `UPDATE products 
      SET name = ?, brand = ?, model = ?, price = ?, quantity = ?, minimum_quantity = ?, material_type = ?, size = ?, voltage = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        name,
        brand,
        model,
        price,
        quantity,
        minimum_quantity,
        description.material_type,
        description.size,
        description.voltage,
        product.getId(),
      ],
    )

    product.updatedLastModified()
    return product
  }

  async delete(id: string): Promise<void> {
    await pool.query(`DELETE FROM products WHERE id = ?`, [id])
  }
}
