import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Body from './components/Body'
// import {CartProvider } from './ contexts/CartContext';

function App() {
 
  return (
    <BrowserRouter> 
      {/* <CartProvider> */}
        <Body />
      {/* </CartProvider> */}
    </BrowserRouter>
  )
}

export default App
