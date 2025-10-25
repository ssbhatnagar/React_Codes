import React from 'react'
import styles from '../CSS/Header.module.css'
import Cart from './Cart.jsx'
import SearchBar from './SearchBar.jsx'


function Header() {



  return (
    <div className={styles.headerContainer}>
    <div>
    <h1 className={styles.heading}>EKART</h1>
    </div>
    <div className={styles.SearchBar}>
     <SearchBar/>
     </div>
     <div className={styles.Cart}>
    <Cart/>
    </div>
    </div>
  )
}

export default Header