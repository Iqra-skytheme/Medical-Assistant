import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHeartPulse,
  FaBars,
  FaXmark,
  FaSun,
  FaMoon,
} from "react-icons/fa6";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Sync theme to document element and localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-600 dark:text-teal-400 font-semibold"
      : "text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition";

  return (
    <nav className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="MedAssist Logo" className="h-8 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="flex items-center gap-2">
              <FaHeartPulse className="text-3xl text-teal-600" />
              <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                MedAssist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          {/* Desktop Controls (Theme + Buttons) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FaSun className="text-teal-400" /> : <FaMoon className="text-slate-600" />}
            </button>

            <Link
              to="/login"
              className="px-5 py-2.5 border border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/40 transition font-bold text-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition font-bold text-sm shadow-md shadow-teal-600/10"
            >
              Register
            </Link>
          </div>

          {/* Mobile Hamburger & Theme controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              {theme === "dark" ? <FaSun className="text-teal-400" /> : <FaMoon className="text-slate-600" />}
            </button>

            <button
              className="text-2xl text-teal-600 dark:text-teal-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 px-5 py-3 border border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400 rounded-xl text-center hover:bg-teal-50 dark:hover:bg-teal-950/40"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-center"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;