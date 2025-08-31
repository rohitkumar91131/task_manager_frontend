import React from "react";
import { useTask } from "../../context/TaskContext";

export default function Profile() {
  const { allTasks } = useTask();

  const completedTasks = allTasks.filter((task) => task.status === "Completed");

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> Rohit Kumar</p>
          <p><span className="font-semibold">Username:</span> rohitkumar91131</p>
          <p>
            <span className="font-semibold">About:</span> I’m a full-stack
            developer passionate about learning and building real projects.
          </p>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {completedTasks.map((task, index) => (
              <li key={index} className="text-green-600">
                {task.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
}
