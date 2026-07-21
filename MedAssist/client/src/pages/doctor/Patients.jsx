import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaMagnifyingGlass,
  FaCircleInfo,
} from "react-icons/fa6";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Button from "../../components/ui/Button";
import { getDoctorPatients } from "../../services/doctorService";

function DoctorPatients() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getDoctorPatients();
      setPatients(res.patients || []);
    } catch (err) {
      toast.error("Failed to query patient list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <Topbar setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Page Headers */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Patient Directory</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review profiles and diagnostic parameters of patients registered under your clinic.</p>
            </div>
            <Button onClick={fetchPatients} variant="secondary" className="md:w-auto w-full">
              Sync Registry
            </Button>
          </div>

          {/* Patients Listing Table */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            
            {/* Header Search actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">My Patients</h3>
              
              <div className="relative w-full sm:max-w-xs">
                <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-slate-450 dark:text-slate-500 text-sm" />
                <input
                  type="text"
                  placeholder="Search patient..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                />
              </div>
            </div>

            {/* Patients registry list */}
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                <span className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-2 text-xs font-bold">Querying directory logs...</p>
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-sm">No patients found under your directory.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                      <th className="py-4 px-2">Patient Name</th>
                      <th className="py-4 px-2">Gender & Age</th>
                      <th className="py-4 px-2">Contact Details</th>
                      <th className="py-4 px-2 text-center">Medical E-Records</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {filteredPatients.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-150">
                        <td className="py-4 px-2 font-bold text-slate-850 dark:text-slate-150">{p.name}</td>
                        <td className="py-4 px-2 text-slate-700 dark:text-slate-350">
                          {p.gender ? p.gender + ", " : ""}Age: {getAge(p.dateOfBirth)}
                        </td>
                        <td className="py-4 px-2">
                          <p className="font-mono text-xs text-slate-500">{p.email}</p>
                          {p.phone && <p className="text-xs text-slate-400 mt-0.5">{p.phone}</p>}
                        </td>
                        <td className="py-4 px-2 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400 text-xs font-extrabold">
                            {p.recordsCount || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorPatients;
