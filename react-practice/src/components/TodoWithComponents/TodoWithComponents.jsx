import { useState, useEffect } from "react";

function TodoWithComponents() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingInput, setEditingInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetch("https://dummyjson.com/todos");
        if (!rawData.ok) {
          throw new Error("Error in fetching Data");
        }
        const data = await rawData.json();
        setTodos(data.todos);
      } catch (error) {
        setError("Error in fetching data from API");
        console.log("Error in Loading");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleMarkAsDone(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleSubmitTodo() {
    const newTodo = {
      id: Date.now().toString(),
      todo: userInput,
      completed: false,
      userId: Date.now().toString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setUserInput("");
  }

  function handleEdit(currentTodo) {
    setEditingId(currentTodo.id);
    setEditingInput(currentTodo.todo);
  }

  function handleUpdate(currentTodo) {
    const updatedTodo = {
      ...currentTodo,
      todo: editingInput,
    };
    setTodos((prev) =>
      prev.map((t) => (t.id === currentTodo.id ? updatedTodo : t))
    );
    setEditingId(null);
    setEditingInput("");
  }

  if (error) {
    return <h1>Error in fetching data</h1>;
  }
  if (loading) {
    return <h1>loading data ... </h1>;
  }

  const searchedTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoComponent
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmitTodo={handleSubmitTodo}
      />
      <br />

      <SearchBarComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchedTodos ? (
        <ListOfTodos
          todos={searchedTodos}
          handleMarkAsDone={handleMarkAsDone}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editingId={editingId}
          editingInput={editingInput}
          setEditingId={setEditingId}
          setEditingInput={setEditingInput}
          handleUpdate={handleUpdate}
        />
      ) : (
        <ListOfTodos
          todos={todos}
          handleMarkAsDone={handleMarkAsDone}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editingId={editingId}
          editingInput={editingInput}
          setEditingId={setEditingId}
          setEditingInput={setEditingInput}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

function ListOfTodos({
  todos,
  handleMarkAsDone,
  handleDelete,
  editingId,
  setEditingId,
  editingInput,
  setEditingInput,
  handleEdit,
  handleUpdate,
}) {
  return (
    <div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.id === editingId ? (
              <span>
                <input
                  type="text"
                  value={editingInput}
                  onChange={(e) => setEditingInput(e.target.value)}
                />
              </span>
            ) : (
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.todo}
              </span>
            )}

            <CheckBoxComponent
              comp={t.completed}
              handleMarkAsDone={handleMarkAsDone}
              id={t.id}
            />
            <HandleDeleteComponent handleDelete={handleDelete} id={t.id} />
            {t.id === editingId ? (
              <button onClick={() => handleUpdate(t)}>Update</button>
            ) : (
              <button onClick={() => handleEdit(t)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckBoxComponent({ comp, handleMarkAsDone, id }) {
  return (
    <input
      type="checkbox"
      checked={comp}
      onChange={() => handleMarkAsDone(id)}
    />
  );
}

function HandleDeleteComponent({ handleDelete, id }) {
  return <button onClick={() => handleDelete(id)}>Delete</button>;
}

function AddTodoComponent({ handleSubmitTodo, userInput, setUserInput }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo ..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSubmitTodo}>Submit</button>
    </div>
  );
}

function SearchBarComponent({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Todo Here ..."
      />
    </div>
  );
}

export default TodoWithComponents;
