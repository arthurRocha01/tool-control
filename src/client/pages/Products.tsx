import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product, StockStatus } from '../types'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [stockFilter, setStockFilter] = useState<StockStatus>('all')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // ---- Handlers ----

  const handleAddProduct = () => {
    navigate('/add-product')
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    fetch(`http://localhost:5000/produtos/${id}`, { method: 'DELETE' })
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch((err) => {
        console.error('Erro ao excluir produto:', err)
        alert('Erro ao excluir produto.')
      })
  }

  // ---- Carregar produtos ----

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:5000/produtos')
        setProducts(await res.json())
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ---- Filtros ----

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBrand =
        brandFilter === '' || product.brand.toLowerCase().includes(brandFilter.toLowerCase())

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && product.quantity <= product.minimum_quantity) ||
        (stockFilter === 'ok' && product.quantity > product.minimum_quantity)

      return matchesSearch && matchesBrand && matchesStock
    })
  }, [products, searchTerm, brandFilter, stockFilter])

  const getStockStatus = (quantity: number, minimum: number) => {
    return quantity <= minimum ? 'Baixo' : 'OK'
  }

  // ---- Tela de loading ----

  if (loading) {
    return <div className='p-8 text-center text-gray-500'>Carregando produtos...</div>
  }

  // ---- Render principal ----

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Produtos</h1>
        <button
          onClick={handleAddProduct}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
        >
          + Adicionar Produto
        </button>
      </div>

      {/* Filtros */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <input
          type='text'
          placeholder='Pesquisar...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border px-3 py-2 rounded-lg'
        />

        <input
          type='text'
          placeholder='Marca...'
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className='border px-3 py-2 rounded-lg'
        />

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as StockStatus)}
          className='border px-3 py-2 rounded-lg'
        >
          <option value='all'>Todos</option>
          <option value='low'>Estoque Baixo</option>
          <option value='ok'>Estoque OK</option>
        </select>
      </div>

      {/* Tabela */}
      <div className='overflow-x-auto border rounded-lg'>
        <table className='w-full'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='p-3'>Nome</th>
              <th className='p-3'>Marca</th>
              <th className='p-3'>Modelo</th>
              <th className='p-3'>Estoque</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Descrição</th>
              <th className='p-3'>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className='border-t'>
                <td className='p-3'>{product.name}</td>
                <td className='p-3'>{product.brand}</td>
                <td className='p-3'>{product.model}</td>
                <td className='p-3'>
                  {product.quantity}/{product.minimum_quantity}
                </td>
                <td className='p-3'>
                  {getStockStatus(parseInt(product.quantity), parseInt(product.minimum_quantity))}
                </td>
                <td className='p-3'>
                  {product.description?.material_type || product.description?.voltage || '-'}
                </td>

                <td className='p-3 flex gap-2'>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'
                    title='Editar'
                  >
                    <i className='hgi-stroke hgi-edit-02'></i>
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                    title='Excluir'
                  >
                    <i className='hgi-stroke hgi-delete-02'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
