import React, { useEffect, useState } from 'react';

// 1. ✅ FIX: getInitialTodos ko component ke BAHAR define kiya
//    Taki useState isko correctly reference kar sake.
const getInitialTodos = () => {
    const savedTodos = localStorage.getItem("myTodoList");
    if (savedTodos) {
        // Data ko JSON string se object/array mein badalna
        return JSON.parse(savedTodos);
    }
    return []; // Agar kuch nahi mila, toh khaali array return karo
};

function Todo() {
    // States
    // 2. ✅ FIX: useState ko getInitialTodos se initialize kiya
    const [userInput, setUserInput] = useState("");
    const [todos, setTodos] = useState(getInitialTodos); 
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    // 3. ✅ SAVE: Jab bhi 'todos' change ho, Local Storage mein save karo
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(todos));
    }, [todos]);
    
    // (Note: Load karne wala redundant useEffect yahan se hata diya gaya hai)


    // --- Functions ---
    
    function submitTodo() {
        if (userInput.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                todo: userInput,
                complete: false // Complete state bhi add ki gayi hai (Optional)
            };
            setTodos((prevTodo) => [...prevTodo, newTodo]);
            setUserInput("");
        } else {
            window.alert("Todo cannot be empty");
        }
    }

    function handleEnterInput(e) {
        if (e.key === "Enter") {
            submitTodo();
        }
    }

    function clearAll(){
        setTodos([]);
    }

    function deleteTodo(idToDelete){ // Parameter ka naam 'idToDelete' se theek kiya
        setTodos((prevTodo) => 
            prevTodo.filter((todo) =>
                todo.id !== idToDelete
            )
        );
    }

    function editTodo(currentTodo){
        setEditingId(currentTodo.id);
        setEditingText(currentTodo.todo);
    }

    function updateTodo(currentTodo){
        if(editingText.trim() !== ""){
            setTodos((prevTodo) => 
                prevTodo.map((todo) =>
                    todo.id === currentTodo.id
                    ? { ...todo, todo: editingText } // Simplified map logic
                    : todo
                )
            );
            setEditingId(null);
            setEditingText(""); // Edit hone ke baad editingText ko clear karna achha hai
        } else {
            window.alert("Todo cannot be empty");
        }
    }

    // --- Render JSX ---

    return (
        <div>
            <h1>React Todo List</h1>
            <div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your Todo"
                    onKeyDown={handleEnterInput}
                />
                <button onClick={submitTodo}>Submit</button>
                {todos.length > 0 && <button onClick={clearAll}>Clear All</button>}
            </div>
            
            <hr/>
            
            <div>
                <ul>
                    {todos.map((todo) =>
                        <li key={todo.id}>
                            {/* 4. ✅ FIX: Editing Mode Toggle */}
                            {todo.id === editingId ? (
                                // Editing Input dikhega
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)} // Fix: onChange mein (e) pass kiya
                                    placeholder='update your todo'
                                />
                            ) : (
                                // Todo Text dikhega (Optional: strike-through style)
                                <span
                                    style={{
                                        textDecoration: todo.complete ? "line-through" : "none",
                                        color: todo.complete ? "#888" : "#000"
                                    }}
                                >
                                    {todo.todo}
                                </span>
                            )}
                            
                            {/* Checkbox (if added) */}
                            {/* <input type="checkbox" checked={todo.complete} onChange={() => setComplete(todo.id)} /> */}
                            
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>

                            {/* Edit/Update button toggling */}
                            {todo.id === editingId ? (
                                <button onClick={() => updateTodo(todo)}>Update</button>
                            ) : (
                                <button onClick={() => editTodo(todo)}>Edit</button>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Todo;