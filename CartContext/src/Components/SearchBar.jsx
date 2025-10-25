import React from 'react'
import styles from '../CSS/SearchBar.module.css'

function SearchBar() {

  
  

  return (
    <div className={styles.SearchBar}>
        <input
        // value={searchedItem}
        className={styles.input}
        type="search"
        placeholder='Search for products, brands and more'
        ></input>
    </div>
  )
}

export default SearchBar