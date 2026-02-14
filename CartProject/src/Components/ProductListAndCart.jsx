import React, { useState } from "react";
import useProducts from "../Hooks/useProducts";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Cart from "./Cart";

function ProductListAndCart() {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 1. Categories nikalna
  const categories = [...new Set(products.map((c) => c.category))];

  // 2. Handlers
  const handleCheckbox = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const updateCart = (productId, delta) => {
    const isPresent = cart.find((item) => item.id === productId);
    if (isPresent) {
      setCart((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item)).filter((i) => i.quantity > 0)
      );
      return;
    }
    const productToAdd = products.find((p) => p.id === productId);
    setCart((prev) => [...prev, { ...productToAdd, quantity: 1 }]);
  };

  // 3. Derived State
  const filteredProducts = selectedCategories.length === 0 
    ? products 
    : products.filter((p) => selectedCategories.includes(p.category));

  if (loading) return <div>Loading Data...</div>;
  if (error) return <div>Error fetching data!</div>;

  return (
    <div>
      <h1>My Mini E-Commerce</h1>
      <Filter 
        categories={categories} 
        selectedCategories={selectedCategories} 
        handleCheckbox={handleCheckbox} 
      />
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        <ProductList 
          products={filteredProducts} 
          cart={cart} 
          updateCart={updateCart} 
        />
        <Cart 
          cart={cart} 
          updateCart={updateCart} 
        />
      </div>
    </div>
  );
}

export default ProductListAndCart;