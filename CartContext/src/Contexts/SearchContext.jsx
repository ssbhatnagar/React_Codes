import { useContext, createContext, useState } from "react";

const searchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </searchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(searchContext);
}