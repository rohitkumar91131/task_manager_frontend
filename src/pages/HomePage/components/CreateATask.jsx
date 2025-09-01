import React, { useState } from "react";
import { useTask } from "../../../context/TaskContext";
import {toast} from 'react-toastify'
export default function CreateATask({ addTask }) {
    const {allTasks , setAllTasks ,reloadAllTask , setReloadAllTask} = useTask();
    const [taskName , setTaskName] = useState("");
  const handleAddTask = () => {
    if (!taskName || taskName.trim() === "") return;
    setAllTasks(prev => ([...prev  , { content : taskName }]));   
  };

  const handleFormSubmit = async(e) =>{
    e.preventDefault();
    if(taskName.trim() === "") return;
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/new_task`,{
        method : "POST",
        headers : {
          'content-type' : "application/json"
        },
        body : JSON.stringify({content : taskName}),
        "credentials" : "include"
      })  
      const data = await res.json();
      if(!data.success){
        toast(data.msg);
      }
    }
    catch(err){
      toast(err.message)
    }
    finally{
      setTaskName("");
      setReloadAllTask(!reloadAllTask);
    }
  }

  return (
    <form  className="w-[100dvw] grid grid-cols-[8fr_2fr] !p-5 gap-2" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={taskName}
        autoFocus
        required
        onChange={(e) => setTaskName(e.target.value)}
        className=" border border-gray-300 rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </form>
  );
}
