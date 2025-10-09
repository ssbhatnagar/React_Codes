import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../Css/ProductCard.module.css";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  useEffect(()=>{
    const existingItem = cartItems.find((item) => item.id === product.id);
    if(existingItem){
      setQuantity(existingItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems])

  function handleAddToCart() {
  addToCart(product, quantity); 
}


  function handleQuantityIncrement() {
    setQuantity(q => q + 1);
  }

  function handleQuantityDecrement() {
    if (quantity > 0) {
      setQuantity(q => (q > 1 ? q - 1 : 1));
    }
  }

 

  return (
    <div>
      <div className="carousel"></div>
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.name}
        />
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
        <p className={styles.productCategory}>Category: {product.category}</p>
        <p className={styles.productRating}>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <br />
        <div>
          <button onClick={handleQuantityDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleQuantityIncrement}>+</button>
        </div>
        <br />
        <div>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
