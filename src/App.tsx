import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import { AuthProvider } from './contexts/AuthContext'
import ProductDetails from './pages/ProductDetails'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route element={<PrivateRoute />}>
                <Route path="/products" element={<Products/>} />
                <Route path="/add-product" element={<AddProduct/>} />
                <Route path="/product/:slug" element={<ProductDetails/>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
