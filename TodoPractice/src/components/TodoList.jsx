import '../css/TodoList.css'

function TodoList({todos, editingId , setEditingInput, toggleDoneStatus, updateTodo, editTodo}){

    return(
        <div>
        <ul>
          {todos.map((todo) =>
            <li className="TodoList" key={todo.id}>
              <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }} >
                {todo.id === editingId ? (
                  <input
                    type="text"
                    value={editingInput}
                    onChange={(e) => setEditingInput(e.target.value)}
                  />
                ) : (<span> {todo.todoText} </span>)}

              </span>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleDoneStatus(todo.id)}
              />
              {todo.isCompleted === false && (
                <span>
                  {todo.id === editingId ? (


                    <button onClick={() => updateTodo(todo.id)} >Update</button>
                  ) : (
                    <button onClick={() => editTodo(todo)} >Edit</button>
                  )}

                </span>
              )}
              <button onClick={() => deleteTodo(todo.id)} >Delete</button>


            </li>
          )}
        </ul>
      </div>
    )

}

export default TodoList