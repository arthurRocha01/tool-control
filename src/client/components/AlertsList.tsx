import { StockAlert } from '../types'

interface AlertsListProps {
  alerts: StockAlert[]
}

const AlertsList = ({ alerts }: AlertsListProps) => {
  if (alerts.length === 0) {
    return (
      <div className='bg-white rounded-xl p-6 border border-gray-200'>
        <div className='flex items-center gap-3 mb-4'>
          <i className='hgi-stroke hgi-notification-01 text-xl text-gray-700'></i>
          <h3 className='text-lg font-semibold text-gray-900'>Alertas de Estoque</h3>
        </div>
        <div className='text-center py-8 text-gray-500'>
          <i className='hgi-stroke hgi-checkmark-circle-01 text-4xl mb-2'></i>
          <p>Sem alertas no momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl p-6 border border-gray-200'>
      <div className='flex items-center gap-3 mb-4'>
        <i className='hgi-stroke hgi-notification-01 text-xl text-gray-700'></i>
        <h3 className='text-lg font-semibold text-gray-900'>Alertas de Estoque</h3>
      </div>

      <div className='space-y-3'>
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg border ${
              alert.severity === 'critical'
                ? 'bg-red-50 border-red-200'
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <i
              className={`hgi-stroke hgi-alert-circle text-xl flex-shrink-0 ${
                alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
              }`}
            ></i>
            <div className='flex-1 min-w-0'>
              <p className='font-medium text-gray-900 mb-1'>{alert.product.name}</p>
              <p className='text-sm text-gray-600'>{alert.message}</p>
              <p className='text-xs text-gray-500 mt-1'>
                Estoque atual: {alert.product.quantity} | Mínimo: {alert.product.minimum_quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertsList
