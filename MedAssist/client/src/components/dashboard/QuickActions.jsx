import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCalendarPlus,
  FaFileMedical,
  FaNotesMedical,
  FaComments,
  FaVideo,
  FaFlask,
  FaTruckMedical,
  FaCapsules,
  FaHospital,
  FaPills,
} from "react-icons/fa6";

function QuickActions() {
  const actions = [
    { title: "Book Appointment", description: "Reserve a visit with your preferred specialist.", icon: <FaCalendarPlus className="text-3xl text-blue-600" />, link: "/patient/appointments", bg: "from-blue-500 to-cyan-400" },
    { title: "Chat Doctor", description: "Reach your care team instantly.", icon: <FaComments className="text-3xl text-emerald-600" />, link: "/patient/doctors", bg: "from-emerald-500 to-green-400" },
    { title: "Video Consultation", description: "Start a secure online visit.", icon: <FaVideo className="text-3xl text-violet-600" />, link: "/patient/appointments", bg: "from-violet-500 to-fuchsia-400" },
    { title: "Medical Records", description: "Open your digital health history.", icon: <FaFileMedical className="text-3xl text-rose-600" />, link: "/patient/medical-history", bg: "from-rose-500 to-orange-400" },
    { title: "Lab Reports", description: "Access recent test results quickly.", icon: <FaFlask className="text-3xl text-cyan-600" />, link: "/patient/medical-history", bg: "from-cyan-500 to-sky-400" },
    { title: "Emergency", description: "Connect with urgent support right away.", icon: <FaTruckMedical className="text-3xl text-amber-600" />, link: "/patient/settings", bg: "from-amber-500 to-yellow-400" },
    { title: "Prescriptions", description: "Review active medicines and guidance.", icon: <FaNotesMedical className="text-3xl text-purple-600" />, link: "/patient/medical-history", bg: "from-purple-500 to-indigo-400" },
    { title: "Medicine Reminder", description: "Never miss a scheduled dose.", icon: <FaCapsules className="text-3xl text-slate-700" />, link: "/patient/medical-history", bg: "from-slate-600 to-slate-500" },
    { title: "Find Hospital", description: "Locate trusted healthcare facilities nearby.", icon: <FaHospital className="text-3xl text-emerald-700" />, link: "/patient/doctors", bg: "from-emerald-600 to-cyan-500" },
    { title: "Find Pharmacy", description: "Discover your nearest pharmacy.", icon: <FaPills className="text-3xl text-violet-700" />, link: "/patient/medical-history", bg: "from-violet-600 to-fuchsia-500" },
  ];

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Patient tools</p>
          <h2 className="text-2xl font-semibold text-slate-800">Quick actions</h2>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">Available now</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {actions.map((action, index) => (
          <motion.div key={action.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} whileHover={{ y: -4, scale: 1.02 }}>
            <Link to={action.link} className="flex h-full flex-col rounded-[24px] border border-slate-100 bg-slate-50/80 p-5 transition hover:shadow-lg">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.bg} shadow-lg`}>
                {action.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">{action.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;