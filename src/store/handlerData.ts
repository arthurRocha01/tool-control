import type { Product } from '../types'

export const getProductsFromAPI = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/produtos')
    if (!response.ok) throw new Error('Erro ao buscar produtos da API')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Falha ao buscar produtos:', error)
    return []
  }
}

export const saveProduct = async (product: Product) => {
  fetch('/api/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((data) => {
      alert('Produto cadastrado com sucesso!')
      console.log(data.json())
    })
    .catch(() => console.log('Erro ao salvar produto'))
}
