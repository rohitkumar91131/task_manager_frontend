import React, { useState } from "react";
import { useTask } from "../../../context/TaskContext";

export default function CreateATask({ addTask }) {
    const {allTasks , setAllTasks} = useTask();
    const [taskName , setTaskName] = useState("");
  const handleAddTask = () => {
    if (!taskName) return;
    setAllTasks(prev => ([...prev  , { name : taskName }]));   
  };

  return (
    <div className="w-[100dvw] grid grid-cols-[8fr_2fr] !p-5 gap-2">
      <input
        type="text"
        placeholder="Enter task"
        value={taskName}
        autoFocus
        onChange={(e) => setTaskName(e.target.value)}
        className=" border border-gray-300 rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>
  );
}
