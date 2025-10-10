import { useContext, createContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const value = { selectedCategory, setSelectedCategory };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

// ✅ This is the custom hook
export function useFilter() {
  return useContext(FilterContext);
}
