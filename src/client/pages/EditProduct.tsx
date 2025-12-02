import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product, ProductFormData } from '../types'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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
  })

  const [loading, setLoading] = useState(true)

  // ---------------------------
  //  CARREGAR PRODUTO EXISTENTE
  // ---------------------------
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/produtos/${id}`)
        const data: Product = await res.json()

        setFormData({
          name: data.name,
          brand: data.brand,
          model: data.model,
          price: data.price,
          quantity: data.quantity,
          minimum_quantity: data.minimum_quantity,
          description: {
            material_type: data.description.material_type,
            size: data.description.size,
            voltage: data.description.voltage,
          },
        })

        setLoading(false)
      } catch (err) {
        console.error('Erro ao carregar produto', err)
      }
    }

    loadProduct()
  }, [id])

  // ---------------------------
  // FUNÇÃO DE UPDATE
  // ---------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      navigate('/products')
    } catch (err) {
      console.error('Erro ao editar produto', err)
    }
  }

  // ---------------------------
  // ATUALIZAR CAMPOS
  // ---------------------------
  const updateField = (field: keyof ProductFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateDescription = (field: keyof ProductFormData['description'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: { ...prev.description, [field]: value },
    }))
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Editar Produto</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder='Nome'
          className='border p-2 w-full rounded'
        />

        <input
          type='text'
          value={formData.brand}
          onChange={(e) => updateField('brand', e.target.value)}
          placeholder='Marca'
          className='border p-2 w-full rounded'
        />

        <input
          type='text'
          value={formData.model}
          onChange={(e) => updateField('model', e.target.value)}
          placeholder='Modelo'
          className='border p-2 w-full rounded'
        />

        <input
          type='number'
          value={formData.price}
          onChange={(e) => updateField('price', Number(e.target.value))}
          placeholder='Preço'
          className='border p-2 w-full rounded'
        />

        <input
          type='number'
          value={formData.quantity}
          onChange={(e) => updateField('quantity', Number(e.target.value))}
          placeholder='Quantidade'
          className='border p-2 w-full rounded'
        />

        <input
          type='number'
          value={formData.minimum_quantity}
          onChange={(e) => updateField('minimum_quantity', Number(e.target.value))}
          placeholder='Quantidade Mínima'
          className='border p-2 w-full rounded'
        />

        <h2 className='font-semibold mt-4'>Descrição</h2>

        <input
          type='text'
          value={formData.description.material_type}
          onChange={(e) => updateDescription('material_type', e.target.value)}
          placeholder='Material'
          className='border p-2 w-full rounded'
        />

        <input
          type='text'
          value={formData.description.size}
          onChange={(e) => updateDescription('size', e.target.value)}
          placeholder='Tamanho'
          className='border p-2 w-full rounded'
        />

        <input
          type='text'
          value={formData.description.voltage}
          onChange={(e) => updateDescription('voltage', e.target.value)}
          placeholder='Voltagem'
          className='border p-2 w-full rounded'
        />

        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}

export default ProductEdit
