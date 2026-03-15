import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductList from '../../components/CartProj/ProductList';
import CartList from '../../components/CartProj/CartList';

const listOfProducts = [
  { id: 1, title: "Biscuit", price: 20 },
  { id: 2, title: "Chips", price: 20 },
  { id: 3, title: "Chocolate", price: 50 },
  { id: 4, title: "Frooti", price: 20 },
  { id: 5, title: "Pen", price: 50 },
  { id: 6, title: "Notebook", price: 90 }
];

function CartProject() {
  
  // const [products, setProducts] = useState(listOfProducts);

  const {products, error, loading} = useProducts();

  const [cart, setCart] = useState(() => {
    const cartStorage = localStorage.getItem('cartData')
    return cartStorage ? JSON.parse(cartStorage) : []
  });
  
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cart))
  }, [cart])
  

  // 1. ADD TO CART (Fix: Added price to calculate total properly)
  function addToCart(prod) {
    // const newItem = {
    //   id: prod.id,
    //   title: prod.title,
    //   price: prod.price, 
    //   qty: 1
    // };
    // setCart((prev) => [...prev, newItem]);
    setCart((prev) => [...prev, {...prod, qty: 1}] ) // prod mil raha hai to as it is daal do sath mai qty daal do
  }

  // 2. INCREASE QTY
  function increaseQuantity(itemId) {
    setCart((prev) =>
      prev.map((itm) => itm.id === itemId ? { ...itm, qty: itm.qty + 1 } : itm)
    );
  }

  // 3. DECREASE QTY (with auto-remove via filter)
  function decreaseQuantity(itemId) {
    setCart((prev) =>
      prev.map((itm) => itm.id === itemId ? { ...itm, qty: itm.qty - 1 } : itm).filter((itm) => itm.qty > 0)
    );
  }

  // 4. TOTAL AMOUNT
  const totalAmt = cart.reduce((total, itm) => total + (itm.qty * itm.price), 0);

  if(error) return(<div>Error</div>)
  if(loading) return(<div>Loading ...</div>)

  return (
    <div>
      <h1>My Shopping Cart</h1>
      <hr />
      
      {/* ---------------- PRODUCT LIST SECTION ---------------- */}
      <ProductList 
        products={products} 
        cart={cart} 
        addToCart={addToCart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity} 
      />

      {/* ---------------- ACTUAL CART SECTION ---------------- */}
     <CartList 
        cart={cart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity} 
        totalAmt={totalAmt} 
      />
    </div>
  );
}

export default CartProject;