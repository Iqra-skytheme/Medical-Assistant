import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBell, FaUser } from "react-icons/fa";
import {
  FaCalendarDays,
  FaBars,
  FaMagnifyingGlass,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaCheckDouble,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { getNotifications, markNotificationsRead } from "../../services/patientService";

function Topbar({ setIsOpen, isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [now, setNow] = useState(new Date());
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Time ticks
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Fetch alerts if patient
  const fetchAlerts = async () => {
    if (user?.role === "patient") {
      try {
        const res = await getNotifications();
        const list = res.notifications || res || [];
        setNotifications(list);
        setUnreadCount(list.filter((n) => !n.isRead).length);
      } catch (err) {
        console.error("Notifications fetch failed", err);
      }
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Poll notifications every 30 seconds
    const poll = setInterval(fetchAlerts, 30000);
    return () => clearInterval(poll);
  }, [user]);

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsRead();
      toast.success("All alerts marked as read.");
      fetchAlerts();
    } catch (err) {
      toast.error("Failed to mark notifications.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const rolePrefix = user?.role || "patient";

  const shellClasses = isDarkMode
    ? "border-slate-800/80 bg-slate-900/80 text-slate-100 shadow-[0_20px_60px_-25px_rgba(2,6,23,0.65)]"
    : "border-white/70 bg-white/80 text-slate-800 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]";

  const controlClasses = isDarkMode
    ? "border-slate-700/80 bg-slate-800/80 text-slate-200 hover:bg-slate-700/80"
    : "border-slate-200 bg-slate-50 text-slate-650 hover:bg-slate-100";

  const dropdownClasses = isDarkMode
    ? "border-slate-700/80 bg-slate-905 text-slate-100 shadow-2xl shadow-slate-950/60"
    : "border-slate-200 bg-white text-slate-700 shadow-xl";

  return (
    <header className={`relative z-40 rounded-[28px] border px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 ${shellClasses}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Welcome */}
        <div className="flex items-center gap-3 justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(true)} className={`rounded-2xl border p-3 transition lg:hidden ${controlClasses}`}>
              <FaBars className="text-lg" />
            </button>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Hello, {user?.name ? user.name.split(" ")[0] : "Member"} 👋
              </h2>
              <div className={`mt-1 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold ${isDarkMode ? "text-slate-455" : "text-slate-500"}`}>
                <FaCalendarDays className="text-teal-600" />
                <span>{today}</span>
                <span className={isDarkMode ? "text-slate-600" : "text-slate-300"}>•</span>
                <span className={`font-bold ${isDarkMode ? "text-teal-400" : "text-teal-605"}`}>{time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full lg:w-auto">
          
          <label className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs w-full sm:w-auto ${isDarkMode ? "border-slate-700 bg-slate-800/80 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
            <FaMagnifyingGlass className={isDarkMode ? "text-slate-550" : "text-slate-400"} />
            <input className="w-full bg-transparent outline-none sm:w-44 placeholder-slate-400" placeholder="Search parameters..." />
          </label>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            
            <div className="flex items-center gap-2">
              {/* Notifications Alert Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications((prev) => !prev)} 
                  className={`relative rounded-2xl border p-3 transition ${controlClasses}`}
                >
                  <FaBell className="text-base" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-650 text-[9px] font-bold text-white shadow-md animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 z-[70] mt-3 w-80 rounded-2xl border p-4 ${dropdownClasses}`}>
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Notification Alerts</p>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[10px] text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
                        >
                          <FaCheckDouble />
                          Mark Read
                        </button>
                      )}
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-450 dark:text-slate-500 text-center py-4">No recent notification logs.</p>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n._id} 
                            className={`rounded-xl p-3 border text-xs transition duration-150 ${
                              n.isRead 
                                ? "bg-slate-50 dark:bg-slate-955 border-slate-100 dark:border-slate-900 text-slate-450 dark:text-slate-500" 
                                : "bg-teal-50/50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900 text-slate-850 dark:text-slate-205"
                            }`}
                          >
                            <p className="font-bold">{n.title}</p>
                            <p className="mt-1 leading-5">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button onClick={() => setIsDarkMode((prev) => !prev)} className={`rounded-2xl border p-3 transition ${controlClasses}`}>
                {isDarkMode ? <FaSun className="text-base text-teal-400" /> : <FaMoon className="text-base text-slate-600" />}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfile((prev) => !prev)} 
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition ${controlClasses}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm flex-shrink-0">
                  <FaUser className="text-xs" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold truncate max-w-[80px]">
                    {user?.name ? user.name.split(" ")[0] : "Member"}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize font-medium">{rolePrefix}</p>
                </div>
                <FaChevronDown className="text-[10px] text-slate-450" />
              </button>
              
              {showProfile && (
                <div className={`absolute right-0 z-[70] mt-3 w-48 rounded-2xl border p-3.5 ${dropdownClasses}`}>
                  <Link 
                    to={`/${rolePrefix}/settings`} 
                    onClick={() => setShowProfile(false)}
                    className="block rounded-xl px-3 py-2.5 text-xs font-bold text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                  >
                    View Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-955 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;