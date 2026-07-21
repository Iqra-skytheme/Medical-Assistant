import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaCalendarCheck,
  FaUserDoctor,
  FaClock,
  FaNotesMedical,
  FaCircleCheck,
  FaCircleXmark,
  FaCalendarDays,
} from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import {
  getDoctorsList,
  bookAppointment,
  getPatientAppointments,
} from "../../services/patientService";

function PatientAppointments() {


  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Booking Form State
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    timeSlot: "",
    reason: "",
  });

  // Selected doctor's availability slots for guidance
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [apptRes, docRes] = await Promise.all([
        getPatientAppointments(),
        getDoctorsList(),
      ]);
      setAppointments(apptRes.appointments || apptRes || []);
      setDoctors(docRes.doctors || docRes || []);
    } catch (err) {
      toast.error("Failed to load appointment schedule parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDoctorChange = (e) => {
    const docId = e.target.value;
    setFormData({ ...formData, doctorId, timeSlot: "" });

    const selectedDoc = doctors.find((d) => d.id === docId || d._id === docId);
    setSelectedDoctorSlots(selectedDoc?.profile?.availabilitySlots || []);
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (!formData.doctorId || !formData.date || !formData.timeSlot) {
      toast.error("Please fill all booking details.");
      return;
    }

    try {
      setBooking(true);
      await bookAppointment(formData);
      toast.success("Appointment booked successfully.");
      setFormData({ doctorId: "", date: "", timeSlot: "", reason: "" });
      setSelectedDoctorSlots([]);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Double-booking detected or invalid time slot.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <DashboardLayout showSOS={true}>

          {/* Page Headers */}
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Book Consultations</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Schedule appointment slots with specialized medical consultants and track confirmation status.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8">
            
            {/* Booking Form Card */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <div className="flex items-center gap-3 text-teal-650 mb-6">
                  <FaCalendarCheck className="text-lg" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Schedule Appointment</h3>
                </div>

                <form onSubmit={handleBook} className="space-y-4">
                  
                  {/* Select Doctor */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Choose Specialist</label>
                    <select
                      value={formData.doctorId}
                      onChange={handleDoctorChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-650"
                    >
                      <option value="">-- Choose Specialist --</option>
                      {doctors.map((doc) => (
                        <option key={doc.id || doc._id} value={doc.id || doc._id}>
                          Dr. {doc.name} ({doc.profile?.specialization || "General Practitioner"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor Availability Helper Guide */}
                  {selectedDoctorSlots.length > 0 && (
                    <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-900/40 rounded-2xl">
                      <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1.5 flex items-center gap-1.5">
                        <FaClock />
                        Weekly Available Hours:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDoctorSlots.map((slot, i) => (
                          <span key={i} className="text-[10px] bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-950/80 px-2 py-0.5 rounded-lg text-teal-650 dark:text-teal-350 font-medium">
                            {slot.day}: {slot.startTime} - {slot.endTime}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Appointment Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Desired Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none focus:border-teal-650"
                    />
                  </div>

                  {/* Time Slot input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Hour Slot (e.g. 10:00 AM)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10:30"
                      required
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-teal-650"
                    />
                  </div>

                  {/* Reason Note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Reason / Booking Note</label>
                    <textarea
                      placeholder="Detail symptoms or general inquiries..."
                      rows={3}
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-teal-650 transition resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full" loading={booking}>
                      Confirm Reservation
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* List Active Bookings */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-6 flex items-center gap-3">
                  <FaCalendarDays className="text-teal-600" />
                  My Scheduled Consultations
                </h3>

                {loading ? (
                  <div className="py-20 text-center text-slate-505">
                    <span className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="py-16 text-center text-slate-450 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <p className="text-sm">No appointments booked yet. Select a specialist above to begin.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appt) => (
                      <div
                        key={appt._id}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 text-xl">
                            <FaUserDoctor />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-slate-100">
                              Dr. {appt.doctor?.name || "Specialist"}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {appt.doctor?.profile?.specialization || "General Practitioner"}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono mt-1">
                              {appt.date} at {appt.timeSlot}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-900">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            appt.status === "done"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-355"
                              : appt.status === "pending"
                              ? "bg-amber-105 text-amber-800 dark:bg-amber-950/50 dark:text-amber-350"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-350"
                          }`}>
                            {appt.status === "done" && <FaCircleCheck className="text-xs" />}
                            {appt.status === "pending" && <FaClock className="text-xs" />}
                            {appt.status === "cancelled" && <FaCircleXmark className="text-xs" />}
                            {appt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
    </DashboardLayout>
  );
}

export default PatientAppointments;
