import { Link, Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: 'dashboard-square-01', label: 'Dashboard' },
    { path: '/products', icon: 'package', label: 'Produtos' },
    { path: '/add-product', icon: 'add-circle', label: 'Cadastrar' },
    { path: '/settings', icon: 'settings-01', label: 'Configurações' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-64 bg-white border-r border-gray-200 flex flex-col'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <i className='hgi-stroke hgi-warehouse text-2xl text-blue-600'></i>
            <h1 className='text-xl font-bold text-gray-900'>Controle Estoque</h1>
          </div>
        </div>

        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`hgi-stroke hgi-${item.icon} text-xl`}></i>
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='p-4 border-t border-gray-200'>
          <div className='text-xs text-gray-500 text-center'>Sistema de Controle v1.0</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 overflow-auto'>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
