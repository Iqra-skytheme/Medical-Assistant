import { motion } from "framer-motion";
import { FaUserDoctor, FaShieldHeart, FaHeartPulse } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Brand presentation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 hidden lg:block text-slate-800 dark:text-slate-100"
        >
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="MedAssist Logo" className="h-12 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="flex items-center gap-2">
              <FaHeartPulse className="text-3xl text-teal-600" />
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                MedAssist
              </span>
            </div>
          </Link>

          <h1 className="text-5xl font-black leading-tight text-slate-900 dark:text-white">
            Smart Healthcare <br />
            <span className="text-teal-600 dark:text-teal-400">
              Coordinated & Secure.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            A comprehensive, patient-centered digital health ecosystem connecting patients, doctors, and system administrators seamlessly.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center shadow-sm">
                <FaUserDoctor className="text-teal-600 dark:text-teal-400 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">
                  Verified Specialists
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Connect with licensed professionals matching your health concerns.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center shadow-sm">
                <FaShieldHeart className="text-teal-600 dark:text-teal-400 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">
                  Secure Medical Records
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Easily upload and manage encrypted health histories and documents.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <div className="w-full max-w-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 transition-colors duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <FaHeartPulse className="text-3xl text-teal-600" />
                <span className="text-2xl font-bold text-slate-900 dark:text-white">MedAssist</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                {subtitle}
              </p>
            </div>
            
            <div>
              {children}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default AuthLayout;