import { useState, useEffect, useMemo } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import AlertsList from '../components/AlertsList'
import QuickActions from '../components/QuickActions'
import type { Product, StockAlert } from '../types'

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  // Carregar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/produtos')
        if (!res.ok) throw new Error('Erro ao buscar produtos')
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      }
    }

    fetchProducts()
  }, [])

  // Estatísticas
  const stats = useMemo(() => {
    if (error || !products.length) {
      return { totalProducts: 0, lowStockProducts: 0, recentProducts: 0 }
    }

    const totalProducts = products.length
    const lowStockProducts = products.filter(
      (p) => parseInt(p.quantity) <= parseInt(p.minimum_quantity),
    ).length

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentProducts = products.filter((p) => {
      if (!p.updated_at) return false
      return new Date(p.updated_at) >= sevenDaysAgo
    }).length

    return { totalProducts, lowStockProducts, recentProducts }
  }, [products, error])

  // Alertas
  const alerts: StockAlert[] = useMemo(() => {
    if (error) return []

    return products
      .filter((p) => parseInt(p.quantity) <= parseInt(p.minimum_quantity))
      .map((product) => ({
        product,
        message:
          parseInt(product.quantity) === 0
            ? 'Produto sem estoque!'
            : 'Estoque abaixo do mínimo recomendado',
        severity: parseInt(product.quantity) === 0 ? 'critical' : 'warning',
      }))
  }, [products, error])

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
          title='Atualizados Recentemente'
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
