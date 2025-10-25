import React from "react";
import ProductList from "./ProductList";
import styles from "../CSS/Body.module.css";
import Header from "./Header";
import ProductFilter from "./ProductFilter"

function Body() {
  return (
    <div>
      <Header />
      <div className={styles.filterListContainer}>
      <ProductFilter/>
      <ProductList />
      </div>
    </div>
  );
}

export default Body;
