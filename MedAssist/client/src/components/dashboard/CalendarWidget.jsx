import { FaCalendarDays } from "react-icons/fa6";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const highlighted = [5, 12, 18, 24];

function CalendarWidget() {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Calendar</p>
          <h3 className="text-2xl font-semibold text-slate-800">This month</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
          <FaCalendarDays />
          <span>July 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-400">
        {days.map((day) => (
          <div key={day} className="pb-2 font-semibold">{day}</div>
        ))}
        {dates.map((date) => {
          const isHighlighted = highlighted.includes(date);
          return (
            <div
              key={date}
              className={`flex h-10 items-center justify-center rounded-2xl text-sm font-semibold transition ${
                isHighlighted ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg" : "bg-slate-50 text-slate-600"
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarWidget;
