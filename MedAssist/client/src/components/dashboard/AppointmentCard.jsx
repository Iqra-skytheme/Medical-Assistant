import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCalendarDays,
  FaClock,
  FaCircleCheck,
  FaHourglassHalf,
  FaVideo,
  FaArrowRight,
  FaBan
} from "react-icons/fa6";

function AppointmentCard({ appointments = [], isDarkMode }) {
  // Filter out cancelled appointments and sort by date/time
  const activeAppointments = appointments
    .filter((appt) => appt.status !== "cancelled")
    .slice(0, 3); // show top 3 upcoming

  const getInitials = (name) => {
    if (!name) return "DR";
    return name
      .replace(/^dr\.\s+/i, "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section className={`rounded-2xl border p-5 transition-shadow ${
      isDarkMode 
        ? "border-slate-850 bg-slate-900/60" 
        : "border-slate-200/80 bg-white"
    }`}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-450" : "text-slate-400"}`}>
            Care schedule
          </p>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">
            Upcoming Consultations
          </h2>
        </div>
        <Link 
          to="/patient/appointments" 
          className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3.5">
        {activeAppointments.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
            <FaBan className="text-2xl text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              No upcoming appointments booked.
            </p>
            <Link 
              to="/patient/appointments" 
              className="mt-3 inline-block rounded-lg bg-teal-600 hover:bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white transition shadow-sm"
            >
              Book a Slot
            </Link>
          </div>
        ) : (
          activeAppointments.map((appt, index) => {
            const docName = appt.doctor?.name || "Medical Specialist";
            const initials = getInitials(docName);
            
            return (
              <motion.div
                key={appt._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border p-4 transition-colors ${
                  isDarkMode 
                    ? "border-slate-800 bg-slate-950/50" 
                    : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-xs font-bold text-white shadow-sm flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">{docName}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {appt.reason || "General Consultation"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium border ${
                      isDarkMode ? "border-slate-800 bg-slate-900 text-slate-300" : "border-slate-200 bg-white text-slate-600"
                    }`}>
                      <FaCalendarDays className="text-teal-600 dark:text-teal-400" />
                      <span>{formatDate(appt.date)}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-medium border ${
                      isDarkMode ? "border-slate-800 bg-slate-900 text-slate-300" : "border-slate-200 bg-white text-slate-600"
                    }`}>
                      <FaClock className="text-emerald-600 dark:text-emerald-400" />
                      <span className="font-mono">{appt.timeSlot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {appt.status === "done" ? (
                      <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-500/10">
                        <FaCircleCheck />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-500/10">
                        <FaHourglassHalf />
                        {appt.status}
                      </span>
                    )}

                    {appt.status !== "done" && (
                      <button className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                        <FaVideo className="text-teal-500" />
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-slate-100 dark:border-slate-850/60 pt-3">
        <Link 
          to="/patient/appointments" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
        >
          Manage consultations <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default AppointmentCard;