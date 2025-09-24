/*
 This Todo app demonstrates the use of useState, this is different from the other todo app that i created earlier 
 as this one is having additional functionality of marking the task as completed and updateing the task. 
*/

import React, { useState } from "react";
import "../../styles/TodoFinal.css";

const TodoFinal = () => {
  const [inputValues, setInputValues] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  function submitHandler() {
    if (inputValues.trim() !== "") {
      if (isEdit !== null) {
        setTodos((prevTodo) =>
          prevTodo.map((todo) =>
            todo.id === isEdit ? { ...todo, text: inputValues } : todo
          )
        );
        setIsEdit(null);
        setInputValues("");
      } else {
        const newTodo = {
          id: Date.now(),
          text: inputValues,
          completed: false,
        };
        setTodos((prevTodo) => [...prevTodo, newTodo]);
        setInputValues("");
      }
    }
  }

  function handleDoneTodos(index) {
    setTodos(
      todos.map((todo) =>
        todo.id === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(index) {
    setTodos(todos.filter((todo) => todo.id !== index));
  }

  function handleEdit(index) {
    const updatedTodo = todos.find((todo) => todo.id === index);
    setInputValues(updatedTodo.text);
    setIsEdit(index);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      submitHandler();
    }
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="todo-container">
        <input
          className="todo-input"
          value={inputValues}
          placeholder="Enter your Todo"
          onChange={(e) => setInputValues(e.target.value)}
          onKeyDown={handleEnter}
          type="text"
        />
        <button className="submit-button" onClick={submitHandler}>
          {isEdit ? "Update Todo" : "Submit"}
        </button>
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() => handleDoneTodos(todo.id)}
                />
                <span className={todo.completed ? "todo-text done" : "todo-text"}>{todo.text}</span>
                <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEdit(todo.id)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoFinal;
