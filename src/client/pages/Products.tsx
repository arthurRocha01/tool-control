import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductsStore } from '../store/productsStore'
import { Product } from '../types'

const Products = () => {
  const navigate = useNavigate()
  const { products, initProducts, deleteProduct } = useProductsStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'ok'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    initProducts()
  }, [initProducts])

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBrand = !brandFilter || product.brand === brandFilter

      const qty = parseInt(product.quantity)
      const minQty = parseInt(product.minimum_quantity)
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && qty <= minQty) ||
        (stockFilter === 'ok' && qty > minQty)

      return matchesSearch && matchesBrand && matchesStock
    })
  }, [products, searchTerm, brandFilter, stockFilter])

  // Lista de marcas únicas
  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].sort()
  }, [products])

  const getStockStatus = (product: Product) => {
    const qty = parseInt(product.quantity)
    const minQty = parseInt(product.minimum_quantity)

    if (qty === 0) return { label: 'Sem estoque', color: 'red' }
    if (qty <= minQty) return { label: 'Estoque baixo', color: 'orange' }
    return { label: 'OK', color: 'green' }
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`)
  }

  const handleDelete = (id: string) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteProduct(deleteConfirm)
      setDeleteConfirm(null)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Listagem de Produtos</h1>
          <p className='text-gray-600'>{filteredProducts.length} produtos encontrados</p>
        </div>
        <Link
          to='/add-product'
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          <i className='hgi-stroke hgi-add-circle'></i>
          <span>Adicionar Produto</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className='bg-white rounded-xl p-6 border border-gray-200 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Busca */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <i className='hgi-stroke hgi-search-01'></i> Buscar
            </label>
            <input
              type='text'
              placeholder='Nome, marca ou modelo...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Filtro por marca */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <i className='hgi-stroke hgi-filter'></i> Marca
            </label>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>Todas as marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por estoque */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <i className='hgi-stroke hgi-package'></i> Status Estoque
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'low' | 'ok')}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value='all'>Todos</option>
              <option value='low'>Estoque baixo</option>
              <option value='ok'>Estoque OK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Produto
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Marca / Modelo
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Preço
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Quantidade
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Mínimo
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Atualizado
                </th>
                <th className='px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredProducts.map((product) => {
                const status = getStockStatus(product)
                const isLowStock = parseInt(product.quantity) <= parseInt(product.minimum_quantity)

                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      isLowStock ? 'bg-orange-50' : ''
                    }`}
                  >
                    <td className='px-6 py-4'>
                      <div className='font-medium text-gray-900'>{product.name}</div>
                      <div className='text-sm text-gray-500'>
                        {product.description.material_type}
                        {product.description.voltage !== 'N/A' &&
                          ` • ${product.description.voltage}`}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-gray-900'>{product.brand}</div>
                      <div className='text-sm text-gray-500'>{product.model}</div>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='font-semibold text-gray-900'>{product.price}</span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-lg font-semibold text-gray-900'>
                        {product.quantity}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center text-gray-600'>
                      {product.minimum_quantity}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          status.color === 'red'
                            ? 'bg-red-100 text-red-800'
                            : status.color === 'orange'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        <i
                          className={`hgi-stroke ${
                            status.color === 'red'
                              ? 'hgi-alert-circle'
                              : status.color === 'orange'
                                ? 'hgi-alert-circle'
                                : 'hgi-checkmark-circle-01'
                          }`}
                        ></i>
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center text-sm text-gray-600'>
                      {formatDate(product.updated_at)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          title='Editar'
                        >
                          <i className='hgi-stroke hgi-edit-02'></i>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                          title='Excluir'
                        >
                          <i className='hgi-stroke hgi-delete-02'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className='text-center py-12 text-gray-500'>
            <i className='hgi-stroke hgi-package text-4xl mb-2'></i>
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl p-6 max-w-md w-full'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                <i className='hgi-stroke hgi-alert-circle text-2xl text-red-600'></i>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Confirmar Exclusão</h3>
                <p className='text-sm text-gray-600'>Esta ação não pode ser desfeita</p>
              </div>
            </div>

            <p className='text-gray-700 mb-6'>Tem certeza que deseja excluir este produto?</p>

            <div className='flex gap-3'>
              <button
                onClick={confirmDelete}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
              >
                Confirmar Exclusão
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className='flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
