import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [cart, setCart] = useState([
  { id: 101, name: "T-Shirt", qty: 1, price: 500 },
  { id: 102, name: "Jeans", qty: 1, price: 1000 }
]);

function incrementQty(productId){
  setCart((prev) => 
    prev.map((item) => 
      item.id === productId ?  {...item, qty: item.qty+1} : item
    )
  )
}

  return (
    <div className='mainDiv'>
   <div className='div1'>1</div>
   <div className='div2'>2</div>
   <div className='div3'>3</div>
   <div className='div4'>4</div>
</div>
  )
}

export default App
