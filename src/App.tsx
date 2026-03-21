import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import ProductEdit from './pages/EditProduct'

function App() {
  ;<BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='edit-product/:id' element={<ProductEdit />} />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
}

export default App
