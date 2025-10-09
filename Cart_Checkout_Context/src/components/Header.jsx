import React from 'react';
import { Link } from 'react-router-dom'; 
import SearchBar from './SearchBar';
import styles from '../Css/Header.module.css';
import { useCart } from '../context/CartContext'; 
import { useSearch } from '../context/SearchContext';
function Header(){

    const { totalItems } = useCart(); 
    

    return(
        <div className={styles.headerContainer}>
            <h1 className={styles.heading}>SIMPLE SHOP</h1>
            <SearchBar  />
             <nav className={styles.navLinks}>
                <Link to="/" className={styles.navItem}>Products</Link>
                <br/>
                <Link to="/cart" className={styles.navItem}>
                    🛒 Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
             </nav>
             
            <hr className={styles.divider}/> 
        </div>
    );
}

export default Header