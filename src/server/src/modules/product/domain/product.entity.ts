type DescriptionProduct = {
  material_type: string
  size: string
  voltage: string
}

export interface ProductProps {
  name: string
  brand: string
  model: string
  price: number
  quantity: number
  minimum_quantity: number
  description: DescriptionProduct
}

export class Product {
  private id?: string
  private name!: string
  private brand!: string
  private model!: string
  private price!: number
  private description!: DescriptionProduct
  private quantity!: number
  private minimum_quantity!: number
  private created_at?: Date
  private updated_at?: Date

  private constructor(props: ProductProps) {
    Object.assign(this, props)
  }

  public static create(props: ProductProps): Product {
    return new Product(props)
  }

  public edit(props: Partial<ProductProps>): Product {
    Object.assign(this, props)
    if (props.description) {
      this.description = { ...this.description, ...props.description }
    }
    this.updated_at = new Date()
    return this
  }

  public _setMetaData(id: string, created_at: Date, updated_at: Date) {
    this.id = id
    this.created_at = created_at
    this.updated_at = updated_at
  }

  public updatedLastModified() {
    this.updated_at = new Date()
  }

  public getProps(): ProductProps {
    return {
      name: this.name,
      brand: this.brand,
      model: this.model,
      price: this.price,
      quantity: this.quantity,
      minimum_quantity: this.minimum_quantity,
      description: this.description,
    }
  }

  public getId() {
    return this.id
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      model: this.model,
      price: this.price,
      quantity: this.quantity,
      minimum_quantity: this.minimum_quantity,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}
