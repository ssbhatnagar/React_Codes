import React from 'react'
import ProductCard from './ProductCard'
import useProducts from '../Hooks/useProducts'
import styles from '../Css/Products.module.css'

function Products() {
  const {products, loading, error} = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
    <div><h1 className={styles.heading}>Our Products</h1></div>
    <div className={styles.productsContainer}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} description={product.description} image={product.image} />
      ))}
    </div>
    </div>
  )
}

export default Products