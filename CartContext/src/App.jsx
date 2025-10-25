import './App.css'
import Body from './Components/Body'
import { SearchProvider } from './Contexts/SearchContext'

function App() {

  return (
    <div>
    <SearchProvider>
      <Body/>
    </SearchProvider>
    
    </div>
      
    
  )
}

export default App
