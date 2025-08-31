import React from "react";
import { Clipboard, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <Link className="flex items-center " to="/">
        <Clipboard className="w-8 h-8 text-blue-500 " />
        <h1 className="smLtext-2xl font-bold text-gray-800">TaskBuddy</h1>
      </Link>

      <div className="flex items-center gap-4">
        <UserCircle2 className="w-7 h-7 text-gray-700" />
        <Link to="/auth" className="!p-1 border border-gray-700 rounded hover:bg-gray-200 transition">
          Login/Signup
        </Link>
      </div>
    </header>
  );
}
