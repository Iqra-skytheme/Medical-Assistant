import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUserDoctor, FaCircleInfo } from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../services/doctorService";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Practitioner",
];

function DoctorSettings() {


  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    specialization: "General Practitioner",
    biography: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getDoctorProfile();
      const doctorData = res.user || {};
      const profileData = doctorData.profile || {};
      setForm({
        name: doctorData.name || "",
        phone: profileData.phone || "",
        specialization: profileData.specialization || "General Practitioner",
        biography: profileData.biography || "",
      });
    } catch (err) {
      toast.error("Failed to load doctor profile details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateDoctorProfile(form);
      toast.success("Settings profile updated successfully.");
      fetchProfile();
    } catch (err) {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout showSOS={false}>

          {/* Page Headers */}
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Profile Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure your clinical biography, specialties, and patients contact lines.</p>
          </div>

          <div className="mt-8 max-w-xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 dark:text-teal-400 text-xl font-bold uppercase">
                  {form.name?.charAt(0) || "D"}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Dr. {form.name}</h3>
                  <p className="text-xs text-slate-500">{form.specialization}</p>
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <span className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Doctor Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-650 transition"
                    />
                  </div>

                  {/* Specialization Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Specialization</label>
                    <select
                      name="specialization"
                      value={form.specialization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-650"
                    >
                      {SPECIALIZATIONS.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clinical Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-550 outline-none focus:border-teal-650 transition"
                    />
                  </div>

                  {/* Biography */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-2">Clinical Bio</label>
                    <textarea
                      name="biography"
                      rows={4}
                      placeholder="Write a brief description of your professional medical background..."
                      value={form.biography}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-sm text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-550 outline-none focus:border-teal-650 transition resize-none"
                    />
                  </div>

                  {/* Submit actions */}
                  <div className="pt-2">
                    <Button type="submit" variant="primary" loading={saving}>
                      Save settings
                    </Button>
                  </div>

                </form>
              )}

            </div>
          </div>
    </DashboardLayout>
  );
}

export default DoctorSettings;
