import React from "react";
import ProductList from "./ProductList";
// import styles from "../CSS/Body.module.css";
import Header from "./Header";

function Body() {
  return (
    // className={styles.body}
    <div>
      <Header />
      <ProductList />
    </div>
  );
}

export default Body;
