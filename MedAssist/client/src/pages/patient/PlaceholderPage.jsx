import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCircleInfo } from "react-icons/fa6";

function PlaceholderPage() {
  const location = useLocation();
  const title = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#eef7ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <Link to="/patient/dashboard" className="flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
          <FaArrowLeft />
          Back to dashboard
        </Link>

        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <FaCircleInfo className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Healthcare experience</p>
              <h1 className="mt-1 text-3xl font-semibold">{title || "Care hub"}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">
            This premium placeholder screen is ready for your real backend data. The dashboard now routes every action to a native patient experience with polished UI and smooth transitions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderPage;
