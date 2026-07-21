function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />
      </div>
      <div className="h-24 animate-pulse rounded-3xl bg-slate-200" />
    </div>
  );
}

export default LoadingSkeleton;
