import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaHeartPulse, FaArrowRight, FaShieldHeart } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

function WelcomeCard({ isDarkMode }) {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "Member";

  return (
    <section className={`relative overflow-hidden rounded-[32px] border p-6 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.65)] sm:p-8 lg:p-10 ${isDarkMode ? "border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-slate-100" : "border-white/70 bg-gradient-to-br from-slate-900 via-teal-800 to-emerald-650 text-white"}`}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ y: [0, -12, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-teal-400/20 blur-3xl" />
        <motion.div animate={{ y: [0, 16, 0], x: [0, -8, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-4 right-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur-sm">
            <FaShieldHeart />
            Today’s care plan is ready
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back, {userName} — your wellness journey starts here.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-teal-50/90 sm:text-base">
            Stay on top of appointments, e-prescriptions, and your daily health goals from one calm and intelligent dashboard.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/patient/appointments" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-teal-705 transition hover:scale-105 hover:bg-teal-50">
              Book Appointment
              <FaArrowRight />
            </Link>
            <Link to="/patient/medical-history" className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              View Reports
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">Live</p>
              <p className="text-sm text-teal-100">Visits & records</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-semibold">98%</p>
              <p className="text-sm text-teal-100">Wellness score</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/15 bg-white/15 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-200">Motivation</p>
              <h3 className="mt-2 text-xl font-bold">Small steps create lasting health.</h3>
            </div>
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="rounded-2xl bg-white/20 p-3">
              <FaHeartPulse className="text-2xl" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-950/20 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3"><FaCalendarCheck /></div>
                <div>
                  <p className="font-bold">Virtual Care</p>
                  <p className="text-sm text-teal-100">Specialists on duty 24/7</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-950/20 p-4 text-xs leading-relaxed text-teal-50/90">“Consistency beats intensity. Your care plan is designed to support you one day at a time.”</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeCard;