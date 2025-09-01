import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="max-w-4xl w-full text-center bg-white rounded-3xl shadow-2xl p-8 md:p-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Welcome to TaskBuddy
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10">
          TaskBuddy is your all-in-one task manager. Organize, track, and complete your tasks with ease. Stay productive, stay on top of your goals, and never miss a task again.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-transform transform hover:scale-105"
          >
            Sign In / Login
          </Link>
          <Link
            to="/tasks"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-transform transform hover:scale-105"
          >
            See Your Tasks
          </Link>
        </div>
      </div>
      <p className="mt-8 text-white text-sm md:text-base text-center max-w-md">
        Manage your tasks anytime, anywhere. TaskBuddy keeps your life organized and your goals in sight.
      </p>
    </div>
  );
}
