import { FaHeartPulse, FaDroplet, FaBed, FaGlassWater } from "react-icons/fa6";
import { motion } from "framer-motion";

const metrics = [
  {
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    icon: <FaHeartPulse className="text-2xl text-rose-500" />,
    accent: "from-rose-500/20 to-orange-400/20",
  },
  {
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: <FaHeartPulse className="text-2xl text-cyan-500" />,
    accent: "from-cyan-500/20 to-sky-400/20",
  },
  {
    label: "Sugar",
    value: "98",
    unit: "mg/dL",
    icon: <FaDroplet className="text-2xl text-violet-500" />,
    accent: "from-violet-500/20 to-fuchsia-400/20",
  },
  {
    label: "Sleep",
    value: "7.5",
    unit: "hrs",
    icon: <FaBed className="text-2xl text-emerald-500" />,
    accent: "from-emerald-500/20 to-green-400/20",
  },
  {
    label: "Water",
    value: "2.1",
    unit: "L",
    icon: <FaGlassWater className="text-2xl text-blue-500" />,
    accent: "from-blue-500/20 to-cyan-400/20",
  },
  {
    label: "Weight",
    value: "68",
    unit: "kg",
    icon: <FaHeartPulse className="text-2xl text-amber-500" />,
    accent: "from-amber-500/20 to-yellow-400/20",
  },
];

function HealthOverview() {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Daily health snapshot</p>
          <h3 className="text-2xl font-semibold text-slate-800">Vital overview</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Stable</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`rounded-2xl border border-slate-100 bg-gradient-to-br ${item.accent} p-4`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm">{item.icon}</div>
              <span className="text-sm font-medium text-slate-500">{item.unit}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HealthOverview;
