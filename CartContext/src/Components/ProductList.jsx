import React from "react";
import useProducts from "../Hooks/useProducts.js";
import ProductCard from "./ProductCard.jsx";
import { useSearch } from "../Contexts/SearchContext.jsx";
import styles from "../CSS/ProductList.module.css";


function ProductList() {

  const { products, error, loading } = useProducts();
  const { searchTerm } = useSearch();



  if (loading) return <div>Loading data .....</div>;

  if (error) return <div>Error in loading products</div>;

  const searchedItem = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))



  return (
    <div className={styles.headingContainer}>
      {/* <h2 className={styles.heading}>OUR WEIRED PODUCTS</h2> */}

      {searchedItem.length === 0 ?
         <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> 
      :
        <div className={styles.productsContainer}>
        {searchedItem.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      }

   
      
    
    </div>
  );
}

export default ProductList;
