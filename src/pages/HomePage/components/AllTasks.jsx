import React, { useEffect, useState } from "react";
import { useTask } from "../../../context/TaskContext";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function AllTasks() {
  const { allTasks, setAllTasks } = useTask();
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    async function getAllTask(){
      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/get_alltasks`,{
          method : "GET",
          "credentials" : "include"
        })
        const data = await res.json();
        if(!data.success){
          toast(data.msg)
          return
        }
        console.log(data)
        setAllTasks(prev => [...prev, ...data.allTasks]);
      }
      catch(err){
        toast(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    getAllTask()
  },[])

  const handleTaskDelete = (id , taskid) => {
    const tasks = allTasks.filter((_, i) => i !== id);
    setAllTasks(tasks);
    deleteTaskFromDataBase(taskid)
  };
  const deleteTaskFromDataBase = async(task_id) =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/delete_task`,{
        method : "DELETE",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({task_id}),
        "credentials" : "include"
      })
      const data = await res.json();
      if(!data.success){
        toast(data.msg)
      }
    }
    catch(err){
      toast(err.message)
    }
  }

  const toggleTaskStatus = (id , taskid ,completed) => {
    const updatedTasks = [...allTasks];
    updatedTasks[id].completed = !updatedTasks[id].completed
    setAllTasks(updatedTasks);
    taskStatusSaveToDb(taskid, completed)
  };
  const taskStatusSaveToDb = async(task_id ,completed)=>{
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task/change_completion`,{
        method : "PATCH",
        "credentials" : "include",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          task_id ,
          completed 
        })
      })
      const data = await res.json();
      if(!data.success){
        toast(data.msg)
      }
    }
    catch(err){
      toast(err.message)
    }
  }
  if(loading){
    return <div className="w-[100dvw] h-[50dvh] flex items-center justify-center ">
      Loading...
    </div>
  }
  return (
    <div className="w-[100dvw] sm:!p-4">
      {allTasks.length > 0 ? (
        <div className="">
          <h1 className="sm:hidden font-bold text-2xl">Tasks</h1>
          <table className="table-fixed w-full bg-white border border-gray-200 rounded-lg shadow-sm hidden sm:block">
            <thead className="hidden sm:block bg-blue-100 flex justify-center">
              <tr className="flex flex-row">
                <th className="w-1/12">S.No</th>
                <th className="w-6/12">Task</th>
                <th className="w-3/12">Status</th>
                <th className="w-2/12">Delete</th>
              </tr>
            </thead>

            <tbody className="flex flex-col gap-2 !pt-2 !pb-2">
              {allTasks.map((task, index) => (
                <tr
                  key={index}
                  className="grid grid-cols-[1fr_6fr_3fr_2fr]"
                >
                  <td className="flex justify-center w-full">
                    {index + 1}.
                  </td>

                  <td className=" flex justify-center w-full">
                    <span className="font-medium flex  w-full max-w-full">{task?.content}</span>
                  </td>

                  <td
                    className="flex justify-center w-full cursor-pointer "
                    onClick={() => toggleTaskStatus(index , task._id , task.completed)}
                  >
                    <span
                      className={`!p-2 rounded-full h-fit text-white text-sm ${
                        task.completed 
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task?.completed  ? "Completed" : "Pending"}
                    </span>
                  </td>

                  <td className=" flex justify-center w-full">
                    <button
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded md:w-auto h-fit"
                      onClick={() => handleTaskDelete(index , task._id)}
                    >
                      {/* <Trash className="w-4 h-4" /> Delete */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sm:hidden flex flex-col gap-3">
            {allTasks.map((task, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{index + 1}. {task?.content}</span>
                </div>
                <div className="flex justify-around items-center mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm cursor-pointer ${
                      task.completed 
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    onClick={() => toggleTaskStatus(index , task._id , task.completed)}
                  >
                    {task?.completed ? "Completed" : "Pending"}
                  </span>
                  <button
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded h-fit"
                    onClick={() => handleTaskDelete(index)}
                  >
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
