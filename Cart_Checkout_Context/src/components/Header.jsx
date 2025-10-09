import React from 'react';
import { Link } from 'react-router-dom'; 
import SearchBar from './SearchBar';
import styles from '../Css/Header.module.css';
import { useCart } from '../context/CartContext'; // CartContext se cartItems ko access karne ke liye

function Header(){

    const { totalItems } = useCart(); // CartContext se cartItems ko access karna

    return(
        <div className={styles.headerContainer}>
            <h1 className={styles.heading}>SIMPLE SHOP</h1>
             <SearchBar />
             {/* Cart ko Link se replace kiya taaki woh /cart route par ja sake */}
             <nav className={styles.navLinks}>
                <Link to="/" className={styles.navItem}>Products</Link>
                <br/>
                <Link to="/cart" className={styles.navItem}>
                    {/* Yahan hum Cart icon ya text display karenge */}
                    🛒 Cart {totalItems > 0 && `(${totalItems})`} {/* Aap yahan koi bhi icon ya component use kar sakte hain */}
                </Link>
             </nav>
             
            <hr className={styles.divider}/> 
        </div>
    );
}

export default Header