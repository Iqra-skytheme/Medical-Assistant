import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaCalendarDays,
  FaClock,
  FaPlus,
  FaTrashCan,
  FaCalendarWeek,
} from "react-icons/fa6";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import Button from "../../components/ui/Button";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../services/doctorService";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function DoctorAppointments() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New slot form state
  const [newSlot, setNewSlot] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getDoctorProfile();
      setProfile(res.user?.profile);
      setSlots(res.user?.profile?.availabilitySlots || []);
    } catch (err) {
      toast.error("Failed to load doctor availability parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();

    // Check if slot already exists
    const exists = slots.some(
      (slot) =>
        slot.day === newSlot.day &&
        slot.startTime === newSlot.startTime &&
        slot.endTime === newSlot.endTime
    );

    if (exists) {
      toast.warn("This availability slot already exists.");
      return;
    }

    const updatedSlots = [...slots, newSlot];

    try {
      setSaving(true);
      await updateDoctorProfile({ availabilitySlots: updatedSlots });
      toast.success("Schedule slot added successfully.");
      setSlots(updatedSlots);
    } catch (err) {
      toast.error("Failed to append availability slot.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveSlot = async (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    
    try {
      setSaving(true);
      await updateDoctorProfile({ availabilitySlots: updatedSlots });
      toast.success("Availability slot removed.");
      setSlots(updatedSlots);
    } catch (err) {
      toast.error("Failed to remove availability slot.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-955 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <Topbar setIsOpen={setIsSidebarOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Page Headers */}
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Schedule slots</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure your weekly availability hours and calendar booking blocks.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8">
            
            {/* Create Slot Form */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <div className="flex items-center gap-3 text-teal-600 mb-6">
                  <FaPlus className="text-lg" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Add Availability Block</h3>
                </div>

                <form onSubmit={handleAddSlot} className="space-y-4">
                  
                  {/* Select Day */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Week Day</label>
                    <select
                      value={newSlot.day}
                      onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-650"
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Start Time */}
                    <div>
                      <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Start Hour</label>
                      <input
                        type="time"
                        required
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none focus:border-teal-650"
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">End Hour</label>
                      <input
                        type="time"
                        required
                        value={newSlot.endTime}
                        onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none focus:border-teal-650"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full" loading={saving}>
                      Append Slot Block
                    </Button>
                  </div>

                </form>
              </div>
            </div>

            {/* List Active Availability Slots */}
            <div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-6 flex items-center gap-3">
                  <FaCalendarWeek className="text-teal-600" />
                  Active Calendar Slots
                </h3>

                {loading ? (
                  <div className="py-20 text-center text-slate-500">
                    <span className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="py-16 text-center text-slate-450 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <p className="text-sm">No availability slots registered. Please append one above to accept appointments.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {slots.map((slot, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between group hover:border-teal-600/40 transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 text-base">
                            <FaClock />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-205">{slot.day}</p>
                            <p className="text-[11px] text-slate-450 font-mono mt-0.5">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </div>
                        </div>
                        <button
                          disabled={saving}
                          onClick={() => handleRemoveSlot(index)}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 dark:bg-slate-900 dark:text-rose-455 dark:hover:bg-slate-850 opacity-0 group-hover:opacity-100 focus:opacity-100 transition duration-150"
                          title="Remove availability block"
                        >
                          <FaTrashCan className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorAppointments;
