import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const TaskContext = createContext();
export const TaskProvider = ({children}) =>{
    const [allTasks , setAllTasks] = useState([]);

    return <TaskContext.Provider value={{allTasks , setAllTasks}}>
        {children}
    </TaskContext.Provider>
}

export const useTask = () => useContext(TaskContext);