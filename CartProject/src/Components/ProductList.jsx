function ProductList({ products, cart, updateCart }) {
  return (
    <div style={{ flex: 2 }}>
      <h3>Products</h3>
      <ul>
        {products.map((prod) => {
          const cartItem = cart.find((item) => item.id === prod.id);
          return (
            <li key={prod.id} style={{ marginBottom: '10px' }}>
              {prod.title} - ${prod.price}
              <br />
              {!cartItem ? (
                <button onClick={() => updateCart(prod.id, 1)}>Add to Cart</button>
              ) : (
                <span>
                  <button onClick={() => updateCart(prod.id, -1)}>-</button>
                  <strong style={{ margin: '0 10px' }}>{cartItem.quantity}</strong>
                  <button onClick={() => updateCart(prod.id, 1)}>+</button>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ProductList;