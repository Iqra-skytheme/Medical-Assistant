import { useState } from "react";
import { toast } from "react-toastify";
import { FaGear, FaShieldHeart, FaLock } from "react-icons/fa6";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { updateAccount } from "../../services/adminService";

function AdminSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await updateAccount(user.id || user._id, {
        name: form.name,
        email: form.email,
        password: form.newPassword || undefined,
      });
      toast.success("Settings updated successfully.");
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save settings.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <Topbar setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Page Headers */}
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure administrator login details and profile verification protocols.</p>
          </div>

          <div className="mt-8 max-w-xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 dark:text-teal-400 text-xl font-bold uppercase">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{user?.name || "System Administrator"}</h3>
                  <p className="text-xs text-slate-500 capitalize">{user?.role || "Admin"}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Admin Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Login Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                  />
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">New Password (Optional)</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Leave blank to keep current password"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat new password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button type="submit" variant="primary" loading={submitting}>
                    Save Settings
                  </Button>
                </div>

              </form>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
