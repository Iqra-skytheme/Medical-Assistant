import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa6";

import AuthLayout from "../../layouts/AuthLayout";
import { registerUser } from "../../services/authService";
import Button from "../../components/ui/Button";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6)
      return {
        text: "Weak",
        color: "text-red-500 dark:text-red-400",
      };

    if (password.length < 10)
      return {
        text: "Medium",
        color: "text-amber-600 dark:text-amber-400",
      };

    return {
      text: "Strong",
      color: "text-emerald-600 dark:text-emerald-400",
    };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
        role,
      });

      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
      });

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join MedAssist and experience smart healthcare."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-4 top-4.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
          />
        </div>

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

        {/* Role Selector */}
        <div className="relative">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition cursor-pointer"
          >
            <option value="patient">Register as Patient</option>
            <option value="doctor">Register as Doctor / Specialist</option>
          </select>
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

        {/* Password Strength */}
        {formData.password && (
          <p className={`text-sm font-medium ${strength.color}`}>
            Password Strength: {strength.text}
          </p>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <FaLock className="absolute left-4 top-4.5 text-slate-400 dark:text-slate-500" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-4 text-slate-400 dark:text-slate-500 hover:text-teal-600 transition"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Register Button */}
        <Button type="submit" variant="primary" loading={loading}>
          Create Account
        </Button>

        {/* Login redirect */}
        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;