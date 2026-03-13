import { useState } from "react";

const todoItems = [
    {
        id: Date.now(),
        todoText: "Learn React",
        isCompleted: false,
    },
    {
        id: Date.now(),
        todoText: "Learn Js",
        isCompleted: false,
    },
    {
        id: Date.now(),
        todoText: "Learn theory",
        isCompleted: true,
    },
    {
        id: Date.now(),
        todoText: "TS",
        isCompleted: true,
    },
    {
        id: Date.now(),
        todoText: "Learn CSS",
        isCompleted: false,
    }


]

function TodoApp() {

    const [todos, setTodos] = useState([]);
    const [userInput, setUserInput] = useState("");

    function submitTodo() {
        if (userInput.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                todoText: userInput,
                isCompleted: false
            }
            setTodos((prev) => (
                [...prev, newTodo]
            ))
            setUserInput("")
        } else {
            window.alert("Todo Cannot be empty")
        }
    }

    function toggleIsComplete(index) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        )
    }

    function deleteTodo(index){
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== index) 
        )
    }

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    name="TodoInput"
                    placeholder="Enter your Todo"
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                />
            </div>
            <div>
                <button onClick={submitTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) =>
                    <li key={todo.id}>
                        <span style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                            {todo.todoText}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => toggleIsComplete(todo.id)}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TodoApp;