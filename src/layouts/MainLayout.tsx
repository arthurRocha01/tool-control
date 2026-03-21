import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const MainLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuthStore()

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

  const handleLogout = () => {
    if (confirm('Deseja realmente sair do sistema?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-64 bg-white border-r border-gray-200 flex flex-col'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center gap-3 mb-4'>
            <i className='hgi-stroke hgi-warehouse text-2xl text-blue-600'></i>
            <h1 className='text-xl font-bold text-gray-900'>Controle Estoque</h1>
          </div>

          {/* User info */}
          {currentUser && (
            <div className='bg-blue-50 rounded-lg p-3'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                  <i className='hgi-stroke hgi-user-01 text-white text-sm'></i>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>{currentUser.name}</p>
                  <p className='text-xs text-gray-600 truncate'>@{currentUser.username}</p>
                </div>
              </div>
            </div>
          )}
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

        <div className='p-4 border-t border-gray-200 space-y-3'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
          >
            <i className='hgi-stroke hgi-logout-01 text-xl'></i>
            <span className='font-medium'>Sair</span>
          </button>

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
