import React from 'react'
import { useSearch } from '../context/SearchContext'

function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div>
      <input
        type="search"
        placeholder='search products...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <button>Search</button> */}
    </div>
  )
}

export default SearchBar