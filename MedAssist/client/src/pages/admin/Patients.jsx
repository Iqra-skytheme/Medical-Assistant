import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaCalendarDays,
  FaNotesMedical,
  FaMagnifyingGlass,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
} from "react-icons/fa6";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Button from "../../components/ui/Button";
import {
  getPatientsLogs,
  getPatientAppointmentsLogs,
} from "../../services/adminService";

function AdminPatients() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [activeTab, setActiveTab] = useState("patients"); // patients or appointments
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "patients") {
        const list = await getPatientsLogs();
        setPatients(list || []);
      } else {
        const list = await getPatientAppointmentsLogs();
        setAppointments(list || []);
      }
    } catch (err) {
      toast.error("Failed to query patient logs data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      appt.email.toLowerCase().includes(search.toLowerCase())
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
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Clinical Logs</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review active patient accounts and coordinate global appointments logs.</p>
            </div>
            <Button onClick={fetchData} variant="secondary" className="md:w-auto w-full">
              Sync Data
            </Button>
          </div>

          {/* Tab Selector Buttons */}
          <div className="mt-8 flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setActiveTab("patients");
                setSearch("");
              }}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
                activeTab === "patients"
                  ? "border-teal-600 text-teal-650 dark:text-teal-400"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Patient Registry
            </button>
            <button
              onClick={() => {
                setActiveTab("appointments");
                setSearch("");
              }}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition ${
                activeTab === "appointments"
                  ? "border-teal-600 text-teal-650 dark:text-teal-400"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Appointments History
            </button>
          </div>

          {/* Table Container */}
          <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            
            {/* Search filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {activeTab === "patients" ? "Registered Patient Logs" : "Global Appointments Registry"}
              </h3>
              
              <div className="relative w-full sm:max-w-xs">
                <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-slate-450 dark:text-slate-500 text-sm" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "patients"
                      ? "Search patient name/email..."
                      : "Search patient, doctor, or email..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                />
              </div>
            </div>

            {/* List details */}
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                <span className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-2 text-xs font-bold">Retrieving registers...</p>
              </div>
            ) : activeTab === "patients" ? (
              // TAB 1: Patients Registry list
              filteredPatients.length === 0 ? (
                <div className="py-16 text-center text-slate-550 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-sm">No patient credentials found matching queries.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                        <th className="py-4 px-2">Patient Details</th>
                        <th className="py-4 px-2">Contact Email</th>
                        <th className="py-4 px-2">Registration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                      {filteredPatients.map((patient) => (
                        <tr key={patient._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-155">
                          <td className="py-4 px-2 font-bold text-slate-800 dark:text-slate-200">{patient.name}</td>
                          <td className="py-4 px-2 font-mono text-xs text-slate-500">{patient.email}</td>
                          <td className="py-4 px-2 text-xs text-slate-500">{new Date(patient.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              // TAB 2: Appointments Registry list
              filteredAppointments.length === 0 ? (
                <div className="py-16 text-center text-slate-555 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-sm">No appointment history matching queries.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                        <th className="py-4 px-2">Patient Details</th>
                        <th className="py-4 px-2">Assigned Doctor</th>
                        <th className="py-4 px-2">Date & Time Slot</th>
                        <th className="py-4 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                      {filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-155">
                          <td className="py-4 px-2">
                            <p className="font-bold text-slate-800 dark:text-slate-200">{appt.patientName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{appt.email}</p>
                          </td>
                          <td className="py-4 px-2 font-semibold text-slate-700 dark:text-slate-300">
                            Dr. {appt.doctorName}
                          </td>
                          <td className="py-4 px-2 text-xs text-slate-550 dark:text-slate-400">{appt.time}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                              appt.status === "done"
                                ? "bg-emerald-100 text-emerald-850 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : appt.status === "pending"
                                ? "bg-amber-100 text-amber-850 dark:bg-amber-950/50 dark:text-amber-300"
                                : "bg-rose-100 text-rose-850 dark:bg-rose-950/50 dark:text-rose-300"
                            }`}>
                              {appt.status === "done" && <FaCircleCheck className="text-xs" />}
                              {appt.status === "pending" && <FaClock className="text-xs" />}
                              {appt.status === "cancelled" && <FaCircleXmark className="text-xs" />}
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPatients;
