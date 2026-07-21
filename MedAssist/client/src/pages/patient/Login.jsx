import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa6";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    toast.error("Please fill all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email.");
    return;
  }

  try {

    setLoading(true);

    const data = await loginUser({
      email,
      password,
    });

    login(data.user, data.token);

    toast.success(data.message);

    setFormData({
      email: "",
      password: "",
      remember: false,
    });

    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (data.user.role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <AuthLayout
      title="Access Portal"
      subtitle="Log in to your MedAssist account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}

        <div className="relative">

          <FaEnvelope className="absolute left-4 top-4.5 text-slate-400 dark:text-slate-500" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
          />

        </div>

        {/* Password */}

        <div className="relative">

          <FaLock className="absolute left-4 top-4.5 text-slate-400 dark:text-slate-500" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-teal-600 transition"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Remember Me */}

        <div className="flex justify-between items-center text-sm">

          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">

            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="accent-teal-600 rounded"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          Login
        </Button>

        {/* Register */}

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;