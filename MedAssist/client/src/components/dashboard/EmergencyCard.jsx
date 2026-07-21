import { FaTruckMedical } from "react-icons/fa6";

function EmergencyCard() {
  return (
    <section className="rounded-[28px] border border-rose-200 bg-gradient-to-br from-rose-500 via-rose-500 to-orange-400 p-6 text-white shadow-[0_20px_60px_-25px_rgba(244,63,94,0.45)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-100">Emergency</p>
          <h3 className="mt-2 text-2xl font-semibold">Need urgent help?</h3>
        </div>
        <div className="rounded-2xl bg-white/20 p-3">
          <FaTruckMedical className="text-2xl" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-rose-50">
        Reach emergency support instantly and connect to nearby care providers in seconds.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:scale-105">
          Call Ambulance
        </button>
        <button className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          Call Hospital
        </button>
      </div>
    </section>
  );
}

export default EmergencyCard;
