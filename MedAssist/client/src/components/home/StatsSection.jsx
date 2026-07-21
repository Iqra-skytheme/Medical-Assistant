import {
  FaUserDoctor,
  FaUsers,
  FaStar,
} from "react-icons/fa6";

import Card from "../ui/Card";

const stats = [
  {
    icon: FaUserDoctor,
    number: "500+",
    title: "Trusted Doctors",
    color: "text-teal-600",
  },
  {
    icon: FaUsers,
    number: "10K+",
    title: "Happy Patients",
    color: "text-teal-600",
  },
  {
    icon: FaStar,
    number: "98%",
    title: "Satisfaction Rate",
    color: "text-yellow-500",
  },
];

function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (
              <Card
                key={index}
                className="text-center"
              >

                <Icon
                  className={`text-5xl mx-auto mb-5 ${stat.color}`}
                />

                <h2 className="text-4xl font-bold text-teal-600">
                  {stat.number}
                </h2>

                <p className="mt-3 text-gray-600">
                  {stat.title}
                </p>

              </Card>
            );

          })}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;