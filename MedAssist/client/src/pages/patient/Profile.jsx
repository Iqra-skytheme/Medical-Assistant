import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { 
  FaUser, 
  FaGear, 
  FaShieldHeart, 
  FaHeartPulse, 
  FaBriefcaseMedical,
  FaPhone
} from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { updatePatientSettings } from "../../services/patientService";

function PatientProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    height: "",
    weight: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    allergies: "",
    chronicConditions: "",
    notificationsEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const profile = user.profile || {};
      setForm({
        name: user.name || "",
        phone: profile.phone || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        bloodGroup: profile.bloodGroup || "",
        height: profile.height || "",
        weight: profile.weight || "",
        emergencyContactName: profile.emergencyContactName || "",
        emergencyContactPhone: profile.emergencyContactPhone || "",
        allergies: profile.allergies || "",
        chronicConditions: profile.chronicConditions || "",
        notificationsEnabled:
          profile.notificationsEnabled !== undefined
            ? profile.notificationsEnabled
            : true,
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updatePatientSettings({
        ...form,
        notificationPreferences: form.notificationsEnabled ? "both" : "in-app"
      });
      if (res.success && res.user) {
        updateUser(res.user);
      }
      toast.success("Profile settings updated successfully.");
    } catch (err) {
      toast.error("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout showSOS={true}>
      {/* Page Headers */}
      <div className="mt-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Portal Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure profile details, clinical variables, and emergency alert contacts.</p>
      </div>

      <div className="mt-8 max-w-5xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-2xl font-bold uppercase shadow-sm">
                {form.name?.charAt(0) || "P"}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{form.name || "Patient Member"}</h3>
                <p className="text-xs text-slate-550 capitalize font-semibold tracking-wide dark:text-slate-450">{user?.role || "Patient"}</p>
              </div>
            </div>
            <div className="text-xs text-slate-450 dark:text-slate-500">
              Verified User EMR Account
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <span className="w-8 h-8 border-3 border-teal-650 border-t-transparent rounded-full animate-spin inline-block"></span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Account Settings */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                  <FaUser className="text-teal-600 dark:text-teal-400" />
                  Account Identification
                </h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-450 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-455 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-600"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Medical Profile */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-850/60">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                  <FaHeartPulse className="text-teal-600 dark:text-teal-400" />
                  Biometric Parameters
                </h4>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-855 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-600"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      placeholder="e.g. 175"
                      value={form.height}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-455 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      placeholder="e.g. 70"
                      value={form.weight}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-455 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Clinical History */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-850/60">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                  <FaBriefcaseMedical className="text-teal-600 dark:text-teal-400" />
                  Clinical History
                </h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Allergies</label>
                    <textarea
                      name="allergies"
                      rows="2"
                      placeholder="List any drug, environmental, or food allergies..."
                      value={form.allergies}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-450 dark:placeholder-white/60 outline-none focus:border-teal-600 transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Chronic Conditions</label>
                    <textarea
                      name="chronicConditions"
                      rows="2"
                      placeholder="List chronic issues like diabetes, asthma, hypertension..."
                      value={form.chronicConditions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-855 dark:text-slate-100 placeholder-slate-450 dark:placeholder-white/60 outline-none focus:border-teal-600 transition resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Emergency Contacts */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-850/60">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                  <FaPhone className="text-teal-600 dark:text-teal-400" />
                  Emergency Contact
                </h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Person Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      placeholder="e.g. Sarah Iqbal"
                      value={form.emergencyContactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-455 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Emergency Phone Number</label>
                    <input
                      type="text"
                      name="emergencyContactPhone"
                      placeholder="+1 (555) 000-0000"
                      value={form.emergencyContactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-455 dark:placeholder-white/60 outline-none focus:border-teal-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Preferences */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-850/60">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-150 dark:border-slate-850/60">
                  <input
                    type="checkbox"
                    name="notificationsEnabled"
                    id="notificationsEnabled"
                    checked={form.notificationsEnabled}
                    onChange={handleChange}
                    className="w-4 h-4 text-teal-650 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <label htmlFor="notificationsEnabled" className="text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                    Enable in-app & email notification alerts for upcoming appointments
                  </label>
                </div>
              </div>

              {/* Submit actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-850/60 flex justify-end">
                <Button type="submit" variant="primary" loading={saving} className="px-8 py-3 font-extrabold text-sm tracking-wide">
                  Save Settings
                </Button>
              </div>

            </form>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatientProfile;
