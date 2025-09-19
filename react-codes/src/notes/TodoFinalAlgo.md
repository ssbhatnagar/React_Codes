# TodoFinal Component: Line-by-Line Explanation and Algorithm

## Step-by-Step Algorithm

1. **Initialize State**: Set up state variables for input value, todo list, and edit mode.
2. **Handle Input Change**: Update input value as the user types.
3. **Submit Handler**:
   - If input is not empty:
     - If editing, update the selected todo.
     - Else, add a new todo to the list.
   - Reset input and edit state.
4. **Mark as Done**: Toggle the completed status of a todo.
5. **Delete Todo**: Remove a todo from the list.
6. **Edit Todo**: Set the selected todo for editing and populate input.
7. **Handle Enter Key**: Allow submission with the Enter key.
8. **Render UI**: Display input, button, and the list of todos with edit, delete, and complete options.

---

## Line-by-Line Explanation

```
/*
 This Todo app demonstrates the use of useState, this is different from the other todo app that i created earlier 
 as this one is having additional functionality of marking the task as completed and updateing the task. 
*/
```
- File-level comment describing the purpose and features of the component.

```
import React, { useState } from "react";
```
- Import React and the `useState` hook for managing component state.

```
const TodoFinal = () => {
```
- Define the functional component `TodoFinal`.

```
  const [inputValues, setInputValues] = useState("");
```
- State for the current value of the input field. Initially empty.

```
  const [todos, setTodos] = useState([]);
```
- State for the list of todo items. Starts as an empty array.

```
  const [isEdit, setIsEdit] = useState(null);
```
- State to track if a todo is being edited. `null` means not editing.

```
  function submitHandler() {
```
- Function to handle adding or updating todos.

```
    if (inputValues.trim() !== "") {
```
- Only proceed if the input is not empty or whitespace.

```
      if (isEdit !== null) {
```
- If editing an existing todo:

```
        setTodos((prevTodo) =>
          prevTodo.map((todo) => 
            todo.id === isEdit ? { ...todo, text: inputValues } : todo
          ),
        );
```
- Update the todo with the matching id, changing its text.

```
        setIsEdit(null);
        setInputValues("");
```
- Reset edit mode and clear the input.

```
      } else {
```
- If not editing, add a new todo:

```
        const newTodo = {
          id: Date.now(),
          text: inputValues,
          completed: false,
        };
```
- Create a new todo object with a unique id, the input text, and not completed.

```
        setTodos((prevTodo) => [...prevTodo, newTodo]);
        setInputValues("");
```
- Add the new todo to the list and clear the input.

```
      }
    }
  }
```
- End of submit handler.

```
  function handleDoneTodos(index) {
    setTodos(
      todos.map((todo) =>
        todo.id === index ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }
```
- Toggle the completed status of the todo with the given id.

```
  function handleDelete(index) {
    setTodos(todos.filter((todo) => todo.id !== index));
  }
```
- Remove the todo with the given id from the list.

```
  function handleEdit(index) {
    const updatedTodo = todos.find((todo) => todo.id === index);
    setInputValues(updatedTodo.text);
    setIsEdit(index);
  }
```
- Find the todo to edit, set its text in the input, and set edit mode.

```
  function handleEnter(e){
    if(e.key === "Enter"){
      submitHandler();
    }
  }
```
- If the Enter key is pressed, call the submit handler.

```
  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        <input
          value={inputValues}
          placeholder="Enter your Todo"
          onChange={(e) => setInputValues(e.target.value)}
          onKeyDown={handleEnter}
          type="text"
        />
        <button onClick={submitHandler}>{isEdit ? "Update Todo" : "Submit"}</button>
        <div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  onChange={() => handleDoneTodos(todo.id)}
                />
                {todo.text}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
```
- Render the UI: input, button, and the todo list with edit, delete, and complete options.

```
};

export default TodoFinal;
```
- End of component and export.
