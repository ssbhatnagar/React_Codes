import React from 'react';
import { Link } from 'react-router-dom'; // <-- New Import for Routing
import SearchBar from './SearchBar';
// import Cart from './Cart'; // <-- Cart component ko yahan se hata diya, woh Body.jsx mein Routes ke andar rahega.
import styles from '../Css/Header.module.css';

function Header(){
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
                    🛒 Cart (0) {/* Aap yahan koi bhi icon ya component use kar sakte hain */}
                </Link>
             </nav>
             
            <hr className={styles.divider}/> 
        </div>
    );
}

export default Header