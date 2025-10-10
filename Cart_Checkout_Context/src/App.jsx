import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Body from './components/Body'
import {CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext';
import { FilterProvider } from './context/FilterContext.jsx';

function App() {
 
  return (
    <BrowserRouter>
      <FilterProvider>
        <CartProvider>
          <SearchProvider>
            <Body />
          </SearchProvider>
        </CartProvider>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
