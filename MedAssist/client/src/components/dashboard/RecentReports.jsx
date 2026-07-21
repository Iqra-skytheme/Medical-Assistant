import { FaEye, FaFileMedical, FaBan, FaArrowDown } from "react-icons/fa6";

function RecentReports({ records = [], isDarkMode }) {
  // Show top 3 recent records
  const displayRecords = records.slice(0, 3);

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getFileIconColor = (type) => {
    if (type === "pdf") return "from-rose-500 to-red-500";
    return "from-teal-500 to-emerald-500";
  };

  return (
    <section className={`rounded-2xl border p-5 transition-shadow ${
      isDarkMode 
        ? "border-slate-850 bg-slate-900/60" 
        : "border-slate-200/80 bg-white"
    }`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-455" : "text-slate-400"}`}>
            Documents
          </p>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-white mt-0.5">
            Recent Reports
          </h3>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          isDarkMode 
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
            : "bg-cyan-50 text-cyan-700 border border-cyan-200"
        }`}>
          EMR Sync
        </span>
      </div>

      <div className="space-y-3">
        {displayRecords.length === 0 ? (
          <div className="py-6 text-center border border-dashed border-slate-200 dark:border-slate-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 text-xs text-slate-500 dark:text-slate-400">
            <FaBan className="text-xl text-slate-400 mx-auto mb-2" />
            No medical records uploaded yet.
          </div>
        ) : (
          displayRecords.map((record) => {
            const fileUrl = `http://localhost:5000${record.fileUrl}`;
            
            return (
              <div 
                key={record._id} 
                className={`flex items-center justify-between rounded-xl border p-3.5 transition-colors ${
                  isDarkMode 
                    ? "border-slate-800 bg-slate-950/40" 
                    : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${
                    record.fileType === "pdf" 
                      ? "from-rose-500/20 to-red-500/20 text-rose-500 dark:text-rose-455" 
                      : "from-teal-500/20 to-emerald-500/20 text-teal-650 dark:text-teal-400"
                  } flex-shrink-0`}>
                    <FaFileMedical className="text-lg" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-slate-850 dark:text-white text-xs truncate">
                      {record.description || record.fileName}
                    </p>
                    <p className="text-[11px] text-slate-550 dark:text-slate-450 mt-0.5">
                      {record.fileType.toUpperCase()} · {formatDate(record.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`rounded-lg p-2 transition border ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                    title="View file"
                  >
                    <FaEye className="text-xs" />
                  </a>
                  <a 
                    href={fileUrl} 
                    download
                    className="rounded-lg bg-teal-600 hover:bg-teal-700 p-2 text-white shadow-sm transition"
                    title="Download file"
                  >
                    <FaArrowDown className="text-xs" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentReports;
