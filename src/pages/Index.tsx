
import { useState } from "react";
import { UserRole } from "@/types/user";
import LandingPage from "@/components/LandingPage";
import Navigation from "@/components/Navigation";
import LabTechnicianDashboard from "@/components/dashboards/LabTechnicianDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import ResearcherDashboard from "@/components/dashboards/ResearcherDashboard";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentRole(null);
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case "lab-technician":
        return <LabTechnicianDashboard />;
      case "doctor":
        return <DoctorDashboard />;
      case "patient":
        return <PatientDashboard />;
      case "researcher":
        return <ResearcherDashboard />;
      default:
        return null;
    }
  };

  if (!currentRole) {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentRole={currentRole} onLogout={handleLogout} />
      {renderDashboard()}
    </div>
  );
};

export default Index;
