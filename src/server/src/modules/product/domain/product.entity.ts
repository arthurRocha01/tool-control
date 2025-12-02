type Caracteristicas = {
  tipo_material: string
  tamanho: string
  tensao: string
}

export interface ProductProps {
  nome: string
  marca: string
  modelo: string
  preco: number
  caracteristicas: Caracteristicas
}

export class Product {
  private id?: string
  private nome!: string
  private marca!: string
  private modelo!: string
  private preco!: number
  private caracteristicas!: Caracteristicas
  private data_criacao?: Date
  private data_ultima_atualizacao?: Date

  private constructor(props: ProductProps) {
    Object.assign(this, props)
  }

  public static create(props: ProductProps): Product {
    return new Product(props)
  }

  public edit(props: Partial<ProductProps>): Product {
    Object.assign(this, props)
    if (props.caracteristicas) {
      this.caracteristicas = { ...this.caracteristicas, ...props.caracteristicas }
    }
    this.data_ultima_atualizacao = new Date()
    return this
  }

  public _setMetaData(id: string, data_criacao: Date, data_ultima_atualizacao: Date) {
    this.id = id
    this.data_criacao = data_criacao
    this.data_ultima_atualizacao = data_ultima_atualizacao
  }

  public updatedLastModified() {
    this.data_ultima_atualizacao = new Date()
  }

  public getProps(): ProductProps {
    return {
      nome: this.nome,
      marca: this.marca,
      modelo: this.modelo,
      preco: this.preco,
      caracteristicas: this.caracteristicas,
    }
  }

  public getId() {
    return this.id
  }
}
