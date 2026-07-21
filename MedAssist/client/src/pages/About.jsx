import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaShieldHalved,
  FaUserCheck,
  FaClockRotateLeft
} from "react-icons/fa6";
import { motion } from "framer-motion";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const values = [
  {
    icon: FaBullseye,
    title: "Our Mission",
    description: "To deliver smart, secure, and accessible healthcare solutions globally by leveraging modern technological innovation.",
    color: "text-teal-650 dark:text-teal-400"
  },
  {
    icon: FaEye,
    title: "Our Vision",
    description: "To build a borderless digital ecosystem where scheduling, EMR reporting, and clinical care are seamlessly unified.",
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: FaHeart,
    title: "Compassionate Care",
    description: "We design products with human-centric principles, keeping patient comfort and data safety at the center of our work.",
    color: "text-cyan-600 dark:text-cyan-400"
  }
];

const stats = [
  { value: "50k+", label: "Registered Patients" },
  { value: "320+", label: "Verified Consultants" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "15+", label: "Partner Hospitals" }
];

const milestones = [
  { year: "2024", title: "MedAssist Founded", desc: "Started as a clinic booking prototype to remove schedule delays in Faisalabad." },
  { year: "2025", title: "EMR Panel Rollout", desc: "Integrated secure electronic medical registries (EMR) for doctors and researchers." },
  { year: "2026", title: "Unified Platform 3.0", desc: "Released version 3.0 offering automated notifications, mobile portals, and direct diagnostics." }
];

const leaders = [
  { name: "Dr. Sarah Munir", role: "Chief Medical Officer", specialty: "Cardiology (FCPS)", bio: "Over 12 years of clinical practice managing coronary emergencies and designing virtual healthcare guides." },
  { name: "Dr. Asif Ali", role: "Director of Health Informatics", specialty: "Digital Health (PhD)", bio: "Former advisor at the Ministry of Health specializing in secure database networks and telemetry integration." },
  { name: "Engr. Faisal Jutt", role: "Chief Solutions Architect", specialty: "System Scaling", bio: "Leads engineering efforts around end-to-end encryption protocols and real-time notification servers." }
];

function About() {
  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="About MedAssist"
          subtitle="MedAssist is a modern healthcare management platform that connects patients, doctors, and administrators through one secure system. We simplify healthcare by making appointments, medical records, and communication easier for everyone."
        />

        {/* Core Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="text-center flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 mb-5 transition-colors duration-300">
                  <Icon className={`text-4.5xl ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Statistics Block */}
        <div className="mt-20 py-12 px-6 rounded-3xl bg-slate-900 dark:bg-slate-900/40 border border-slate-850 text-white relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx}>
                <h4 className="text-4xl md:text-5.5xl font-black text-teal-400 tracking-tight">{s.value}</h4>
                <p className="mt-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Our Growth Timeline</h2>
            <p className="mt-2 text-sm text-slate-550 dark:text-slate-400">Tracing our evolutionary path in digital health scaling.</p>
          </div>

          <div className="mt-12 relative border-l border-slate-200 dark:border-slate-850 ml-4 md:ml-32 space-y-12">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-500 text-white shadow-sm ring-4 ring-white dark:ring-slate-950">
                  <FaClockRotateLeft className="text-[10px]" />
                </span>
                <span className="inline-block text-xs font-black tracking-widest text-teal-650 dark:text-teal-400 uppercase">
                  {m.year}
                </span>
                <h4 className="text-lg font-bold text-slate-850 dark:text-white mt-1">{m.title}</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Advisory Board */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Medical Advisory Board</h2>
            <p className="mt-2 text-sm text-slate-550 dark:text-slate-400">Guiding our platform developments with clinical safety and medical compliance.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {leaders.map((l, idx) => (
              <Card key={idx} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      {l.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{l.name}</h4>
                      <p className="text-xs text-teal-650 dark:text-teal-400 font-semibold">{l.role}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-3 text-[10px] uppercase font-bold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                    {l.specialty}
                  </span>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{l.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;