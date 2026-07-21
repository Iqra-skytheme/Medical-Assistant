import { FaHeartPulse } from "react-icons/fa6";

function EmptyState({ title = "No updates yet", description = "Your dashboard will populate here when new data arrives." }) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center shadow-inner">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
        <FaHeartPulse className="text-2xl" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;
