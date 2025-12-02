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
  private nome: string
  private marca: string
  private modelo: string
  private preco: number
  private caracteristicas: Caracteristicas
  private data_criacao?: Date
  private data_ultima_atualizacao?: Date

  private constructor(props: ProductProps) {
    this.nome = props.nome
    this.marca = props.marca
    this.modelo = props.modelo
    this.preco = props.preco
    this.caracteristicas = props.caracteristicas
  }

  public static create(props: ProductProps): Product {
    const product = new Product(props)
    return product
  }

  public edit(data: ProductProps): Product {
    this.nome = data.nome
    this.marca = data.marca
    this.modelo = data.modelo
    this.preco = data.preco
    this.caracteristicas = data.caracteristicas
    this.data_ultima_atualizacao = new Date()
    return this
  }

  public adddMetaData(id: string, data_criacao: Date, data_ultima_atualizacao: Date) {
    this.id = id
    this.data_criacao = data_criacao
    this.data_ultima_atualizacao = data_ultima_atualizacao
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
}
