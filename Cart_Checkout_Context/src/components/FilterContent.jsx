import React from "react";

import { useFilter } from "../context/FilterContext";
// import styles from "../Css/FilterComponent.module.css";

function FilterContent() {
  const { selectedCategory, setSelectedCategory } = useFilter();

  const categories = ["All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];        
    return (
        <div>
      <label htmlFor="category" >Filter by Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
    )
}

export default FilterContent;