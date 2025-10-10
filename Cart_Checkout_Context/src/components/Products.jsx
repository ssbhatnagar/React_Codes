import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../Hooks/useProducts";
import { useSearch } from "../context/SearchContext";
import { useFilter } from "../context/FilterContext.jsx";
import styles from "../Css/Products.module.css";

function Products() {
  const { products, loading, error } = useProducts();
  const { searchTerm } = useSearch();
  const { selectedCategory } = useFilter(); // 👈 new line

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  // 🔸 Step 2: Combine Search + Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory; // ✅ both conditions
  });

  return (
    <div>
      <div>
        <h1 className={styles.heading}>Our Products</h1>
      </div>
      <div className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              description={product.description}
              image={product.image}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
