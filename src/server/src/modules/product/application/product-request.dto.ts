export interface ProductRequestDTO {
  nome: string
  marca: string
  modelo: string
  preco: number
  caracteristicas: {
    tipo_material: string
    tamanho: string
    tensao: string
  }
}
