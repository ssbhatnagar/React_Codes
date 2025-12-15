import React, { useState } from 'react'

export default function TodoApp() {

    const [userInput, setUserInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingInput, setEditingInput] = useState("");

    function handleSubmitTodo() {
        if (userInput.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                todo: userInput
            }
            setTodo((prevTodo) => [...prevTodo, newTodo])
            setUserInput("")
        } else {
            window.alert("Todo cannot be empty")
        }
    }

    function editTodo(currentTodo) {
        setEditingId(currentTodo.id)
        setEditingInput(currentTodo.todo)
    }

    function deleteTodo(id) {
        setTodo(todo.filter((todo) => todo.id !== id));
    }

    function updateTodo(currentTodo) {
        if (editingInput.trim() !== "") {
            setTodo((prevTodo) =>
                prevTodo.map((todo) =>
                    todo.id === currentTodo.id ? { id: todo.id, todo: editingInput } : todo
                )
            )
            setEditingId(null)
            setEditingInput("")
        } else {
            window.alert("Todo cannot be empty")
        }
    }

    return (
        <div>
            <h1>TodoApp</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Todo here"
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                ></input>
                <button onClick={handleSubmitTodo}>Submit</button>
            </div>
            <div>
                <ul>
                    {todo.map((todo) =>
                        <li key={todo.id}>
                            {todo.id === editingId ? (
                                <input
                                    type="text"
                                    placeholder='Edit todo'
                                    value={editingInput}
                                    onChange={(e) => setEditingInput(e.target.value)}
                                ></input>
                            ) : (<span>{todo.todo}</span>)}
                            <button onClick={() => deleteTodo(todo.id)} >Delete</button>
                            {todo.id === editingId ? (<button onClick={() => updateTodo(todo)} >Update</button>) : (<button onClick={() => editTodo(todo)} >Edit</button>)}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
