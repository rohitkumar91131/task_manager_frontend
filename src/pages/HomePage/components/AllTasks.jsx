import React from "react";
import { useTask } from "../../../context/TaskContext";
import { Hourglass, CheckSquare, Trash } from "lucide-react";

export default function AllTasks() {
  const { allTasks, setAllTasks } = useTask();

  const handleTaskDelete = (id) => {
    const tasks = allTasks.filter((_, i) => i !== id);
    setAllTasks(tasks);
  };

  const handleTaskComplete = (id) => {
    const updatedTasks = [...allTasks];
    updatedTasks[id].status = "Completed";
    setAllTasks(updatedTasks);
  };

  return (
    <div className="w-[100dvw] p-4">
      {allTasks.length > 0 ? (
        <div className="">
          <h1 className="sm:hidden font-bold text-2xl">Tasks</h1>
          <table className="table-fixed w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="hidden sm:block  bg-blue-100 ">
              <tr className="flex flex-row ">
                <th className="w-full flex items-center ">Task</th>
                <th className="w-full flex items-center  ">Status</th>
                <th className="w-full flex items-center ">Done</th>
                <th className="w-full flex items-center ">Delete</th>
              </tr>
            </thead>

            <tbody className="">
              {allTasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition flex flex-col sm:flex-row sm-2 sm:mb-0 p-2 sm:p-0 rounded sm:rounded-none"
                >
                  <td className="w-full px-2 py-1 md:px-4 md:py-2 flex items-center gap-2">
                    <Hourglass className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{task?.name}</span>
                  </td>

                  <td className="w-full px-2 py-1 md:px-4 md:py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        task?.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task?.status || "Pending"}
                    </span>
                  </td>

                  <td className="w-full  px-2 py-1 md:px-4 md:py-2">
                    <button
                      className={`flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded w-full md:w-auto justify-center ${task.status === "Completed" ? "opacity-100" : "opacity-60"}`}
                      onClick={() => handleTaskComplete(index)}
                    >
                      <CheckSquare className="w-4 h-4" /> Done
                    </button>
                  </td>

                  <td className="w-full px-2 py-1 md:px-4 md:py-2">
                    <button
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto justify-center"
                      onClick={() => handleTaskDelete(index)}
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">No Task found</div>
      )}
    </div>
  );
}
