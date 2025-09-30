import { useState } from 'react'
import './App.css'

function App() {

const [input, setInput] = useState("");
const [todos, setTodos] = useState([]);
const [isEdit, setIsEdit] = useState(null)

function handleSubmit(){
 if(input.trim() !== ""){
  if(isEdit !== null){
    setTodos( (prevTodo) =>
      prevTodo.map((todo) => (
        todo.id === isEdit ? {...todo, todo: input} : todo
      )
      )
    );
    setIsEdit(null)
    setInput("")
  }else{
    const newTodos = {
      id : Date.now(),
      todo: input,
      checked: false
    }
    setTodos((prevTodo) => [...prevTodo, newTodos])
    setInput("");
  }
  }
    
}

function handleDelete(id){
  setTodos(todos.filter((todo) => todo.id !== id))
}

function handleEdit(id){
const updatedTodo = todos.find((todo) => todo.id === id);
setInput(updatedTodo.todo)
setIsEdit(id)

}

function handleDoneTodos(id){
  setTodos(
    todos.map((todo) => todo.id === id ? {...todo, checked: !todo.checked} : todo)
  )
}

  return (
    <div>
    <div>
      <input
      type='text'
      placeholder='Enter your todos ...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button 
      onClick={handleSubmit}
       >Add</button>
       <div>
        <ul>
          {todos.map((todo) => (
            <li key = {todo.id}>
            <input
            type='checkbox'
            onChange={() => handleDoneTodos(todo.id)}
            />
            {todo.todo}
            <button onClick={()=>handleEdit(todo.id)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            
            </li>
          ) )}
        </ul>
       </div>
    </div>
    </div>
  )
}

export default App
