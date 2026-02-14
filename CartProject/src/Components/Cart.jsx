function Cart({ cart, updateCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
      <h3>Your Cart</h3>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <div>{item.title}</div>
              <div>
                Qty: {item.quantity} 
                <button onClick={() => updateCart(item.id, 1)}>+</button>
                <button onClick={() => updateCart(item.id, -1)}>-</button>
              </div>
            </div>
          ))}
          <hr />
          <h4>Grand Total: ${total.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}
export default Cart;