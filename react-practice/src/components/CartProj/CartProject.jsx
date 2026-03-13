import React, { useState } from 'react' // FIXED: Capital R
import useProducts2 from '../../hooks/useProducts2'

function CartProject() {
    const [cart, setCart] = useState([]);
    const { products, loading, error } = useProducts2();

    function handleCart(productId, delta) {
        const isPresent = cart.find((item) => item.id === productId)

        if (isPresent) {
            setCart((prev) =>
                prev
                .map((item) => item.id === productId ? { ...item, quantity: item.quantity + delta } : item)
                .filter((i) => i.quantity > 0)
            );
            return;
        } else {
            const productToAdd = products.find((item) => item.id === productId)
            setCart((prev) => [...prev, { ...productToAdd, quantity: 1 }])
        }
    }

    if (error) return (<div>Error in fetching</div>)
    if (loading) return (<div>Loading .....</div>)

    return (
        <div>
            <ul>
                {products.map((prod) => {
                    // PEHLE YAHAN CART ITEM DHOONDO
                    const cartItem = cart.find((item) => item.id === prod.id);

                    // PHIR RETURN KARO JSX
                    return (
                        <li key={prod.id}>
                            {prod.title} - ${prod.price}
                            <br />
                            {!cartItem ? (
                                <button onClick={() => handleCart(prod.id, 1)}>Add To Cart</button>
                            ) : (
                                <span>
                                    <button onClick={() => handleCart(prod.id, -1)}>-</button>
                                    <strong style={{margin: '0 10px'}}>{cartItem.quantity}</strong>
                                    <button onClick={() => handleCart(prod.id, 1)}>+</button>
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CartProject;