import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.loginAPI)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const success = login(username, password)

      if (!success) {
        setError('Usuário ou senha incorretos')
      } else {
        navigate('/')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <i className='hgi-stroke hgi-warehouse text-3xl text-white'></i>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Controle de Estoque</h1>
          <p className='text-gray-600'>Faça login para acessar o sistema</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2'>
              <i className='hgi-stroke hgi-alert-circle'></i>
              <span className='text-sm'>{error}</span>
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Usuário</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <i className='hgi-stroke hgi-user-01 text-gray-400'></i>
              </div>
              <input
                type='text'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Digite seu usuário'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Senha</label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <i className='hgi-stroke hgi-lock text-gray-400'></i>
              </div>
              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Digite sua senha'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium'
          >
            {loading ? (
              <>
                <i className='hgi-stroke hgi-loading-03 animate-spin'></i>
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <i className='hgi-stroke hgi-login-01'></i>
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className='mt-6 pt-6 border-t border-gray-200'>
          <p className='text-xs text-gray-600 text-center mb-2'>
            <strong>Credenciais de teste:</strong>
          </p>
          <div className='text-xs text-gray-500 space-y-1'>
            <p>• admin / admin123</p>
            <p>• joao / joao123</p>
            <p>• maria / maria123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
