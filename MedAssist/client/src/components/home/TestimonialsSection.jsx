import {
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa6";

import { motion } from "framer-motion";
import Card from "../ui/Card";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Patient",
    review:
      "MedAssist made booking doctor appointments incredibly easy. The platform is simple, fast, and reliable.",
  },
  {
    name: "Ali Khan",
    role: "Patient",
    review:
      "I can now access my medical records anytime without carrying paper files. Highly recommended!",
  },
  {
    name: "Fatima Noor",
    role: "Patient",
    review:
      "The slot-checked booking system shows real-time doctor availability. Made booking a specialist smooth and reliable!",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            What Our Patients Say
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Trusted by thousands of patients across the region.
          </p>

        </motion.div>

        {/* Testimonials */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((testimonial, index) => (

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

              <Card className="h-full bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">

                <FaQuoteLeft className="text-4xl text-teal-600 dark:text-teal-400 mb-5" />

                <p className="text-slate-600 dark:text-slate-400 leading-7">
                  "{testimonial.review}"
                </p>

                <div className="flex text-yellow-400 mt-6 mb-4">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {testimonial.name}
                </h3>

                <p className="text-slate-500">
                  {testimonial.role}
                </p>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TestimonialsSection;