import React, { useState } from 'react' // FIXED: Capital R
import useProducts2 from '../../hooks/useProducts2'

function CartProject() {
   
    const {products, error, loading} = useProducts2();

    // step 1 sabse pehele ek state banao kiske liye? casrt ke liye jo ki initialize hogi empty array se aur phir islo use karenge. 
    const [cart, setCart] = useState([]);

    // ab aate hai main logic par jaaha hum sirf ek function banayenge jo ki universal function hoga add to cart bhi handel karega aur vo quantity ko bhi handle karega.

    function handleCart(productId, delta){
        // step 1 pehele ek variable bana liya is present name se aur usme ye store kar liya ki kya jis product par user ne click kiya hai ? 
        const isPresent = cart.find((item) => item.id === productId)

        if(isPresent){
            // step 2 agar ye product already hai to humko is product ki quanmtity ko badha dena hai agar nahi hai vo item to bas phir add kar dena hai directly usko, setCart mai iterate karennge hum aur usme phir dhoondh kar conditionally check kar ke achieve karenge. Agar dhyaan diya jaye to cart mai na hum product ko do cheez de rahe hai to basically cart mai hum ek object add kar rahe hai us object mai 2 values hai ek quantity aur ek product khud ye line - {...item, quantity: item.quantity + delta} yehi bata rahi hai. 
            setCart((prev) =>
                prev.map((item) => 
                    item.id === productId ? {...item, quantity:item.quantity+delta} : item
                ).filter((i) => i.quantity>0)         
            )
            return;

        }else{
            if(delta> 0){
            // step 3 else part ab dekho lets say vo product cart mai nahi hai to usko kar denge add pehele vo product find out kar lenege aur setCart hai tpo array of object to isliye ye line use krenge -
            // [...prev, {...productToAdd, quantity:1}] ye line pichle products ko as it is rakhegi aur ek object aur add kar degi jisme products to add honge aur unki quantity 1 hogi
            const productToAdd = products.find((item) => item.id === productId);
            setCart((prev) =>   [...prev, {...productToAdd, quantity:1}]) 
            }
        }



    }

    if(loading) return(<div>Loading .....</div>)
    if(error) return (<div>Error in fetching data</div>)

   return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Products List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((prod) => (
          <li key={prod.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <span>{prod.title} - ${prod.price}</span>
            <button 
              onClick={() => handleCart(prod.id, 1)} 
              style={{ marginLeft: "15px", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ width: "200px" }}>{item.title}</span>
              
              <button onClick={() => handleCart(item.id, -1)} style={{ width: "30px" }}>-</button>
              <span style={{ margin: "0 15px", fontWeight: "bold" }}>{item.quantity}</span>
              <button onClick={() => handleCart(item.id, 1)} style={{ width: "30px" }}>+</button>
              
              <span style={{ marginLeft: "20px", color: "green" }}>
                Total: ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
          Grand Total: $
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </div>
      )}
    </div>
  );


}

export default CartProject;