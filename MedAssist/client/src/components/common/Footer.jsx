import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaHeartPulse,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-16 pb-8 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <FaHeartPulse className="text-2xl text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                MedAssist
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Smart Healthcare Platform connecting patients, doctors, and administrators through a secure, modern ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                Home
              </Link>
              <Link to="/about" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                About
              </Link>
              <Link to="/services" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                Services
              </Link>
              <Link to="/contact" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Patient Options */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm uppercase tracking-wider mb-4">
              Patient Portal
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/login" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                Login to Portal
              </Link>
              <Link to="/register" className="hover:text-teal-600 dark:hover:text-teal-450 transition font-medium">
                Create Account
              </Link>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="text-center sm:text-left">
            <h3 className="text-slate-800 dark:text-slate-100 font-bold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <FaEnvelope className="text-teal-600 dark:text-teal-400" />
                <span className="text-slate-500 dark:text-slate-400">
                  support@medassist.com
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <FaPhone className="text-teal-600 dark:text-teal-400" />
                <span className="text-slate-500 dark:text-slate-400">
                  +92 300 1234567
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <FaLocationDot className="text-teal-600 dark:text-teal-400" />
                <span className="text-slate-500 dark:text-slate-400">
                  Faisalabad, Pakistan
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start gap-5 mt-6 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition duration-300"
              >
                <FaGithub />
              </a>
            </div>

          </div>
        </div>

        <hr className="my-10 border-slate-200 dark:border-slate-900" />

        <p className="text-center text-slate-400 dark:text-slate-655 text-sm">
          &copy; {new Date().getFullYear()} MedAssist. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;