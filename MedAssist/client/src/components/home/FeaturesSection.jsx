import {
  FaUserDoctor,
  FaCalendarCheck,
  FaFileMedical,
  FaShieldHeart,
} from "react-icons/fa6";

import Card from "../ui/Card";

const features = [
  {
    icon: FaUserDoctor,
    title: "Verified Specialists",
    description:
      "Consult with accredited healthcare professionals customized to your needs.",
  },
  {
    icon: FaCalendarCheck,
    title: "Slot-Checked Bookings",
    description:
      "Schedule appointments based strictly on validated doctor availability slots.",
  },
  {
    icon: FaFileMedical,
    title: "Secure Medical Records",
    description:
      "Upload and manage complete medical records, documents, and history logs.",
  },
  {
    icon: FaShieldHeart,
    title: "Encrypted Data Security",
    description:
      "Your health records and profile details are encrypted and kept safe.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Smart Features
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto">
            Everything you need to manage appointments and medical logs in one secure workspace.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 shadow-md hover:shadow-lg transition duration-300"
              >
                <Icon className="text-5xl text-teal-600 dark:text-teal-400 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;