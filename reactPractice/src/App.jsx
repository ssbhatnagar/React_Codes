import { useState } from "react";

function App() {
  const [userInput, setuserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function submitHandler() {
    if (userInput.trim() !== "") {
      const todo = {
        id: Date.now(),
        todo: userInput,
        completed: false,
      };
      setTodos((prevTodo) => [...prevTodo, todo]);
      setuserInput("");
    } else {
      window.alert("Todo cannot be empty");
    }
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => id !== todo.id));
  }

  function editTodo(currentTodo) {
    setEditText(currentTodo.todo);
    setEditingId(currentTodo.id);
  }

  function updateTodo(currentTodo) {
    if (editText.trim() !== "") {
      setTodos((prevTodo) =>
        prevTodo.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, todo: editText } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    } else {
      window.alert("Todo cannot be empty");
    }
  }

  function markAsDone(currentTodo) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === currentTodo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={userInput}
          onChange={(e) => setuserInput(e.target.value)}
        ></input>
        <button onClick={submitHandler}> Submit Todo</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.id === editingId ? (
                <input
                  type="text"
                  placeholder="edit Todo"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                ></input>
              ) : (
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </span>
              )}

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => markAsDone(todo)}
              ></input>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              {!todo.completed &&
                (todo.id === editingId ? (
                  <button onClick={() => updateTodo(todo)}>Update</button>
                ) : (
                  <button onClick={() => editTodo(todo)}>Edit</button>
                ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
