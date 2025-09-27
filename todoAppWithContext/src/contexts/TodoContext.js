import { useContext, createContext } from "react";

export const TodoContext = createContext({

    todos:[
        { 
        id: Date.now(),
        todo: "Hi",
        completed: false
    }
],

    addTodo: (todo) => {},
    updateTodo: (todo, id) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}


})
/**
 * 
 * we createted a context named as TodoContext using inbuilt function provided by context api
 * called as createContext.
 *  
 * Now we need to create our own custom hook out of that context and we want to utilize that custom hook,
 * to make it usable we need to pass our TodoContext inside useContext (an ibuilt hook) and then we exported it
 * below 
 *  
 */
export const useTodo = () => {
    return useContext(TodoContext)
} 

// we dont want to wrap the components using TodoContext.Provider so we just used its value to export
export const TodoProvider = TodoContext.Provider;

 