import { useState, useEffect } from "react"

function CartWithFilter() {


    /**
     *
     * 1. Data ?
     * 2. show UI
     * 3. implement logic
     * 4. repeat step 2 and 3.
     */

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    // add loading and error state and return block for them
    useEffect(() => {
        const fetchAPI = async () => {
            /**
             * add try catch
             */
            const rawData = await fetch("https://dummyjson.com/products");
            const data = await rawData.json();
            // add additional check
            setProducts(data.products);
        };
        fetchAPI();
    }, []);

    function handleAddToCart(item) {
        const cartProd = { ...item, qty: 1 };
        setCart((prev) => [...prev, cartProd]);
    }
    function increaseQuantity(prodId) {
        setCart((prev) =>
            prev.map((itm) =>
                itm.id === prodId ? { ...itm, qty: itm.qty + 1 } : itm
            )
        );
    }
    function decreaseQuantity(prodId) {
        setCart((prev) =>
            prev
                .map((itm) => (itm.id === prodId ? { ...itm, qty: itm.qty - 1 } : itm))
                .filter((itm) => itm.qty > 0)
        );
    }

    const categories = [...new Set(products.map((prod) => prod.category))];

    function handleCategoryChange(e) {
        const { value, checked } = e.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    }

    const filteredProducts =
        selectedCategories.length === 0
            ? products
            : products.filter((item) => selectedCategories.includes(item.category));

    const finalDisplayList = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(categories);
    return (
        <div>
            <h1>Shopping Cart</h1>
            <h3>Our Products</h3>
            {/* SEARCH BAR SECTION */}
            <div>
                <h3>Search</h3>
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                />
            </div>
            <div>
                <ul>
                    {finalDisplayList.map((item) =>
                    <li key = {item.id}>
                        {item.title}
                    </li>
                    )}
                </ul>
            </div>
            {categories.map((cat) => (
                <label>
                    {cat}
                    <input
                        type="checkbox"
                        value={cat}
                        onChange={handleCategoryChange}
                        checked={selectedCategories.includes(cat)}
                    />
                </label>
            ))}
            <div>
                <ul>
                    {filteredProducts.map((prod) => {
                        const isProdInCart = cart.find((itm) => itm.id === prod.id);
                        return (
                            <li key={prod.id}>
                                {prod.title} -{prod.price}${" "}
                                {isProdInCart ? (
                                    <span>
                                        <button onClick={() => increaseQuantity(prod.id)}>+</button>
                                        {isProdInCart.qty}
                                        <button onClick={() => decreaseQuantity(prod.id)}>-</button>
                                    </span>
                                ) : (
                                    <button onClick={() => handleAddToCart(prod)}>
                                        Add To Cart
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <h3>Cart Products</h3>
                {cart.length === 0 ? (
                    <div>
                        <span>Your cart is Empty</span>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {cart.map((itm) => (
                                <li key={itm.id}>
                                    name: {itm.title} - qty: {itm.qty} - Price:{" "}
                                    {(itm.price * itm.qty).toFixed(2)}$
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <h3>
                        Total Price:{" "}
                        {cart
                            .reduce((total, item) => total + item.qty * item.price, 0)
                            .toFixed(2)}
                        ${" "}
                    </h3>
                </div>
            </div>
        </div>
    );


}
export default CartWithFilter;