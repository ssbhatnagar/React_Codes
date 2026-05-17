import { useEffect, useState } from "react";

const initialTasks = [
    { id: "t1", title: "Setup Redux Toolkit", category: "Frontend", priority: "High", isCompleted: false },
    { id: "t2", title: "Design Database Schema", category: "Backend", priority: "Medium", isCompleted: true },
    { id: "t3", title: "Configure Docker Container", category: "DevOps", priority: "Low", isCompleted: false }
];

function JiraBoard() {

    const [task, setTask] = useState(() => {
        const savedData = localStorage.getItem("jiraTask")
        return savedData ? JSON.parse(savedData) : initialTasks
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("jiraTask", JSON.stringify(task))
        }, 1500)

        return () => {
            clearTimeout(timer)
        }
    }, [task])

    const defaultTask = initialTasks[0];
    
    const[titleInput, setTitleInput] = useState("");
    const[inputCategory, setInputCategory] = useState("");
    const[inputPriority, setInputPriority] = useState("");


    function handleSubmitData(e){
        e.preventDefault();
        if(titleInput.trim() === ""){
            window.alert("Titile needed")
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
    }

    
    function handleDelete(idx){
        setTask((prev) =>
            prev.filter((t) => t.id !== idx)
        )
    }

    function handleIsComplete(idx){
        setTask((prev) =>
            prev.map((t) => t.id === idx ? {...t, isCompleted: !t.isCompleted} : t)
        )
    }


    return (
        <div>
            <h1>Jira Board</h1>
            <div>
                <h3>Add the task</h3>
                <form onSubmit={(e) => handleSubmitData(e)}>
                    <fieldset>
                        <legend>Task</legend>
                        <label>
                            Add title
                            <input
                                type="text"
                                placeholder="Enter title of task"
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </label>
                        <fieldset>
                            <legend>Select Category</legend>
                            <select value={inputCategory} onChange={(e) => setInputCategory(e.target.value)}>
                                <option disabled  > select Category</option>
                            {["Frontend", "Backend", "DevOps"].map((cat) => 
                                <option  key={cat}value={cat}>{cat} </option>
                            )}
                            </select>
                        </fieldset>
                        <fieldset>
                            <legend>select Priority</legend>

                            {["Low", "Medium", "High"].map((p) =>
                                <label key={p}>
                                    {p}
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={p}
                                        checked={inputPriority === p}
                                        onChange={() => setInputPriority(p)}
                                    />
                                </label>
                            )}

                        </fieldset>
                    </fieldset>
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {task.map((tsk) =>
                        <li key={tsk.id}>
                            <span style={{textDecoration: tsk.isCompleted ? 'line-through' : 'none' }} >{tsk.title} {tsk.priority} {tsk.category}</span>
                            <input
                            type="checkbox"
                            checked={tsk.isCompleted}
                            onChange={() => handleIsComplete(tsk.id)}
                            />
                            <button onClick={() => handleDelete(tsk.id)}>Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default JiraBoard;