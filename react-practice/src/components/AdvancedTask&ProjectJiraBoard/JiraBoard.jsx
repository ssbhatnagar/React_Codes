import { useEffect, useState } from "react";

const initialTasks = [
    { id: "t1", title: "Setup Redux Toolkit", category: "Frontend", priority: "High", isCompleted: false },
    { id: "t2", title: "Design Database Schema", category: "Backend", priority: "Medium", isCompleted: true },
    { id: "t3", title: "Configure Docker Container", category: "DevOps", priority: "Low", isCompleted: false }
];

function JiraBoard() {
    // MAIN TASK STATE WITH LAZY INITIALIZATION
    const [task, setTask] = useState(() => {
        const savedData = localStorage.getItem("jiraTask")
        return savedData ? JSON.parse(savedData) : initialTasks
    });

    // AUTO-SAVE WITH DEBOUNCED TIMER
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("jiraTask", JSON.stringify(task))
        }, 1500)

        return () => {
            clearTimeout(timer)
        }
    }, [task])

    // FORM STATES WITH SAFE DEFAULTS
    const [titleInput, setTitleInput] = useState("");
    const [inputCategory, setInputCategory] = useState("Frontend");
    const [inputPriority, setInputPriority] = useState("Medium");

    // NEW FILTER TRACKER STATES
    const [filterSearch, setFilterSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All"); // All, Pending, Completed
    const [filterCategories, setFilterCategories] = useState([]); // Array for multiple categories

    // SUBMIT DATA (ADD TASK)
    function handleSubmitData(e){
        e.preventDefault();
        if(titleInput.trim() === ""){
            window.alert("Title needed")
            return
        }
        const newTask = {
            id: Date.now().toString(),
            title: titleInput,
            category: inputCategory,
            priority: inputPriority,
            isCompleted: false
        }
        setTask((prev) => [...prev, newTask])
        setTitleInput("")
        setInputCategory("Frontend") // Safe Reset
        setInputPriority("Medium")   // Safe Reset
    }

    // CRUD ACTIONS
    function handleDelete(idx){
        setTask((prev) => prev.filter((t) => t.id !== idx))
    }

    function handleIsComplete(idx){
        setTask((prev) =>
            prev.map((t) => t.id === idx ? {...t, isCompleted: !t.isCompleted} : t)
        )
    }

    // FILTER CHECKBOX HANDLER
    function handleCategoryFilter(cat) {
        setFilterCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    }

    // DERIVED STATE ENGINE: Dynamic live filtering on every render
    const displayedTasks = task.filter((tsk) => {
        // 1. Search Filter
        const matchedSearch = tsk.title.toLowerCase().includes(filterSearch.toLowerCase());

        // 2. Status Filter (Radio)
        let matchedStatus = true;
        if (filterStatus === "Completed") matchedStatus = tsk.isCompleted;
        if (filterStatus === "Pending") matchedStatus = !tsk.isCompleted;

        // 3. Category Filter (Checkbox)
        const matchedCategory = filterCategories.length === 0 || filterCategories.includes(tsk.category);

        return matchedSearch && matchedStatus && matchedCategory;
    });

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Jira Board</h1>
            
            <div style={{ display: "flex", gap: "40px" }}>
                {/* LEFT COLUMN: ADD TASK FORM */}
                <div style={{ flex: 1 }}>
                    <h3>Add the task</h3>
                    <form onSubmit={(e) => handleSubmitData(e)}>
                        <fieldset>
                            <legend>Task</legend>
                            <label style={{ display: "block", marginBottom: "10px" }}>
                                Add title <br />
                                <input
                                    type="text"
                                    placeholder="Enter title of task"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    style={{ width: "90%", padding: "6px" }}
                                />
                            </label>
                            
                            <fieldset style={{ marginBottom: "10px" }}>
                                <legend>Select Category</legend>
                                <select value={inputCategory} onChange={(e) => setInputCategory(e.target.value)} style={{ padding: "5px", width: "100%" }}>
                                    {["Frontend", "Backend", "DevOps"].map((cat) => 
                                        <option key={cat} value={cat}>{cat}</option>
                                    )}
                                </select>
                            </fieldset>

                            <fieldset style={{ marginBottom: "10px" }}>
                                <legend>Select Priority</legend>
                                {["Low", "Medium", "High"].map((p) =>
                                    <label key={p} style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={p}
                                            checked={inputPriority === p}
                                            onChange={() => setInputPriority(p)}
                                        />
                                        {p}
                                    </label>
                                )}
                            </fieldset>
                        </fieldset>
                        <button type="submit" style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>Submit</button>
                    </form>
                </div>

                {/* RIGHT COLUMN: ADVANCED FILTERS & LIVE DASHBOARD */}
                <div style={{ flex: 2, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
                    <h3>Master Dashboard Filters</h3>
                    
                    {/* A. TEXT SEARCH BAR */}
                    <div style={{ marginBottom: "15px" }}>
                        <input 
                            type="text"
                            placeholder="🔍 Search tasks by title..."
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                        />
                    </div>

                    {/* B. STATUS FILTER (RADIO BUTTONS) */}
                    <div style={{ marginBottom: "15px" }}>
                        <strong>Status: </strong>
                        {["All", "Pending", "Completed"].map((status) => (
                            <label key={status} style={{ marginRight: "15px", cursor: "pointer" }}>
                                <input 
                                    type="radio"
                                    name="filterStatus"
                                    checked={filterStatus === status}
                                    onChange={() => setFilterStatus(status)}
                                />
                                {status}
                            </label>
                        ))}
                    </div>

                    {/* C. CATEGORY FILTER (CHECKBOXES) */}
                    <div style={{ marginBottom: "25px" }}>
                        <strong>Categories: </strong>
                        {["Frontend", "Backend", "DevOps"].map((cat) => (
                            <label key={cat} style={{ marginRight: "15px", cursor: "pointer" }}>
                                <input 
                                    type="checkbox"
                                    checked={filterCategories.includes(cat)}
                                    onChange={() => handleCategoryFilter(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>

                    {/* TASK DISPLAY LIST */}
                    <h3>Sprint Tasks ({displayedTasks.length})</h3>
                    {displayedTasks.length === 0 ? (
                        <p style={{ color: "#777" }}>No tasks match the selected filters.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {displayedTasks.map((tsk) => (
                                <li key={tsk.id} style={{ 
                                    padding: "10px", 
                                    border: "1px solid #ddd", 
                                    borderRadius: "4px", 
                                    marginBottom: "8px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={tsk.isCompleted}
                                            onChange={() => handleIsComplete(tsk.id)}
                                            style={{ marginRight: "10px", cursor: "pointer" }}
                                        />
                                        <span style={{ textDecoration: tsk.isCompleted ? 'line-through' : 'none', fontWeight: "bold" }}>
                                            {tsk.title}
                                        </span>
                                        <span style={{ fontSize: "12px", marginLeft: "10px", padding: "2px 6px", backgroundColor: "#eee", borderRadius: "3px" }}>
                                            {tsk.category}
                                        </span>
                                        <span style={{ fontSize: "12px", marginLeft: "5px", padding: "2px 6px", backgroundColor: tsk.priority === "High" ? "#ffcccc" : "#e2f0cb", borderRadius: "3px" }}>
                                            {tsk.priority}
                                        </span>
                                    </div>
                                    <button onClick={() => handleDelete(tsk.id)} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JiraBoard;