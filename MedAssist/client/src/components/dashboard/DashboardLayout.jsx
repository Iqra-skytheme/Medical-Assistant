import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FloatingSOS from "./FloatingSOS";
import { useAuth } from "../../context/AuthContext";

function DashboardLayout({ children, showSOS = false }) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark") ||
    localStorage.getItem("theme") === "dark"
  );

  // Synchronize local dark state when theme toggles
  useEffect(() => {
    const handleMutation = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Initial sync
    handleMutation();

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`h-screen w-screen flex overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-950 text-slate-100" 
        : "bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.06),_transparent_35%),linear-gradient(135deg,_#fcfdfd_0%,_#f2f9f6_100%)] text-slate-800"
    }`}>
      {/* Sidebar - fixed and non-scrollable */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isDarkMode={isDarkMode} 
      />

      {/* Main container wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar at the top */}
        <div className="p-4 pb-0 sm:px-6 lg:px-8 lg:pt-6">
          <Topbar 
            setIsOpen={setIsSidebarOpen} 
            isDarkMode={isDarkMode} 
            setIsDarkMode={() => {
              const nextDark = !isDarkMode;
              if (nextDark) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }
            }} 
          />
        </div>

        {/* Independent scrollable main content */}
        <main className="flex-grow overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 focus:outline-none">
          {children}
        </main>
      </div>

      {showSOS && <FloatingSOS />}
    </div>
  );
}

export default DashboardLayout;
