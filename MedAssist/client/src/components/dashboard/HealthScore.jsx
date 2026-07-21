import { motion } from "framer-motion";

function HealthScore() {
  const score = 84;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section className="rounded-[28px] border border-white/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.55)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Wellness score</p>
          <h3 className="mt-2 text-2xl font-semibold">Overall health</h3>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium">Excellent</span>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative flex h-40 w-40 items-center justify-center">
          <svg width="160" height="160" className="-rotate-90">
            <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="12" fill="none" />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={score >= 80 ? "#34d399" : score >= 60 ? "#38bdf8" : "#f97316"}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-4xl font-semibold">{score}</p>
            <p className="text-sm text-slate-300">/100</p>
          </div>
        </motion.div>
        <p className="mt-5 max-w-xs text-center text-sm leading-7 text-slate-300">
          Your habits are trending positively. Keep hydration and sleep on track for the next week.
        </p>
      </div>
    </section>
  );
}

export default HealthScore;
