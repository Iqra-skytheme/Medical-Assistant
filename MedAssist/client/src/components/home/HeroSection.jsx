import { useEffect, useRef } from "react";
import { FaUserDoctor, FaShieldHeart, FaHeartPulse, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import anime from "animejs";
import Button from "../ui/Button";

function HeroSection() {
  const chartRef = useRef(null);
  const patientPathRef = useRef(null);
  const diseasePathRef = useRef(null);

  useEffect(() => {
    // Animate SVG Chart paths drawing on mount
    if (patientPathRef.current && diseasePathRef.current) {
      // Set path dash arrays
      const patLength = patientPathRef.current.getTotalLength();
      const disLength = diseasePathRef.current.getTotalLength();
      
      patientPathRef.current.setAttribute("stroke-dasharray", patLength);
      patientPathRef.current.setAttribute("stroke-dashoffset", patLength);
      diseasePathRef.current.setAttribute("stroke-dasharray", disLength);
      diseasePathRef.current.setAttribute("stroke-dashoffset", disLength);

      anime({
        targets: patientPathRef.current,
        strokeDashoffset: [patLength, 0],
        easing: "easeInOutSine",
        duration: 1800,
        delay: 200,
      });

      anime({
        targets: diseasePathRef.current,
        strokeDashoffset: [disLength, 0],
        easing: "easeInOutSine",
        duration: 1800,
        delay: 400,
      });
    }

    // Animate gridlines & stat card elements
    anime({
      targets: ".chart-gridline",
      opacity: [0, 0.15],
      duration: 1000,
      delay: anime.stagger(100),
      easing: "easeOutQuad",
    });

    anime({
      targets: ".hero-badge",
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(120),
      easing: "easeOutElastic(1, .8)",
    });

    anime({
      targets: ".chart-stat",
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 500,
      easing: "easeOutCubic",
    });
  }, []);

  const hospitalLogos = [
    { name: "Saint Jude Care", color: "#0d9488" },
    { name: "Mayo Health", color: "#0f766e" },
    { name: "Johns Hopkins", color: "#115e59" },
    { name: "Kaiser Hospital", color: "#14b8a6" },
    { name: "Cleveland Clinic", color: "#0d9488" },
    { name: "Summit Medical", color: "#0f766e" },
    { name: "Apex Healthcare", color: "#115e59" },
    { name: "Novant Health", color: "#14b8a6" },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[68vh]">
          
          {/* Left Side: Brand Text & Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <FaShieldHeart className="text-sm" />
              Next-Gen Medical Network
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-tight">
              Smart Healthcare <br />
              <span className="text-teal-600 dark:text-teal-400">
                Coordinated & Secure
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              Connect directly with verified doctors, arrange slot-checked appointments, and securely manage your medical records within a zero-violet digital environment.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="hero-badge bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaUserDoctor className="text-teal-600 dark:text-teal-400" />
                <span>Verified Specialists</span>
              </div>
              <div className="hero-badge bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaHeartPulse className="text-teal-600 dark:text-teal-400" />
                <span>Interactive Records</span>
              </div>
              <div className="hero-badge bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FaCircleCheck className="text-teal-600 dark:text-teal-400" />
                <span>Real-Time Check-In</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 pt-2">
              <Link to="/register" className="flex-1 sm:flex-initial">
                <Button variant="primary">Get Started Now</Button>
              </Link>
              <Link to="/about" className="flex-1 sm:flex-initial">
                <Button variant="secondary">Meet Specialists</Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Interactive SVG Graph Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 relative overflow-hidden transition-colors duration-300">
              
              {/* Analytics Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">System Metrics Overview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live patients vs disease ratio</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-teal-400 inline-block"></span>
                    Patients (+24%)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    Diseases (-18%)
                  </span>
                </div>
              </div>

              {/* Chart Plot Area */}
              <div ref={chartRef} className="relative w-full h-[240px] bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-850 p-2 overflow-hidden flex items-end">
                <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="none">
                  
                  {/* Grid Lines */}
                  <line className="chart-gridline" x1="0" y1="40" x2="500" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
                  <line className="chart-gridline" x1="0" y1="80" x2="500" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
                  <line className="chart-gridline" x1="0" y1="120" x2="500" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
                  <line className="chart-gridline" x1="0" y1="160" x2="500" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
                  <line className="chart-gridline" x1="0" y1="200" x2="500" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
                  
                  {/* Patients Line (Upward Curve, Teal) */}
                  <path
                    ref={patientPathRef}
                    d="M10,210 C70,190 120,200 180,120 C240,60 300,100 360,50 C420,10 450,30 490,20"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Diseases Line (Declining Curve, Emerald) */}
                  <path
                    ref={diseasePathRef}
                    d="M10,40 C80,60 140,45 200,90 C260,130 320,110 380,160 C440,200 460,180 490,210"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* X-axis legends */}
              <div className="flex justify-between px-2 pt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>

              {/* Small Floating Stat Overlay */}
              <div className="chart-stat absolute bottom-12 right-12 bg-slate-900/90 dark:bg-slate-800/90 text-white rounded-2xl p-3 border border-slate-700/50 shadow-md backdrop-blur-sm pointer-events-none flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Recovery Ratio</span>
                <span className="text-base font-extrabold text-teal-400">94.8% Global</span>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee showcasing committed hospital logos below hero (scrolling left to right continuously) */}
        <div className="mt-16 border-t border-b border-slate-200/60 dark:border-slate-800/60 py-6 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-full">
            {/* Scroll container going left to right (marquee-reverse) */}
            <div className="animate-marquee-reverse flex gap-8 items-center pr-8">
              {/* Loop 1 */}
              {hospitalLogos.concat(hospitalLogos).map((hospital, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 whitespace-nowrap min-w-[210px]"
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-white text-xs"
                    style={{ backgroundColor: hospital.color }}
                  >
                    H
                  </div>
                  <span className="text-slate-800 dark:text-slate-300 font-bold text-sm">
                    {hospital.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;