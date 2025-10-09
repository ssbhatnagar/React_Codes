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

export function useSearch() {
  return useContext(searchContext);
}