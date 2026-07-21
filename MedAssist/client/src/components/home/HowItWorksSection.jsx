import {
  FaCalendarCheck,
  FaUserDoctor,
  FaFilePrescription,
  FaHeartPulse,
} from "react-icons/fa6";

import { motion } from "framer-motion";

import Card from "../ui/Card";

const steps = [
  {
    icon: FaCalendarCheck,
    title: "Book Appointment",
    description:
      "Choose your preferred doctor and book an appointment in just a few clicks.",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: FaUserDoctor,
    title: "Consult Doctor",
    description:
      "Meet experienced healthcare professionals and discuss your health concerns.",
    color: "text-emerald-600",
  },
  {
    icon: FaFilePrescription,
    title: "Get Prescription",
    description:
      "Receive digital prescriptions and treatment recommendations securely.",
    color: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: FaHeartPulse,
    title: "Track Your Health",
    description:
      "Monitor appointments, prescriptions, and your overall health progress.",
    color: "text-teal-600 dark:text-teal-400",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <h2 className="text-4xl font-bold text-gray-800">
            How It Works
          </h2>

          <p className="mt-4 text-gray-650">
            Healthcare made simple in four easy steps.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >

                <Card className="text-center h-full">

                  <div className="w-20 h-20 rounded-full bg-teal-50 dark:bg-slate-900 flex items-center justify-center mx-auto mb-6">

                    <Icon
                      className={`text-4xl ${step.color}`}
                    />

                  </div>

                  <h3 className="text-2xl font-bold text-gray-850">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {step.description}
                  </p>

                </Card>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorksSection;