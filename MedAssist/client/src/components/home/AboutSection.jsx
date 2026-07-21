import { Link } from "react-router-dom";
import { FaHospital } from "react-icons/fa6";
import { motion } from "framer-motion";

import Button from "../ui/Button";

function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              About MedAssist
            </h2>

            <p className="mt-6 text-slate-600 dark:text-slate-400 leading-8">
              MedAssist is a modern healthcare platform that helps patients,
              doctors, and administrators manage healthcare services with ease.
            </p>

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-8">
              From booking appointments to securely accessing medical records,
              everything is available in one intelligent healthcare platform.
            </p>

            <div className="mt-8">

              <Link to="/about">
                <Button variant="primary">
                  Learn More
                </Button>
              </Link>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            className="bg-teal-50 dark:bg-slate-900 rounded-3xl p-12 flex justify-center border border-teal-100/50 dark:border-slate-800"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="text-center">

              <FaHospital className="text-7xl text-teal-600 dark:text-teal-400 mx-auto" />

              <h3 className="mt-6 text-2xl font-bold text-teal-700 dark:text-teal-355">
                Smart Healthcare
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-450">
                Technology that cares for your health.
              </p>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;