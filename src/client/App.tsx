import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import Settings from './pages/Settings'
import ProductEdit from './pages/EditProduct'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product/:id' element={<ProductEdit />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
