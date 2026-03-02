import React, { useState, useEffect } from 'react'
import styles from './TodoApp.module.css';

const Todos = [
    {
        id: 1,
        todoText: "learn JS",
        isCompleted: false
    },
    {
            id: 2,
        todoText: "learn React",
        isCompleted: true
    },
    {
            id: 3,
        todoText: "learn python",
        isCompleted: true,
    },
    {
            id: 4,
        todoText: "cricket",
        isCompleted: true
    },
    {
            id: 5,
        todoText: "learn AWS",
        isCompleted: false
    }
]

function TodoApp() {
    
    return(
        <div className={styles.parentContainer}>
            <div className={styles.appWrapper}>
                Hi
            </div>
        </div>
    )

}

export default TodoApp;