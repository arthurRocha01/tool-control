import { useMemo } from 'react'
import IndicatorCard from '../components/IndicatorCard'
import AlertsList from '../components/AlertsList'
import QuickActions from '../components/QuickActions'
import { mockProducts } from '../store/mockData'
import type { StockAlert } from '../types'

const Dashboard = () => {
  // Calcular estatísticas
  const stats = useMemo(() => {
    const totalProducts = mockProducts.length
    const lowStockProducts = mockProducts.filter((p) => p.quantity <= p.minQuantity).length

    // Produtos adicionados nos últimos 7 dias
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentProducts = mockProducts.filter((p) => new Date(p.addedDate) >= sevenDaysAgo).length

    return {
      totalProducts,
      lowStockProducts,
      recentProducts,
    }
  }, [])

  // Gerar alertas
  const alerts: StockAlert[] = useMemo(() => {
    return mockProducts
      .filter((p) => p.quantity <= p.minQuantity)
      .map((product) => ({
        product,
        message:
          product.quantity === 0 ? 'Produto sem estoque!' : 'Estoque abaixo do mínimo recomendado',
        severity: product.quantity === 0 ? 'critical' : 'warning',
      })) as StockAlert[]
  }, [])

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
