import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaHeartPulse,
  FaCalendarCheck,
  FaCircleCheck,
  FaUsers,
  FaClock,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../../services/doctorService";

function DoctorDashboard() {

  
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, patients: 0 });

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getDoctorAppointments();
      const apptList = res.appointments || [];
      setAppointments(apptList);

      const total = apptList.length;
      const completed = apptList.filter((a) => a.status === "done").length;
      
      // Calculate distinct patients count
      const patientIds = new Set(apptList.map((a) => a.patient?._id).filter(Boolean));
      const patients = patientIds.size;

      setStats({ total, completed, patients });
    } catch (err) {
      toast.error("Failed to load appointment schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, nextStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, nextStatus);
      toast.success(`Appointment status updated to ${nextStatus}.`);
      fetchAppointments();
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <DashboardLayout showSOS={false}>

          {/* Welcome Card */}
          <div className="mt-6 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-teal-655/10">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back, Dr. {user?.name || "Specialist"}</h1>
            <p className="mt-2 text-teal-50 text-sm max-w-xl">
              Manage your diagnostic sessions, examine patient files, and configure your slot schedules securely.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Total Booked */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 dark:text-teal-400 text-xl">
                <FaCalendarCheck />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Total Appointments</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.total}</h3>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                <FaCircleCheck />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-455 dark:text-slate-500 uppercase tracking-wider">Completed Consults</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.completed}</h3>
              </div>
            </div>

            {/* Distinct Patients */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-450 text-xl">
                <FaUsers />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">My Patients</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.patients}</h3>
              </div>
            </div>

          </div>

          {/* Appointments Grid List */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Upcoming Appointments</h3>
              <Button onClick={fetchAppointments} variant="outline" className="text-xs py-1.5 px-3">
                Reload List
              </Button>
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-550">
                <span className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-2 text-xs font-bold">Querying appointments roster...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-sm">No appointments scheduled under your roster yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                      <th className="py-4 px-2">Patient Details</th>
                      <th className="py-4 px-2">Consultation Time</th>
                      <th className="py-4 px-2">Reason / Booking Note</th>
                      <th className="py-4 px-2">Status</th>
                      <th className="py-4 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {appointments.map((appt) => (
                      <tr key={appt._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-150">
                        <td className="py-4 px-2">
                          <p className="font-bold text-slate-850 dark:text-slate-150">{appt.patient?.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {appt.patient?.gender ? appt.patient.gender + ", " : ""}
                            Age: {getAge(appt.patient?.dateOfBirth)}
                          </p>
                        </td>
                        <td className="py-4 px-2">
                          <p className="font-semibold text-slate-700 dark:text-slate-350 text-xs">{appt.date}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{appt.timeSlot}</p>
                        </td>
                        <td className="py-4 px-2 text-xs text-slate-500 max-w-xs truncate" title={appt.reason}>
                          {appt.reason || "General checkup"}
                        </td>
                        <td className="py-4 px-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            appt.status === "done"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-355"
                              : appt.status === "pending"
                              ? "bg-amber-105 text-amber-800 dark:bg-amber-950/50 dark:text-amber-350"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-350"
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          {appt.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleUpdateStatus(appt._id, "done")}
                                className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition"
                                title="Mark session as Completed"
                              >
                                <FaCheck className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(appt._id, "cancelled")}
                                className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100 transition"
                                title="Cancel consultation"
                              >
                                <FaXmark className="text-xs" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
