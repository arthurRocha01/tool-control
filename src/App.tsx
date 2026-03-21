import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import ProductEdit from './pages/EditProduct'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' replace />} />

        <Route
          path='/'
          element={isAuthenticated ? <MainLayout /> : <Navigate to='/login' replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product/:id' element={<ProductEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
