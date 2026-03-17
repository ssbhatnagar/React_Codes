import { Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/Home'

// Components
import TodoApp from './components/TodoApp/TodoApp'
import Calculator from './components/Calculator/Calculator'
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator'
import WeatherApp from './components/WeatherApp/WeatherApp'
import ApiCalling from './components/ApiCalling/ApiCalling'
import Twitter from './components/TwitterClone/Twitter'
import FilterAPIData from './components/FilterAPIData/FilterAPIData'
import CartProject from './components/CartProj/CartProject'
import SimpleTimer from './components/SimpleTimer/SimpleTimer'
import Form from './components/Form/Form'
import BgColorChanger from './components/BgColorChanger/BgColorChanger'
import ProgressBar from './components/ProgressBar/ProgressBar'
import StarRating from './components/StarRating/StarRating'
import TicTacToe from './components/TicTacToe/TicTacToe'
import InputTypes from './components/InputTypes/InputTypes'
import FilterBasics from './components/FilterBasics/FilterBasics'
import Modal from './components/Modal/Modal'
import SearchBar from './components/SearchBar/SearchBar'
import TabForm from './components/TabForm/TabForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todoapp" element={<TodoApp />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
      <Route path="/weather" element={<WeatherApp />} />
      <Route path="/api-calling" element={<ApiCalling />} />
      <Route path="/twitter" element ={<Twitter/>} />
      <Route path="/filter" element = {<FilterAPIData/>} />
      <Route path= "/cart" element = {<CartProject/>} />
      <Route path='/timer' element={<SimpleTimer/>} />
      <Route path='/form' element={<Form/>}/>
      <Route path='/color' element={<BgColorChanger/>} />
      <Route path='/progress' element={<ProgressBar/>} />
      <Route path='/star' element={<StarRating/>} />
      <Route path='/tictactoe' element={<TicTacToe/>}/>
      <Route path='/input' element ={<InputTypes/>}/>
      <Route path='/filterbasic' element={<FilterBasics/>} />
      <Route path='/modal' element={<Modal/>} />
      <Route path='/search' element={<SearchBar/>}/>
      <Route path='/tab' element={<TabForm/>} />
    </Routes>
  )
}

export default App
