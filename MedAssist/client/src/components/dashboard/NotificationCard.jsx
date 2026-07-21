import { FaBell, FaCalendarCheck, FaCapsules, FaFileMedical, FaCircleInfo } from "react-icons/fa6";

function NotificationCard({ isDarkMode }) {
  const notifications = [
    {
      id: 1,
      title: "Appointment reminder",
      message: "Your cardiology checkup is tomorrow at 10:00 AM.",
      icon: <FaCalendarCheck className="text-blue-600 text-xl" />,
      bg: "bg-blue-50 text-blue-700",
      border: "border-blue-200",
      time: "2h ago",
      priority: "High",
    },
    {
      id: 2,
      title: "Medicine reminder",
      message: "It is time to take your blood pressure medicine.",
      icon: <FaCapsules className="text-emerald-600 text-xl" />,
      bg: "bg-emerald-50 text-emerald-700",
      border: "border-emerald-200",
      time: "5h ago",
      priority: "Normal",
    },
    {
      id: 3,
      title: "Lab report ready",
      message: "Your latest blood work report is now available.",
      icon: <FaFileMedical className="text-rose-500 text-xl" />,
      bg: "bg-rose-50 text-rose-700",
      border: "border-rose-200",
      time: "Yesterday",
      priority: "Urgent",
    },
    {
      id: 4,
      title: "Profile update",
      message: "Your emergency contact details were saved successfully.",
      icon: <FaCircleInfo className="text-violet-600 text-xl" />,
      bg: "bg-violet-50 text-violet-700",
      border: "border-violet-200",
      time: "2d ago",
      priority: "Low",
    },
  ];

  return (
    <section className={`rounded-[28px] border p-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl ${isDarkMode ? "border-slate-800 bg-slate-900/80" : "border-white/70 bg-white/80"}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-3 text-white">
            <FaBell className="text-xl" />
          </div>
          <div>
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Updates</p>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Notifications</h2>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>4 new</span>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {notifications.map((item) => (
          <div key={item.id} className={`rounded-[22px] border p-4 ${isDarkMode ? "border-slate-800 bg-slate-800/70" : `bg-slate-50/80 ${item.border}`}`}>
            <div className="flex items-start justify-between gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{item.title}</h3>
                  <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>{item.time}</span>
                </div>
                <p className={`mt-2 text-sm leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{item.message}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.bg}`}>{item.priority}</span>
              <button className="text-sm font-semibold text-cyan-600 transition hover:text-cyan-700">Open</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotificationCard;