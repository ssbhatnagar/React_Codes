import React from "react";
import ProductList from "./ProductList";
import styles from "../CSS/Body.module.css";
import Header from "./Header";
import ProductFilter from "./ProductFilter"
import Cart from "./Cart";

function Body() {
  return (
    <div>
      {/* <Header />
      <div className={styles.filterListContainer}>
      <ProductFilter/>
      <ProductList />
      </div> */}
      <Cart/>
    </div>
  );
}

export default Body;
