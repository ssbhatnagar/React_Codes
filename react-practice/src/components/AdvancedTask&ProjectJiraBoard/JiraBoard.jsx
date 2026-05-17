import { useState } from "react";

const initialTasks = [
    { id: "t1", title: "Setup Redux Toolkit", category: "Frontend", priority: "High", isCompleted: false },
    { id: "t2", title: "Design Database Schema", category: "Backend", priority: "Medium", isCompleted: true },
    { id: "t3", title: "Configure Docker Container", category: "DevOps", priority: "Low", isCompleted: false }
];

function JiraBoard() {

    const [task, setTask] = useState(initialTasks);

    const defaultTask = initialTasks[0];
    
    const[titleInput, setTitleInput] = useState(defaultTask.title);
    const[inputCategory, setInputCategory] = useState(defaultTask.category);
    const[inputPriority, setInputPriority] = useState(defaultTask.priority);


    return (
        <div>
            <h1>Jira Board</h1>
            <div>
                <h3>Add the task</h3>
                <form>
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
                </form>
                <ul>
                    {task.map((tsk) =>
                        <li key={tsk.id}>
                            <span>{tsk.title}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default JiraBoard;