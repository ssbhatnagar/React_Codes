import React from 'react'
import styles from '../CSS/Header.module.css'
import Cart from './Cart.jsx'

function Header() {
  return (
    <div className={styles.centerContainer}>
    <div className={styles.mainHeaderDiv}>
      <h1 className={styles.heading}>THE WEIRED ONLINE SHOP</h1>
    </div>
    <Cart/>
    </div>
  )
}

export default Header