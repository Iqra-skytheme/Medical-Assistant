import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";

function CTASection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-900/50 border border-slate-800 shadow-2xl py-16 md:py-20 px-8 text-center">
          {/* Subtle decorative glowing blob */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative max-w-3xl mx-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Ready to Take Control of Your Health?
              </h2>

              <p className="mt-6 text-base md:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
                Join MedAssist today to book appointments, manage your medical records, connect with trusted doctors, and enjoy smarter healthcare at your fingertips.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 border-none text-white font-bold"
                  >
                    Get Started
                  </Button>
                </Link>

                <Link to="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;