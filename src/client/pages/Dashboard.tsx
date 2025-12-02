import { useState, useEffect, useMemo } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import AlertsList from '../components/AlertsList'
import QuickActions from '../components/QuickActions'
import type { Product, StockAlert } from '../types'

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/produtos')
        if (!res.ok) throw new Error('Erro ao buscar produtos')

        const data = await res.json()
        setProducts(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Erro desconhecido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Estatísticas
  const stats = useMemo(() => {
    if (loading || error || !products.length) {
      return { totalProducts: 0, lowStockProducts: 0, recentProducts: 0 }
    }

    const totalProducts = products.length
    const lowStockProducts = products.filter((p) => p.quantity <= p.minimum_quantity).length

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentProducts = products.filter((p) => {
      if (!p.created_at) return false
      return new Date(p.created_at) >= sevenDaysAgo
    }).length

    return { totalProducts, lowStockProducts, recentProducts }
  }, [products, loading, error])

  // Alertas
  const alerts: StockAlert[] = useMemo(() => {
    if (loading || error) return []

    return products
      .filter((p) => p.quantity <= p.minimum_quantity)
      .map((product) => ({
        product,
        message:
          product.quantity === 0 ? 'Produto sem estoque!' : 'Estoque abaixo do mínimo recomendado',
        severity: product.quantity === 0 ? 'critical' : 'warning',
      }))
  }, [products, loading, error])

  // Loading / Erro
  if (loading) {
    return (
      <div className='p-8'>
        <p className='text-gray-600 text-lg'>Carregando dados...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-8'>
        <p className='text-red-500 text-lg'>Erro: {error}</p>
      </div>
    )
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
        <p className='text-gray-600'>Visão geral do seu estoque</p>
      </div>

      {/* Indicadores */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <IndicatorCard
          icon='package'
          title='Total de Produtos'
          value={stats.totalProducts}
          subtitle='Itens cadastrados'
          variant='default'
        />
        <IndicatorCard
          icon='alert-circle'
          title='Estoque Baixo'
          value={stats.lowStockProducts}
          subtitle='Requer atenção'
          variant='warning'
        />
        <IndicatorCard
          icon='add-circle'
          title='Adicionados Recentemente'
          value={stats.recentProducts}
          subtitle='Últimos 7 dias'
          variant='success'
        />
      </div>

      {/* Ações Rápidas */}
      <div className='mb-8'>
        <QuickActions />
      </div>

      {/* Alertas */}
      <AlertsList alerts={alerts} />
    </div>
  )
}

export default Dashboard
