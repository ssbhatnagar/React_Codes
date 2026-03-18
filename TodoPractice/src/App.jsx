import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList';

const initialData = [
  {
    id: 1,
    todoText: "Learn React",
    isCompleted: false,
  },
  {
    id: 2,
    todoText: "Learn JS",
    isCompleted: true,
  },
  {
    id: 3,
    todoText: "Learn html",
    isCompleted: true,
  },
  {
    id: 4,
    todoText: "Learn Css",
    isCompleted: false,
  },
  {
    id: 5,
    todoText: "Learn TS",
    isCompleted: false,
  }
]

function App() {

  // const [todos, setTodos] = useState(initialData);
  const [userInput, setUserInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingInput, setEditingInput] = useState("");


  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("savedData");
    return savedTodos ? JSON.parse(savedTodos) : initialData
  })

  useEffect(() => {
    localStorage.setItem("savedData", JSON.stringify(todos))
  }, [todos])

  function handleSubmitTodo() {

    if (userInput.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        todoText: userInput,
        isCompleted: false
      }
      setTodos((prev) => [...prev, newTodo])
      setUserInput("")
    } else {
      window.alert("Todo cannot be empty")
    }
  }

  function deleteTodo(idx) {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== idx)
    )
  }

  function toggleDoneStatus(idx) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === idx ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  function editTodo(currentTodo) {
    setEditingId(currentTodo.id);
    setEditingInput(currentTodo.todoText);
  }

  function updateTodo(idx) {
    if (editingInput.trim() !== "") {
      // const newTodo = {
      //   id: Date.now(),
      //   todoText: editingInput,
      //   isCompleted: false,
      // }
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === idx ? { ...todo, todoText: editingInput } : todo
        )
      )
      setEditingId(null);
      setEditingInput("")
    } else {
      window.alert("Todo cannot be empty")
    }
  }

  return (
    <div className='main-container'>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your Todo here ..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSubmitTodo}>Submit</button>
      </div>
      <TodoList
      todos={todos}
      editTodo={editTodo}
      updateTodo={updateTodo}
      setEditingInput={setEditingInput}
      toggleDoneStatus={toggleDoneStatus}
      editingId={editingId}
      />

    </div>
  )
}

export default App
