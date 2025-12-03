import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { initialFormData, ProductFormData, Product } from '../types'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [loading, setLoading] = useState(true)

  // ---------------------------
  //  CARREGAR PRODUTO EXISTENTE
  // ---------------------------
  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        const res = await fetch(`http://localhost:5000/produtos/${id}`)
        const data: Product = await res.json()
        const { name, brand, model, price, quantity, minimum_quantity, description } = data
        setFormData({
          name,
          brand,
          model,
          price,
          quantity,
          minimum_quantity,
          description: { ...description },
        })
      } catch (err) {
        console.error('Erro ao carregar produto', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  // ---------------------------
  // FUNÇÃO DE UPDATE
  // ---------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      alert('Produto atualizado com sucesso!')
      navigate('/products')
    } catch (err) {
      console.error('Erro ao editar produto', err)
    }
  }

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDescriptionChange = (field: keyof ProductFormData['description'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: { ...prev.description, [field]: value },
    }))
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Editar Produto</h1>
        <p className='text-gray-600'>Atualize as informações do produto</p>
      </div>

      <div className='bg-white rounded-xl p-8 border border-gray-200 max-w-4xl'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Informações Básicas */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <i className='hgi-stroke hgi-package'></i>
              Informações Básicas
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nome do Produto *
                </label>
                <input
                  type='text'
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder='Ex: Furadeira de Impacto'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Marca *</label>
                <input
                  type='text'
                  required
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder='Ex: Bosch'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Modelo *</label>
                <input
                  type='text'
                  required
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder='Ex: GSB 13 RE'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Preço *</label>
                <input
                  type='text'
                  required
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder='Ex: R$ 389,90'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <i className='hgi-stroke hgi-analytics-01'></i>
              Controle de Estoque
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quantidade Atual *
                </label>
                <input
                  type='number'
                  required
                  min='0'
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder='0'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quantidade Mínima *
                </label>
                <input
                  type='number'
                  required
                  min='0'
                  value={formData.minimum_quantity}
                  onChange={(e) => handleInputChange('minimum_quantity', e.target.value)}
                  placeholder='0'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Sistema alertará quando atingir este valor
                </p>
              </div>
            </div>
          </div>

          {/* Características */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <i className='hgi-stroke hgi-text'></i>
              Características do Produto
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tipo de Material
                </label>
                <input
                  type='text'
                  value={formData.description.material_type}
                  onChange={(e) => handleDescriptionChange('material_type', e.target.value)}
                  placeholder='Ex: Aço Carbono'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Tamanho</label>
                <input
                  type='text'
                  value={formData.description.size}
                  onChange={(e) => handleDescriptionChange('size', e.target.value)}
                  placeholder='Ex: 15cm'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tensão Elétrica
                </label>
                <input
                  type='text'
                  value={formData.description.voltage}
                  onChange={(e) => handleDescriptionChange('voltage', e.target.value)}
                  placeholder='Ex: 110V ou N/A para produtos sem voltagem'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className='flex gap-4 pt-6 border-t border-gray-200'>
            <button
              type='submit'
              className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
            >
              <i className='hgi-stroke hgi-checkmark-circle-01'></i>
              Atualizar Produto
            </button>
            <button
              type='button'
              onClick={() => navigate('/products')}
              className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium'
            >
              <i className='hgi-stroke hgi-cancel-01'></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEdit
