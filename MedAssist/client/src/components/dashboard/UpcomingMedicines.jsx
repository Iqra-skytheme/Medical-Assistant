import { useState } from "react";
import { FaCapsules, FaCircleCheck } from "react-icons/fa6";

const medicines = [
  { id: 1, name: "Blood Pressure Tablet", time: "08:00 AM", slot: "Morning", taken: false },
  { id: 2, name: "Vitamin D3", time: "01:00 PM", slot: "Afternoon", taken: true },
  { id: 3, name: "Omega-3", time: "09:00 PM", slot: "Night", taken: false },
];

function UpcomingMedicines() {
  const [items, setItems] = useState(medicines);

  const toggleTaken = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, taken: !item.taken } : item)));
  };

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Medication</p>
          <h3 className="text-2xl font-semibold text-slate-800">Today’s plan</h3>
        </div>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">3 items</span>
      </div>

      <div className="space-y-3">
        {items.map((medicine) => (
          <div key={medicine.id} className={`rounded-2xl border p-4 transition ${medicine.taken ? "border-emerald-200 bg-emerald-50" : "border-slate-100 bg-slate-50"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl p-3 ${medicine.taken ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}>
                  <FaCapsules className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{medicine.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{medicine.slot} · {medicine.time}</p>
                </div>
              </div>
              <button
                onClick={() => toggleTaken(medicine.id)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${medicine.taken ? "bg-emerald-600 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"}`}
              >
                {medicine.taken ? "Taken" : "Mark"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingMedicines;
