import { useState } from "react";
import {
  FaHouse,
  FaCalendarCheck,
  FaFileMedical,
  FaUserDoctor,
  FaGear,
  FaArrowRightFromBracket,
  FaXmark,
  FaShieldHeart,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ isOpen, setIsOpen, isDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getMenuItems = () => {
    const role = user?.role || "patient";
    if (role === "admin") {
      return [
        { label: "Overview", icon: <FaHouse />, to: "/admin/dashboard" },
        { label: "Doctor Registry", icon: <FaUserDoctor />, to: "/admin/doctors" },
        { label: "Patient Directory", icon: <FaUsers />, to: "/admin/patients" },
        { label: "Settings", icon: <FaGear />, to: "/admin/settings" },
      ];
    }
    if (role === "doctor") {
      return [
        { label: "Dashboard", icon: <FaHouse />, to: "/doctor/dashboard" },
        { label: "Schedule Slots", icon: <FaCalendarCheck />, to: "/doctor/appointments" },
        { label: "My Patients", icon: <FaUsers />, to: "/doctor/patients" },
        { label: "Settings", icon: <FaGear />, to: "/doctor/settings" },
      ];
    }
    return [
      { label: "Dashboard", icon: <FaHouse />, to: "/patient/dashboard" },
      { label: "Appointments", icon: <FaCalendarCheck />, to: "/patient/appointments" },
      { label: "Medical History", icon: <FaFileMedical />, to: "/patient/medical-history" },
      { label: "Specialists", icon: <FaUserDoctor />, to: "/patient/doctors" },
      { label: "Settings", icon: <FaGear />, to: "/patient/settings" },
    ];
  };

  const menuItems = getMenuItems();
  const rolePrefix = user?.role || "patient";
  const dashboardPath = `/${rolePrefix}/dashboard`;

  const isActive = (to) =>
    location.pathname === to || (to !== dashboardPath && location.pathname.startsWith(to));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "US";

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDarkMode
            ? "border-slate-800 bg-slate-950 text-slate-100"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-850">
          <Link to={dashboardPath} className="flex items-center gap-2.5">
            <FaShieldHeart className="text-2xl text-teal-600 dark:text-teal-400" />
            <div>
              <span className="text-lg font-black tracking-tight text-slate-800 dark:text-white">
                MedAssist
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-teal-600 dark:text-teal-450 mt-0.5">
                {rolePrefix} Portal
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 dark:hover:bg-slate-900 lg:hidden transition"
          >
            <FaXmark className="text-base" />
          </button>
        </div>

        {/* System Monitor Badge */}
        <div className="px-6 py-4">
          <div className="rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">System Registry</p>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">Active Security Verified</p>
            </div>
            <div className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-bold text-[10px] text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Online
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-2 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen?.(false)}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`text-base ${active ? "text-teal-600 dark:text-teal-400" : "text-slate-450 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-350"}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                <FaChevronRight
                  className={`text-[10px] transition-transform ${
                    active ? "translate-x-0 text-teal-500" : "translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Profile Card Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-850">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 dark:bg-teal-500 text-xs font-bold text-white shadow-sm flex-shrink-0">
              {userInitials}
            </div>
            <div className="truncate flex-1">
              <p className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">
                {user?.name || "Guest Account"}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 capitalize font-medium">
                {user?.role || "Visitor"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 dark:border-rose-950/30 bg-rose-50/50 dark:bg-rose-950/10 px-4 py-2.5 font-bold text-rose-600 dark:text-rose-450 hover:bg-rose-100/50 dark:hover:bg-rose-950/20 transition text-xs"
          >
            <FaArrowRightFromBracket />
            Logout
          </button>
        </div>

        {/* App Version Info */}
        <div className="px-6 py-3 text-center text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest border-t border-slate-100 dark:border-slate-850">
          MedAssist v3.0.0
        </div>
      </aside>

      {/* Logout Modal Dialog */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 backdrop-blur-xs">
          <div className="w-[92%] max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 text-slate-850 dark:text-slate-100 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Logout</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              You will be signed out from your secure session. Would you like to proceed?
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;