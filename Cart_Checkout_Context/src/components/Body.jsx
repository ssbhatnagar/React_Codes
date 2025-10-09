import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'
import Header from './Header'
import ProductInfoPage from './ProductInfoPage'
import Cart from './Cart'


function Body() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductInfoPage />} />
        </Routes>
    </div>
  )
}

export default Body