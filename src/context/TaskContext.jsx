import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const TaskContext = createContext();
export const TaskProvider = ({children}) =>{
    const [allTasks , setAllTasks] = useState([]);
    const [reloadAllTask , setReloadAllTask] = useState(false);
    const [ allUnchangedTask , setUnchangedTask] = useState([]);
    return <TaskContext.Provider value={{allTasks , setAllTasks ,reloadAllTask , setReloadAllTask , allUnchangedTask , setUnchangedTask}}>
        {children}
    </TaskContext.Provider>
}

export const useTask = () => useContext(TaskContext);