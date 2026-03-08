function CartList({ cart, increaseQuantity, decreaseQuantity, totalAmt }) {
  return (
    <div>
      <div>
        <hr />
        <h3>Your Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price} Rs
              {" "}
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <span> {item.qty} </span>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
            </li>
          ))}
        </ul>
        
        {/* TOTAL BILL */}
        {cart.length === 0 ? (
          <div>Cart is empty. Total amount = {totalAmt} Rs</div>
        ) : (
          <div><strong>Total amount = {totalAmt} Rs</strong></div>
        )}
      </div>
    </div>
  );
}

export default CartList;