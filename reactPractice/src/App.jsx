import { useState } from "react";

function App() {
  const [userInput, setuserInput] = useState("");
  const [todos, setTodos] = useState([]);

  function submitHandler() {
    if (userInput.trim() !== "") {
      const todo = {
        id: Date.now(),
        todo: userInput,
      };
      setTodos((prevTodo) => [...prevTodo, todo]);
      setuserInput("");
    } else {
      window.alert("Todo cannot be empty");
    }
  }

  function deleteTodo(index) {
    setTodos(todos.filter((todo) => index !== todo.id));
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
              {todo.todo}
              <span>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button>Edit</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
