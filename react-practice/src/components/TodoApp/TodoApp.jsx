import React, { useState, useEffect } from 'react'

export default function TodoApp() {
    const [userInput, setUserInput] = useState("");
    
    // 1. Initial State from LocalStorage
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("pro_todos");
        return saved ? JSON.parse(saved) : [];
    });

    const [editingId, setEditingId] = useState(null);
    const [editingInput, setEditingInput] = useState("");

    // 2. Auto-save to LocalStorage whenever 'todos' change
    useEffect(() => {
        localStorage.setItem("pro_todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit() {
        if (userInput.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                text: userInput,
                done: false // Mark as done ke liye default false
            }
            setTodos((prev) => [...prev, newTodo]);
            setUserInput("");
        } else {
            window.alert("Todo cannot be empty");
        }
    }

    function handleDelete(id) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    function editTodo(currentTodo) {
        setEditingId(currentTodo.id);
        setEditingInput(currentTodo.text);
    }

    function updateTodo(id) {
        setTodos((prev) =>
            prev.map((t) =>
                // FIX: 't' ko spread karna hai, 'prev' ko nahi
                t.id === id ? { ...t, text: editingInput } : t
            )
        );
        setEditingId(null);
        setEditingInput("");
    }

    // 3. Mark as Done Logic
    function toggleDone(id) {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, done: !t.done } : t
            )
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Pro Todo App</h2>
            <div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='Enter your todo'
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: '10px' }}>
                        {editingId === todo.id ? (
                            <input
                                type="text"
                                value={editingInput}
                                onChange={(e) => setEditingInput(e.target.value)}
                            />
                        ) : (
                            <span style={{ 
                                textDecoration: todo.done ? 'line-through' : 'none',
                                opacity: todo.done ? 0.6 : 1 
                            }}>
                                {todo.text}
                            </span>
                        )}

                        <div style={{ display: 'inline', marginLeft: '10px' }}>
                            {/* Checkbox for Mark as Done */}
                            <input 
                                type="checkbox" 
                                checked={todo.done} 
                                onChange={() => toggleDone(todo.id)} 
                            />

                            <button onClick={() => handleDelete(todo.id)}>Delete</button>

                            {editingId === todo.id ? (
                                <button onClick={() => updateTodo(todo.id)}>Save</button>
                            ) : (
                                <button onClick={() => editTodo(todo)}>Edit</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}