import React, { useEffect, useState } from "react";
import { useTask } from "../../../context/TaskContext";
import { Trash, Pencil, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function AllTasks() {
  const { allTasks, setAllTasks ,setUnchangedTask ,reloadAllTask , setReloadAllTask } = useTask();
  const [loading , setLoading] = useState(true);
  const [fetching , setFetching] = useState(false);
  const [editingTaskId , setEditingTaskId] = useState(null);
  const [editedContent , setEditedContent] = useState("");

  useEffect(()=>{
    async function getAllTask(){
      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/get_alltasks`,{
          method : "GET",
          credentials : "include"
        });
        const data = await res.json();
        if(!data.success){
          toast(data.msg);
          return;
        }
        setAllTasks(prev => [...prev, ...data.allTasks]);
        setUnchangedTask(prev => [...prev, ...data.allTasks]);
      } catch(err){
        toast(err.message);
      } finally{
        setLoading(false);
        setFetching(false);
      }
    }
    getAllTask();
    return ()=>{
      setAllTasks([]);
      setFetching(true);
      setUnchangedTask([]);
    };
  },[reloadAllTask]);

  const handleTaskDelete = (id , taskid) => {
    if(!(id+1) || !taskid) return;
    const tasks = allTasks.filter((_, i) => i !== id);
    setAllTasks(tasks);
    setUnchangedTask(tasks);
    deleteTaskFromDataBase(taskid);
  };

  const deleteTaskFromDataBase = async(task_id) =>{
    if(!task_id) return;
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/delete_task`,{
        method : "DELETE",
        headers : { "content-type" : "application/json" },
        body : JSON.stringify({task_id}),
        credentials : "include"
      });
      const data = await res.json();
      if(!data.success) toast(data.msg);
    } catch(err){
      toast(err.message);
    }
  }

  const toggleTaskStatus = (id , taskid ,completed) => {
    if(!(id+1) || !taskid ) return;
    const updatedTasks = [...allTasks];
    updatedTasks[id].completed = !updatedTasks[id].completed;
    setAllTasks(updatedTasks);
    setUnchangedTask(updatedTasks);
    taskStatusSaveToDb(taskid, completed);
  };

  const taskStatusSaveToDb = async(task_id ,completed)=>{
    if(!task_id) return;
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/change_completion`,{
        method : "PATCH",
        headers : { "content-type" : "application/json" },
        credentials: "include",
        body : JSON.stringify({ task_id , completed })
      });
      const data = await res.json();
      if(!data.success) toast(data.msg);
    } catch(err){
      toast(err.message);
    }
  }

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedContent(task.content);
  }

  const saveEditedTask = async (taskId, index) => {
    if(!editedContent.trim()) {
      toast("Task cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/edit_task`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task_id: taskId, content: editedContent })
      });
      const data = await res.json();
      if(!data.success){
        toast(data.msg);
        return;
      }
      const updatedTasks = [...allTasks];
      updatedTasks[index].content = editedContent;
      setAllTasks(updatedTasks);
      setUnchangedTask(updatedTasks);
      setEditingTaskId(null);
      toast("Task updated successfully");
    } catch(err){
      toast(err.message);
    }
  }

  if(loading) return <div className="w-[100dvw] h-[50dvh] flex items-center justify-center">Loading...</div>;
  if(fetching) return <div className="w-[100dvw] h-[50dvh] flex items-center justify-center">Saving...</div>;

  return (
    <div className="w-[100dvw] sm:!p-4">
      {allTasks.length > 0 ? (
        <div>
          <h1 className="sm:hidden font-bold text-2xl">Tasks</h1>

          <div className="hidden sm:flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex bg-blue-100 justify-center font-bold py-2 rounded-t-lg">
              <div className="w-1/12 text-center">S.No</div>
              <div className="w-6/12 text-center">Task</div>
              <div className="w-3/12 text-center">Status</div>
              <div className="w-2/12 text-center">Delete</div>
            </div>

            {allTasks.map((task, index) => (
              <div key={index} className="grid grid-cols-[1fr_6fr_3fr_2fr] border-t border-gray-200 items-center">
                <div className="w-full text-center py-2">{index + 1}.</div>

                <div className="w-full flex items-center justify-center gap-2">
                  {editingTaskId === task._id ? (
                    <>
                      <input
                        className="border p-1 rounded w-full"
                        value={editedContent}
                        onChange={(e)=>setEditedContent(e.target.value)}
                      />
                      <button onClick={()=>saveEditedTask(task._id, index)}>
                        <Check color="green" size={20}/>
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="w-full break-words text-center">{task.content}</span>
                      <Pencil color="red" size={22} strokeWidth={2} onClick={()=>handleEditClick(task)} className="cursor-pointer"/>
                    </>
                  )}
                </div>

                <div
                  className="flex justify-center w-full cursor-pointer"
                  onClick={() => toggleTaskStatus(index , task._id , task.completed)}
                >
                  <span className={`!p-2 rounded-full h-fit text-white text-sm ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}>
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className="flex justify-center w-full">
                  <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded md:w-auto h-fit" onClick={() => handleTaskDelete(index , task._id)}>
                    <Trash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sm:hidden flex flex-col gap-3">
            {allTasks.map((task, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col gap-2">
                {editingTaskId === task._id ? (
                  <div className="flex gap-2">
                    <input
                      className="border p-1 rounded w-full"
                      value={editedContent}
                      onChange={(e)=>setEditedContent(e.target.value)}
                    />
                    <button onClick={()=>saveEditedTask(task._id, index)}>
                      <Check color="green" size={20}/>
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{index + 1}. {task.content}</span>
                    <Pencil color="red" size={22} strokeWidth={2} onClick={()=>handleEditClick(task)} className="cursor-pointer"/>
                  </div>
                )}
                <div className="flex justify-around items-center mt-1">
                  <span className={`px-2 py-1 rounded-full text-white text-sm cursor-pointer ${task.completed ? "bg-green-500" : "bg-yellow-500"}`} onClick={()=>toggleTaskStatus(index, task._id, task.completed)}>
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                  <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded h-fit" onClick={()=>handleTaskDelete(index, task._id)}>
                    <Trash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">No Task found</div>
      )}
    </div>
  );
}
