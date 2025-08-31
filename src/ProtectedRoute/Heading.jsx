import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Heading() {
  const [name, setName] = useState("Bro");

  useEffect(() => {
    async function getUserName() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/get_Name`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          toast(data.msg);
          return;
        }
        setName(data.name);
      } catch (err) {
        toast(err.message);
      }
    }

    getUserName();
  }, []);

  return (
    <div className="!p-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-700">
        Hey {name}, create a task very easily on TestBuddy!
      </h2>
      <p className="text-gray-600 mt-2 text-lg sm:text-xl">
        Add your tasks and manage your daily workflow smoothly.
      </p>
    </div>
  );
}
