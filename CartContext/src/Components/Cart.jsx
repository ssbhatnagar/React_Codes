import React, {useState} from 'react';
import useProducts from '../Hooks/useProducts'

function Cart(){

    const [cart, setCart] = useState([]);
    const {products} = useProducts();

    function addToCart(productToAdd){
        
        const existingItem = cart.find(item => item.id === productToAdd.id)

        if(existingItem){
            setCart(prevCart =>
                prevCart.map((item) => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item)
            )
        }else{
            const newItem = {
                id: productToAdd.id,
                product: productToAdd,
                quantity: 1 
            }
            setCart(prevCart => [...prevCart, newItem])
        }
        
    }
    // console.log(cart)

    return(
        <div>
        <div>
            <ul>
                {products.map((product) => 
                <li key={product.id}>
                    {product.title}
                    {"  "}
                    <span>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </span>
                </li>
                )}
            </ul>
            </div>
            <br/>
            <br/>
            <div>
                <h2>Here is the cart list</h2>
                <div>
                    <ul>
                    {cart.map((item) => 
                    <li>
                    {item.product.title} - {item.quantity}
                    </li>

                    )}   
                    
                    </ul>
                </div>
            </div>

        </div>
    )


}
export default Cart;


// {

// import React, { useState } from "react";
// // Maan lete hain ki yeh hook products fetch karta hai
// import useProducts from "../Hooks/useProducts"; 

// function Cart() {
//     // Cart state mein item ka product object aur uski quantity store hogi
//     // Example: [{ id: 1, product: {...}, quantity: 2 }]
//     const [cart, setCart] = useState([]);
//     const { products } = useProducts(); 

//     // ---------------------------------------------
//     // 1. ADD TO CART / INCREASE QUANTITY
//     // ---------------------------------------------
//     function handleAddToCart(productToAdd) {
//         // Step 1: Check karo, kya item already cart mein hai?
//         const existingItem = cart.find(item => item.id === productToAdd.id);

//         if (existingItem) {
//             // Step 2: Item hai toh quantity badhao (map se naya array banao)
//             setCart(prevCart => 
//                 prevCart.map(item => 
//                     item.id === productToAdd.id 
//                         // Item mil gaya: Naya object return karo, quantity + 1
//                         ? { ...item, quantity: item.quantity + 1 } 
//                         // Baki items ko waisa hi rakho
//                         : item
//                 )
//             );
//         } else {
//             // Step 3: Item naya hai toh quantity 1 ke saath add karo
//             const newCartItem = {
//                 id: productToAdd.id,
//                 product: productToAdd, // Poora product data store kiya
//                 quantity: 1,
//             };
//             // Spread karke naya array banao
//             setCart(prevCart => [...prevCart, newCartItem]);
//         }
//     }

//     // ---------------------------------------------
//     // 2. DECREASE QUANTITY / REMOVE WHEN QUANTITY IS 1
//     // ---------------------------------------------
//     function handleDecreaseQuantity(productIdToUpdate) {
//         // Step 1: Item ka current object dhoondo
//         const existingItem = cart.find(item => item.id === productIdToUpdate);

//         if (!existingItem) return; // Agar item nahi mila toh kuch mat karo

//         if (existingItem.quantity === 1) {
//             // Step 2 (IF Quantity == 1): Pura item hata do (filter use karo)
//             // Woh items rakho jinki ID match nahi karti
//             setCart(prevCart => 
//                 prevCart.filter(item => item.id !== productIdToUpdate)
//             );
//         } else {
//             // Step 3 (IF Quantity > 1): Quantity kam karo (map use karo)
//             setCart(prevCart => 
//                 prevCart.map(item => 
//                     item.id === productIdToUpdate 
//                         // Item mil gaya: Naya object return karo, quantity - 1
//                         ? { ...item, quantity: item.quantity - 1 } 
//                         : item
//                 )
//             );
//         }
//     }

//     // ---------------------------------------------
//     // 3. REMOVE ALL INSTANCES (Your special function)
//     // ---------------------------------------------
//     function handleRemoveFromCart(productIdToRemove) {
//         // Filter use karke us ID wale item ko cart se pura nikal do
//         setCart(prevCart => 
//             prevCart.filter(item => item.id !== productIdToRemove)
//         );
//     }
    
//     // ---------------------------------------------
//     // RENDERING LOGIC (UI DISPLAY)
//     // ---------------------------------------------
    
//     // Helper function to check if item is in cart and get its quantity
//     const getCartItemQuantity = (productId) => {
//         const item = cart.find(item => item.id === productId);
//         return item ? item.quantity : 0;
//     }


//     return (
//         <div>
//             {/* ----------------- PRODUCT LIST ----------------- */}
//             <div>
//                 <h2>All Products</h2>
//                 <ul>
//                     {products.map((product) => {
//                         const quantity = getCartItemQuantity(product.id);

//                         return (
//                             <li key={product.id}>
//                                 {product.title}
                                
//                                 {quantity === 0 ? (
//                                     // Case A: Item Cart mein nahi hai -> ADD TO CART button dikhao
//                                     <button onClick={() => handleAddToCart(product)}>
//                                         Add to Cart
//                                     </button>
//                                 ) : (
//                                     // Case B: Item Cart mein hai -> Quantity Control Span dikhao
//                                     <span>
//                                         {/* Minus button */}
//                                         <button onClick={() => handleDecreaseQuantity(product.id)}>
//                                             -
//                                         </button>
//                                         &nbsp; Quantity: {quantity} &nbsp;
//                                         {/* Plus button (Jo sirf quantity badhata hai) */}
//                                         <button onClick={() => handleAddToCart(product)}>
//                                             +
//                                         </button>
//                                         {/* Your special 'Remove All' button */}
//                                         <button onClick={() => handleRemoveFromCart(product.id)} style={{ marginLeft: '10px', color: 'red' }}>
//                                             Clear All
//                                         </button>
//                                     </span>
//                                 )}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>

//             <br />
//             <hr />
//             {/* ----------------- CART SUMMARY ----------------- */}
//             <div>
//                 <h3>Below is cart Summary ({cart.length} unique items)</h3>
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     <ul>
//                         {cart.map((cartItem) => (
//                             <li key={cartItem.id}>
//                                 {cartItem.product.title} - Qty: **{cartItem.quantity}**
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Cart;

// }