import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Body from './components/Body'
import {CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext';

function App() {
 
  return (
    <BrowserRouter> 
      <CartProvider>
      <SearchProvider>
        <Body />
      </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
