import { Link } from 'react-router-dom'

interface QuickAction {
  to: string
  icon: string
  title: string
  description: string
  color: string
}

const QuickActions = () => {
  const actions: QuickAction[] = [
    {
      to: '/products',
      icon: 'package',
      title: 'Ver Produtos',
      description: 'Lista completa do estoque',
      color: 'blue',
    },
    {
      to: '/add-product',
      icon: 'add-circle',
      title: 'Adicionar Produto',
      description: 'Cadastrar novo item',
      color: 'green',
    },
    {
      to: '/settings',
      icon: 'settings-01',
      title: 'Configurações',
      description: 'Ajustes do sistema',
      color: 'gray',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
    gray: 'bg-gray-50 text-gray-600 group-hover:bg-gray-100',
  }

  return (
    <div className='bg-white rounded-xl p-6 border border-gray-200'>
      <div className='flex items-center gap-3 mb-4'>
        <i className='hgi-stroke hgi-discover-square text-xl text-gray-700'></i>
        <h3 className='text-lg font-semibold text-gray-900'>Ações Rápidas</h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className='group flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all'
          >
            <div
              className={`p-3 rounded-lg ${
                colorClasses[action.color as keyof typeof colorClasses]
              } transition-colors`}
            >
              <i className={`hgi-stroke hgi-${action.icon} text-xl`}></i>
            </div>
            <div className='flex-1 min-w-0'>
              <h4 className='font-semibold text-gray-900 mb-1'>{action.title}</h4>
              <p className='text-sm text-gray-600'>{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
