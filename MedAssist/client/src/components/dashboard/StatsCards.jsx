import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaUserDoctor,
  FaFileMedical,
  FaNotesMedical,
  FaClipboardList,
  FaHeartPulse,
} from "react-icons/fa6";

function AnimatedNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 16;
    const totalSteps = Math.ceil(duration / stepTime);

    if (value === 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += 1;
      setCount(Math.round((value / totalSteps) * start));
      if (start >= totalSteps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

function StatsCards({ appointments = [], records = [], doctors = [], isDarkMode }) {
  const appointmentsCount = appointments.length;
  const doctorsCount = doctors.length;
  const recordsCount = records.length;
  
  // Filter records that look like prescriptions
  const prescriptionsCount = records.filter(
    (r) => 
      r.fileName.toLowerCase().includes("presc") || 
      (r.description && r.description.toLowerCase().includes("presc"))
  ).length;

  const stats = [
    { 
      title: "Appointments", 
      value: appointmentsCount, 
      icon: <FaCalendarCheck className="text-xl text-teal-600 dark:text-teal-400" />, 
      bg: "from-teal-500/20 to-teal-400/20 dark:from-teal-500/10 dark:to-teal-400/10", 
      trend: `${appointmentsCount} Booked`, 
      suffix: "" 
    },
    { 
      title: "Active Specialists", 
      value: doctorsCount, 
      icon: <FaUserDoctor className="text-xl text-emerald-600 dark:text-emerald-400" />, 
      bg: "from-emerald-500/20 to-emerald-400/20 dark:from-emerald-500/10 dark:to-emerald-400/10", 
      trend: "Verified", 
      suffix: "" 
    },
    { 
      title: "Medical Records", 
      value: recordsCount, 
      icon: <FaFileMedical className="text-xl text-cyan-600 dark:text-cyan-400" />, 
      bg: "from-cyan-500/20 to-cyan-400/20 dark:from-cyan-500/10 dark:to-cyan-400/10", 
      trend: "Secure EMR", 
      suffix: "" 
    },
    { 
      title: "Prescriptions", 
      value: prescriptionsCount, 
      icon: <FaNotesMedical className="text-xl text-teal-700 dark:text-teal-400" />, 
      bg: "from-teal-700/20 to-teal-600/20 dark:from-teal-700/10 dark:to-teal-600/10", 
      trend: "Digital Logs", 
      suffix: "" 
    },
    { 
      title: "Clinical Files", 
      value: recordsCount + appointmentsCount, 
      icon: <FaClipboardList className="text-xl text-emerald-600 dark:text-emerald-450" />, 
      bg: "from-emerald-650/20 to-emerald-500/20 dark:from-emerald-650/10 dark:to-emerald-500/10", 
      trend: "Synchronized", 
      suffix: "" 
    },
    { 
      title: "Health Index Score", 
      value: appointmentsCount > 0 ? 94 : 88, 
      icon: <FaHeartPulse className="text-xl text-cyan-655 dark:text-cyan-400" />, 
      bg: "from-cyan-650/20 to-cyan-500/20 dark:from-cyan-650/10 dark:to-cyan-500/10", 
      trend: "Optimal", 
      suffix: "%" 
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 mt-6">
      {stats.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          whileHover={{ y: -3 }}
          className={`rounded-2xl border p-4.5 transition-shadow ${
            isDarkMode 
              ? "border-slate-850 bg-slate-900/60 hover:shadow-lg hover:shadow-teal-500/2" 
              : "border-slate-200/80 bg-white hover:shadow-md hover:shadow-slate-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-slate-450" : "text-slate-400"}`}>
                {item.title}
              </p>
              <h3 className={`mt-2 text-2xl font-extrabold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </h3>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.bg}`}>
              {item.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-850/60 pt-2.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-teal-400" : "text-teal-650"}`}>
              {item.trend}
            </span>
            <span className={`text-[10px] font-medium ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
              Live Stats
            </span>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default StatsCards;