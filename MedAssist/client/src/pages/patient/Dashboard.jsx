import { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import StatsCards from "../../components/dashboard/StatsCards";
import AppointmentCard from "../../components/dashboard/AppointmentCard";
import QuickActions from "../../components/dashboard/QuickActions";
import NotificationCard from "../../components/dashboard/NotificationCard";
import EmergencyCard from "../../components/dashboard/EmergencyCard";
import HealthOverview from "../../components/dashboard/HealthOverview";
import HealthScore from "../../components/dashboard/HealthScore";
import HealthChart from "../../components/dashboard/HealthChart";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import UpcomingMedicines from "../../components/dashboard/UpcomingMedicines";
import RecentDoctors from "../../components/dashboard/RecentDoctors";
import RecentReports from "../../components/dashboard/RecentReports";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import Loader from "../../components/ui/Loader";

import { 
  getPatientAppointments, 
  getPatientRecords, 
  getDoctorsList 
} from "../../services/patientService";

function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark") ||
    localStorage.getItem("theme") === "dark"
  );

  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synchronize local dark state when theme toggles
  useEffect(() => {
    const handleMutation = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Fetch real data from MongoDB Database
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [apptsData, recordsData, docsData] = await Promise.all([
          getPatientAppointments(),
          getPatientRecords(),
          getDoctorsList()
        ]);
        setAppointments(apptsData.appointments || []);
        setRecords(recordsData.records || []);
        setDoctors(docsData.doctors || []);
      } catch (err) {
        console.error("Failed to load patient dashboard database records:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout showSOS={true}>
      <WelcomeCard isDarkMode={isDarkMode} />
      
      {/* Dynamic Statistics Cards */}
      <StatsCards 
        appointments={appointments} 
        records={records} 
        doctors={doctors} 
        isDarkMode={isDarkMode} 
      />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr] mt-6">
        <div className="space-y-6">
          <HealthOverview />
          {/* Dynamic Appointment Cards */}
          <AppointmentCard appointments={appointments} isDarkMode={isDarkMode} />
          <QuickActions />
        </div>

        <div className="space-y-6">
          <HealthScore />
          <NotificationCard isDarkMode={isDarkMode} />
          <EmergencyCard />
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr] mt-6">
        <HealthChart />
        <CalendarWidget />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] mt-6">
        <UpcomingMedicines />
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Dynamic Doctor Logs */}
          <RecentDoctors doctors={doctors} isDarkMode={isDarkMode} />
          {/* Dynamic Report Logs */}
          <RecentReports records={records} isDarkMode={isDarkMode} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr] mt-6">
        <ActivityTimeline />
        <div className="space-y-6">
          <EmergencyCard />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;