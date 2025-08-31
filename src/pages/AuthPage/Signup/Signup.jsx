import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoginPageInWidow } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast(data.msg);
        return;
      }
      toast(data.msg);
      setIsLoginPageInWidow(true);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] w-[100dvw] bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white  shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-xl  font-bold text-center text-purple-600 ">
          Create an Account on TaskBuddy
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            required
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition text-sm sm:text-base"
        >
          Sign Up
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setIsLoginPageInWidow(true)}
            className="text-purple-600 hover:underline inline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
