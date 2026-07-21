import { FaCalendarCheck, FaCapsules, FaFlask, FaStethoscope, FaTriangleExclamation } from "react-icons/fa6";

const activities = [
  { title: "Appointment scheduled", time: "Today • 10:00 AM", icon: <FaCalendarCheck className="text-blue-600" /> },
  { title: "Prescription updated", time: "Yesterday • 6:30 PM", icon: <FaCapsules className="text-violet-600" /> },
  { title: "Lab report shared", time: "2 days ago", icon: <FaFlask className="text-emerald-600" /> },
  { title: "Doctor visit confirmed", time: "3 days ago", icon: <FaStethoscope className="text-amber-600" /> },
  { title: "Emergency contact updated", time: "4 days ago", icon: <FaTriangleExclamation className="text-rose-600" /> },
];

function ActivityTimeline() {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Activity</p>
        <h3 className="text-2xl font-semibold text-slate-800">Timeline</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-xl">{activity.icon}</div>
              {index !== activities.length - 1 && <div className="mt-2 h-8 w-px bg-slate-200" />}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
              <p className="font-semibold text-slate-800">{activity.title}</p>
              <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;
