import { FaHeartPulse } from "react-icons/fa6";

function Loader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 flex flex-col items-center justify-center z-[9999] transition-colors duration-300">
      <div className="animate-pulse">
        <FaHeartPulse className="text-7xl text-teal-600 dark:text-teal-400" />
      </div>

      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-teal-600 dark:text-teal-400">
        MedAssist
      </h2>

      <p className="mt-2 text-slate-600 dark:text-slate-450 text-base font-medium">
        Loading Healthcare...
      </p>

      {/* Loading Dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 bg-teal-600 dark:bg-teal-400 rounded-full animate-bounce"></span>
        <span
          className="w-3 h-3 bg-teal-600 dark:bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="w-3 h-3 bg-teal-600 dark:bg-teal-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
}

export default Loader;