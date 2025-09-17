import React, { useState } from "react";

function Todo() {
    // Current input value ko track karta hai
    const [inputValue, setInputValues] = useState("");
    // Saare to-do items ko store karta hai
    const [todos, settodos] = useState([]);
    // Yeh state track karta hai ki kaunsa to-do item edit mode mein hai
    // ismein us item ka index store hota hai
    const [editIndex, setEditIndex] = useState(null);
    
    // Naya to-do add karne ka handler
    // Ab ye function 'Enter' key press par bhi call ho sakta hai
    function submitHandler() {
        if (inputValue.trim() !== "") {
            // Agar edit mode active hai
            if (editIndex !== null) {
                // To-do ko update karte hain
                const updatedTodos = todos.map((todo, index) => {
                    if (index === editIndex) {
                        return inputValue; // Purane item ko naye item se replace karte hain
                    }
                    return todo;
                });
                settodos(updatedTodos);
                setEditIndex(null); // Edit mode ko band karte hain
            } else {
                // Naya to-do add karte hain
                settodos([...todos, inputValue]);
            }
            setInputValues(""); // Input field ko khali karte hain
        }
    }

    // To-do delete karne ka handler
    function deleteHandler(index) {
        const newTodos = todos.filter((element, i) => i !== index);
        settodos(newTodos);
    }
    
    // Edit mode ko chalu karne ka handler
    function handleEdit(index, todoText) {
        setEditIndex(index);
        setInputValues(todoText); // Input field mein purana text daalte hain
    }

    // Enter key press ko handle karne ka handler
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            submitHandler(); // Enter dabane par submit handler call hota hai
        }
    }

    return (
        <div className="mainContent">
            <h1>ToDo List</h1>
            <div className="inputBox">
                {/* Input field jismein onKeyDown event handler add kiya hai */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValues(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
            </div>
            <div className="SubmitBtnContainer">
                {/* Submit button ka text edit mode ke hisaab se badal raha hai */}
                <button className="submitBtn" onClick={submitHandler}>
                    {editIndex !== null ? "Update Todo" : "Submit Todo"}
                </button>
            </div>
            <div className="todoList">
                {todos.map((todo, index) => (
                    <div className="singleTodo" key={index} >
                        {todo}
                        {/* Delete aur Edit button */}
                        <div className="deleteEditBtn">
                        <button className="deleteBtn" onClick={() => deleteHandler(index)}>X</button>
                        <button className="editBtn" onClick={() => handleEdit(index, todo)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;