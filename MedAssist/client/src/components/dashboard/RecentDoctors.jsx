import { FaUserDoctor, FaStar, FaBan } from "react-icons/fa6";

function RecentDoctors({ doctors = [], isDarkMode }) {
  // Show top 3 available specialists
  const displayDoctors = doctors.slice(0, 3);

  return (
    <section className={`rounded-2xl border p-5 transition-shadow ${
      isDarkMode 
        ? "border-slate-850 bg-slate-900/60" 
        : "border-slate-200/80 bg-white"
    }`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-450" : "text-slate-400"}`}>
            Care Team
          </p>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-white mt-0.5">
            Active Specialists
          </h3>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          isDarkMode 
            ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
            : "bg-teal-50 text-teal-700 border border-teal-200"
        }`}>
          {doctors.length} Online
        </span>
      </div>

      <div className="space-y-3">
        {displayDoctors.length === 0 ? (
          <div className="py-6 text-center border border-dashed border-slate-200 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 text-xs text-slate-500 dark:text-slate-400">
            <FaBan className="text-xl text-slate-400 mx-auto mb-2" />
            No specialized consultants available yet.
          </div>
        ) : (
          displayDoctors.map((doc) => (
            <div 
              key={doc._id} 
              className={`flex items-center justify-between rounded-xl border p-3.5 transition-colors ${
                isDarkMode 
                  ? "border-slate-800 bg-slate-950/40" 
                  : "border-slate-100 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-555 to-emerald-600 text-white shadow-sm flex-shrink-0">
                  <FaUserDoctor className="text-lg" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-xs">{doc.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{doc.specialization || "General Medicine"}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 justify-end">
                  <FaStar className="text-[10px]" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
                <p className="mt-1 text-[10px] text-slate-450 dark:text-slate-500 font-medium">Available</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentDoctors;
