import React from "react";
import useProducts from "../Hooks/useProducts.js";
import ProductCard from "./ProductCard.jsx";
import styles from "../CSS/ProductList.module.css";

function ProductList() {
  const { products, error, loading } = useProducts();

  if (loading) return <div>Loading data .....</div>;

  if (error) return <div>Error in loading products</div>;

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
