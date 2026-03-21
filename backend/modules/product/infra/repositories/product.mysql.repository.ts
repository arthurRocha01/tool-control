import { Product } from '../../domain/product.entity.js'
import { pool } from '../../../../core/database/connection.js'
import type { ProductRepository } from '../../domain/product.repository.js'

export interface ProdutoRow {
  id: number
  name: string
  brand: string
  model: string
  price: number
  quantity: number
  minimum_quantity: number
  material_type: string
  size: string
  voltage: string
  created_at: Date
  updated_at: Date
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

    product._setMetaData(row.id.toString(), row.created_at, row.updated_at)
    return product
  }

  async findAll(): Promise<Product[] | null> {
    const { rows } = await pool.query<ProdutoRow>(`SELECT * FROM products`)
    if (rows.length == 0) return null
    return rows.map(this.mapRowToProduct)
  }

  async findById(id: string): Promise<Product | null> {
    const { rows } = await pool.query<ProdutoRow>(`SELECT * FROM products WHERE id = $1 LIMIT 1`, [
      id,
    ])
    if (!rows[0]) return null
    return this.mapRowToProduct(rows[0])
  }

  async save(product: Product): Promise<Product> {
    const { name, brand, model, price, quantity, minimum_quantity, description } =
      product.getProps()

    const { rows } = await pool.query<ProdutoRow>(
      `INSERT INTO products (name, brand, model, price, quantity, minimum_quantity, material_type, size, voltage)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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

    const savedData = rows[0]

    product._setMetaData(savedData.id.toString(), new Date(), new Date())
    return product
  }

  async edit(product: Product): Promise<Product> {
    const { name, brand, model, price, quantity, minimum_quantity, description } =
      product.getProps()

    await pool.query(
      `UPDATE products 
      SET name = $1, brand = $2, model = $3, price = $4, quantity = $5, minimum_quantity = $6, material_type = $7, size = $8, voltage = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10`,
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
    await pool.query(`DELETE FROM products WHERE id = $1`, [id])
  }
}
