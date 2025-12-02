import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProductFormData } from '../types'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    model: '',
    price: 0,
    quantity: 0,
    minimum_quantity: 0,
    description: {
      material_type: '',
      size: '',
      voltage: '',
    },
    updated_at: Date.prototype,
    created_at: Date.prototype,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        price: formData.price,
        quantity: formData.quantity,
        minimum_quantity: formData.minimum_quantity,
        description: {
          material_type: formData.description.material_type,
          size: formData.description.size,
          voltage: formData.description.voltage,
        },
      }

      const response = await fetch('http://localhost:5000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar o produto')
      }

      alert('Produto cadastrado com sucesso!')
      navigate('/products')
    } catch (err) {
      setError(`Erro ao cadastrar o produto. Tente novamente: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCharacteristicChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [field]: value,
      },
    }))
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Cadastrar Produto</h1>
        <p className='text-gray-600'>Adicione um novo item ao estoque</p>
      </div>

      <div className='bg-white rounded-xl p-8 border border-gray-200 max-w-4xl'>
        {error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>}

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
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
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
                  onChange={(e) =>
                    handleInputChange('minimum_quantity', parseInt(e.target.value) || 0)
                  }
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
              Características Específicas
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tipo do Material
                </label>
                <input
                  type='text'
                  value={formData.description.material_type}
                  onChange={(e) => handleCharacteristicChange('material', e.target.value)}
                  placeholder='Ex: Aço Carbono'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Tamanho</label>
                <input
                  type='text'
                  value={formData.description.size}
                  onChange={(e) => handleCharacteristicChange('size', e.target.value)}
                  placeholder='Ex: 15cm'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tensão Elétrica
                </label>
                <input
                  type='text'
                  value={formData.description.voltage}
                  onChange={(e) => handleCharacteristicChange('voltage', e.target.value)}
                  placeholder='Ex: 110V'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className='flex gap-4 pt-6 border-t border-gray-200'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
            >
              <i className='hgi-stroke hgi-checkmark-circle-01'></i>
              {loading ? 'Salvando...' : 'Salvar Produto'}
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

export default AddProduct
