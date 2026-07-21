import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaUserDoctor,
  FaCircleCheck,
  FaCircleXmark,
  FaTrashCan,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Button from "../../components/ui/Button";
import {
  getDoctorsAdminList,
  setDoctorStatus,
  deleteAccount,
} from "../../services/adminService";

const SPECIALIZATIONS = [
  "All Specializations",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Practitioner",
];

function AdminDoctors() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [filterSpec, setFilterSpec] = useState("All Specializations");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const list = await getDoctorsAdminList();
      setDoctors(list || []);
      
      const total = list.length;
      const active = list.filter((d) => d.status === "active").length;
      const inactive = total - active;
      setStats({ total, active, inactive });
    } catch (err) {
      toast.error("Failed to query doctor profiles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleToggleStatus = async (doctor) => {
    const nextStatus = doctor.status === "active" ? "inactive" : "active";
    setUpdatingId(doctor.id);
    try {
      await setDoctorStatus(doctor.id, nextStatus);
      toast.success(`Specialist status updated to ${nextStatus}.`);
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to permanently delete this doctor account and all their slot configurations?")) {
      try {
        await deleteAccount(doctorId);
        toast.success("Doctor account deleted permanently.");
        fetchDoctors();
      } catch (err) {
        toast.error("Failed to delete doctor account.");
      }
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesFilter =
      filterSpec === "All Specializations"
        ? true
        : doc.specialization.toLowerCase() === filterSpec.toLowerCase();
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

        {/* Main Panel */}
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <Topbar setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Page Headers */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Doctor Directory</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage specialist listings, confirm licensing activation, and review assignments.</p>
            </div>
            <Button onClick={fetchDoctors} variant="secondary" className="md:w-auto w-full">
              Sync Directory
            </Button>
          </div>

          {/* Stats Summary */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Total Doctors */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 dark:text-teal-400 text-xl">
                <FaUserDoctor />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Total Registered</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.total}</h3>
              </div>
            </div>

            {/* Active Doctors */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                <FaCircleCheck />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Active Status</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.active}</h3>
              </div>
            </div>

            {/* Inactive Doctors */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-455 text-xl">
                <FaCircleXmark />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider">Deactivated</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.inactive}</h3>
              </div>
            </div>

          </div>

          {/* Directory Listings */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            
            {/* Filter Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Doctors & Specialists</h3>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-slate-450 dark:text-slate-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search doctor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                  />
                </div>

                {/* Specialization Filter */}
                <select
                  value={filterSpec}
                  onChange={(e) => setFilterSpec(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold outline-none cursor-pointer"
                >
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Doctors List table view */}
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                <span className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-2 text-xs font-bold">Querying directory logs...</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-sm">No registered doctors match your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                      <th className="py-4 px-2">Doctor</th>
                      <th className="py-4 px-2">Specialization</th>
                      <th className="py-4 px-2">Contact</th>
                      <th className="py-4 px-2">Account Status</th>
                      <th className="py-4 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {filteredDoctors.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-150">
                        <td className="py-4 px-2 font-bold text-slate-800 dark:text-slate-200">{doc.name}</td>
                        <td className="py-4 px-2">
                          <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-800 dark:text-teal-350 text-xs font-semibold">
                            {doc.specialization}
                          </span>
                        </td>
                        <td className="py-4 px-2 font-mono text-xs text-slate-500">{doc.email}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            doc.status === "active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end gap-3 items-center">
                            <button
                              disabled={updatingId === doc.id}
                              onClick={() => handleToggleStatus(doc)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border disabled:opacity-50 ${
                                doc.status === "active"
                                  ? "border-rose-200 text-rose-600 bg-rose-50/50 dark:bg-slate-850 hover:bg-rose-55"
                                  : "border-teal-200 text-teal-650 bg-teal-50/50 dark:bg-slate-850 hover:bg-teal-55"
                              }`}
                            >
                              {updatingId === doc.id
                                ? "Updating..."
                                : doc.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeleteDoctor(doc.id)}
                              className="p-2 rounded-lg bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-slate-750 transition"
                              title="Delete doctor directory registry"
                            >
                              <FaTrashCan className="text-xs" />
                            </button>
                          </div>
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

export default AdminDoctors;
