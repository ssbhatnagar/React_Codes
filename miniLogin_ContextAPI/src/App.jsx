import './App.css'
import Profile from './components/Profile/Profile.jsx'
import Login from './components/Login/Login.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'
function App() {
  

  return (
   
    <UserContextProvider>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
