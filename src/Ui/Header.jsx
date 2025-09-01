import React, { useState } from "react";
import { Clipboard, LogOut, UserCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import {toast} from 'react-toastify'
export default function Header() {
  const {allTasks , setAllTasks ,setSearchResult ,allUnchangedTask , setUnchangedTask} = useTask();
  const navigate = useNavigate();
  const [inputValue , setInputValue] = useState("");

  const handleSearchInputChange = (e)=>{
    const value = e.target.value.toLowerCase() ;
    if(value.trim() === ""){
      setAllTasks(allUnchangedTask);
      setInputValue("")
      return
    }
    setInputValue(e.target.value)
    console.log(value)
    const tasks = [...allUnchangedTask];
    const result = tasks.filter(task => task.content.toLowerCase().includes(value ));
    console.log(tasks.length);
    console.log(result.length)
    setAllTasks(result);
  }
  const handleLogout = async() =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{
        method : "POST",
        "credentials" : "include"
      })
      const data = await res.json();
      if(!data.success){
        toast(data.msg)
      }
      navigate("/auth")
    }
    catch(err){
      toast()
    }
  }
  return (
    <header className="w-[100dvw] h-[64px] flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      
      <Link className="flex items-center gap-2" to="/">
        <Clipboard className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">TaskBuddy</h1>
      </Link>

      <div className="flex-1 mx-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearchInputChange}
          placeholder="Search tasks..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg cursor-pointer hover:bg-red-200 transition-colors duration-200" 
           onClick={handleLogout}
      >
        <LogOut className="w-6 h-6" />
        <span className="font-medium hidden sm:block">Logout</span>
      </div>

    </header>
  );
}
