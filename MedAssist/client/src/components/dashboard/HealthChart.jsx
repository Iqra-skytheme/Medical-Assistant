const data = [
  { day: "Mon", score: 74 },
  { day: "Tue", score: 79 },
  { day: "Wed", score: 82 },
  { day: "Thu", score: 83 },
  { day: "Fri", score: 88 },
  { day: "Sat", score: 86 },
  { day: "Sun", score: 91 },
];

function HealthChart() {
  const width = 520;
  const height = 250;
  const padding = 30;
  const maxValue = 100;
  const minValue = 60;

  const points = data
    .map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - ((item.score - minValue) / (maxValue - minValue)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Weekly trend</p>
          <h3 className="text-2xl font-semibold text-slate-800">Wellness progress</h3>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700">+8%</span>
      </div>

      <div className="h-72 rounded-[24px] bg-slate-50/70 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
          {[0, 1, 2, 3].map((step) => {
            const y = padding + (step * (height - padding * 2)) / 3;
            return <line key={step} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f1f5f9" strokeDasharray="4 4" />;
          })}

          <polygon points={areaPoints} fill="url(#trendFill)" />
          <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {data.map((item, index) => {
            const x = padding + (index * (width - padding * 2)) / (data.length - 1);
            const y = height - padding - ((item.score - minValue) / (maxValue - minValue)) * (height - padding * 2);
            return (
              <g key={item.day}>
                <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
                <text x={x} y={height - 8} textAnchor="middle" fontSize="12" fill="#64748b">{item.day}</text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

export default HealthChart;
