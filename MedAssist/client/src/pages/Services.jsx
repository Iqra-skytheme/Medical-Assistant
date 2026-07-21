import { useState } from "react";
import {
  FaCalendarCheck,
  FaUserDoctor,
  FaFileMedical,
  FaRobot,
  FaVideo,
  FaNotesMedical,
  FaChevronDown,
  FaMagnifyingGlass,
  FaClipboardList,
  FaHandHoldingHeart
} from "react-icons/fa6";

import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const services = [
  {
    icon: FaCalendarCheck,
    title: "Appointment Booking",
    description: "Book appointments with experienced doctors quickly and easily.",
    color: "text-teal-650 dark:text-teal-400"
  },
  {
    icon: FaUserDoctor,
    title: "Find Doctors",
    description: "Search and connect with verified healthcare professionals.",
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: FaFileMedical,
    title: "Medical Records",
    description: "Store and access your medical history securely anytime.",
    color: "text-teal-500 dark:text-teal-350"
  },
  {
    icon: FaRobot,
    title: "AI Symptom Checker",
    description: "Get instant AI-powered guidance based on your symptoms.",
    color: "text-emerald-500 dark:text-emerald-350"
  },
  {
    icon: FaVideo,
    title: "Online Consultation",
    description: "Consult doctors remotely through secure video appointments.",
    color: "text-cyan-600 dark:text-cyan-400"
  },
  {
    icon: FaNotesMedical,
    title: "Digital Prescriptions",
    description: "Receive and manage prescriptions digitally with ease.",
    color: "text-teal-700 dark:text-teal-450"
  }
];

const steps = [
  {
    icon: FaMagnifyingGlass,
    num: "01",
    title: "Find a Specialist",
    desc: "Browse our list of verified doctors by specialty, ratings, or location."
  },
  {
    icon: FaCalendarCheck,
    num: "02",
    title: "Reserve a Slot",
    desc: "Pick an available date and time slot that fits your personal schedule."
  },
  {
    icon: FaClipboardList,
    num: "03",
    title: "Submit Case File",
    desc: "Attach your recent medical history documents or symptom notes for the doctor."
  },
  {
    icon: FaHandHoldingHeart,
    num: "04",
    title: "Get Trusted Care",
    desc: "Consult either in-person or virtually, and download your digital prescriptions."
  }
];

const faqs = [
  {
    q: "How do I secure an appointment with a specialist?",
    a: "Register/login to your Patient portal, search for doctors in the 'Specialists' tab, select an available date/time slot, describe your symptoms, and click Book. You will receive a confirmation alert immediately."
  },
  {
    q: "Are my electronic medical records kept encrypted?",
    a: "Absolutely. MedAssist uses advanced end-to-end encryption protocols to secure all medical histories, laboratory reports, and prescription documents. Only you and your authorized consultants have access."
  },
  {
    q: "Can I cancel or reschedule an active booking slot?",
    a: "Yes. From your Patient Dashboard under 'Appointments', you can cancel any pending appointment. Rescheduling is simple: cancel your current booking and choose a new slot that works for you."
  },
  {
    q: "How does the AI Symptom Checker offer suggestions?",
    a: "The symptom checker utilizes an advanced clinical decision tree algorithm to analyze your symptoms and suggest potential guidance. Please note this checker does not replace professional medical diagnosis."
  }
];

function Services() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Our Services"
          subtitle="MedAssist provides smart digital healthcare services that make healthcare simple, secure, and accessible for everyone."
        />

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="text-center flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 mb-5 transition-colors duration-300">
                  <Icon className={`text-4xl ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Steps Workflow Block */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">How It Works</h2>
            <p className="mt-2 text-sm text-slate-550 dark:text-slate-400">Follow four simple steps to receive quality healthcare immediately.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 flex flex-col items-start shadow-xs">
                  <div className="absolute top-4 right-4 text-3xl font-black text-slate-200 dark:text-slate-800 select-none">
                    {s.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-teal-655 dark:text-teal-400 text-lg mb-4">
                    <Icon />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{s.title}</h4>
                  <p className="mt-2 text-slate-550 dark:text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion Block */}
        <div className="mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-slate-550 dark:text-slate-400">Everything you need to know about our healthcare platform.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-slate-800 dark:text-white text-sm md:text-base pr-4">
                      {faq.q}
                    </span>
                    <FaChevronDown className={`text-slate-450 dark:text-slate-500 text-xs transition-transform duration-300 ${isOpen ? "rotate-180 text-teal-500" : ""}`} />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-60 border-t border-slate-100 dark:border-slate-850" : "max-h-0"}`}>
                    <div className="p-6 text-slate-600 dark:text-slate-455 text-xs md:text-sm leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;