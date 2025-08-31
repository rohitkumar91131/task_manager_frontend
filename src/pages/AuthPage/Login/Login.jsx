import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
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
    try {
      e.preventDefault();
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // ✅ correct place
        }
      );
      let data = await res.json();
      if (!data.success) {
        toast(data.msg);
        return;
      }
      toast(data.msg);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] w-[100dvw] bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Login to TaskBuddy📝
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            required
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              placeholder="Enter your password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
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
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
        >
          Login
        </button>

        <span className="block text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <p
            onClick={() => setIsLoginPageInWidow(false)}
            className="text-purple-600 hover:underline inline cursor-pointer"
          >
            Sign up
          </p>
        </span>

        {/* ⚠️ Important Message */}
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 p-3 rounded-xl text-sm sm:text-base">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="leading-snug">
            Please enable <b>third-party cookies</b> in your browser to use our
            app properly.
          </span>
        </div>
      </form>
    </div>
  );
}
