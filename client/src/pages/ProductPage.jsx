import React from 'react'
import Header from '../components/header/Header'
import EditProducts from '../components/products/EditProducts'


const ProductPage = () => {
  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Products</h1>
      <EditProducts/>
    </div>
  )
}

export default ProductPage
