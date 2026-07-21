import { FaCircleExclamation } from "react-icons/fa6";

function FloatingSOS() {
  return (
    <button className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-white shadow-[0_20px_60px_-15px_rgba(244,63,94,0.6)] transition hover:scale-105">
      <span className="flex h-3 w-3 animate-ping rounded-full bg-white/80" />
      <FaCircleExclamation className="text-xl" />
      <span className="font-semibold">SOS</span>
    </button>
  );
}

export default FloatingSOS;
