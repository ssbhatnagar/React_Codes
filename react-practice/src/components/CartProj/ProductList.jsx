// Props ko destructure kar liya function bracket ke andar
function ProductList({ products, cart, addToCart, increaseQuantity, decreaseQuantity }) {
  return (
    <div>

        <div>
        <h3>Products</h3>
        <ul>
          {products.map((item) => {
            // Check kar rahe hain ki kya item pehle se cart mein hai
            const cartItem = cart.find((c) => c.id === item.id);

            return (
              <li key={item.id}>
                {item.title} - {item.price} Rs
                {" "}
                
                {/* CONDITIONAL UI: Agar cart mein hai toh +/- dikhao, warna Add to cart */}
                {cartItem ? (
                  <>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span> {cartItem.qty} </span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to cart</button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProductList