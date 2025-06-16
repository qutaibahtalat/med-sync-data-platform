
import { useState } from "react";
import { UserRole } from "@/types/user";
import LandingPage from "@/components/LandingPage";
import Navigation from "@/components/Navigation";
import LabTechnicianDashboard from "@/components/dashboards/LabTechnicianDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import ResearcherDashboard from "@/components/dashboards/ResearcherDashboard";
import TestCatalog from "@/components/sample-management/TestCatalog";
import SampleIntake from "@/components/sample-management/SampleIntake";
import SampleTracking from "@/components/sample-management/SampleTracking";
import ResultEntry from "@/components/results/ResultEntry";
import ReportGenerator from "@/components/results/ReportGenerator";
import InventoryManagement from "@/components/inventory/InventoryManagement";
import EquipmentTracking from "@/components/inventory/EquipmentTracking";
import RequestTest from "@/components/doctor/RequestTest";
import ReviewResults from "@/components/doctor/ReviewResults";
import BookAppointment from "@/components/patient/BookAppointment";
import ViewReports from "@/components/patient/ViewReports";
import NewStudy from "@/components/researcher/NewStudy";
import StudyData from "@/components/researcher/StudyData";
import Settings from "@/components/common/Settings";
import Notifications from "@/components/common/Notifications";

export type CurrentView = 
  | "dashboard" 
  | "test-catalog" 
  | "sample-intake" 
  | "sample-tracking" 
  | "result-entry" 
  | "report-generator"
  | "inventory" 
  | "equipment" 
  | "request-test" 
  | "review-results"
  | "book-appointment" 
  | "view-reports" 
  | "new-study" 
  | "study-data"
  | "settings" 
  | "notifications";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard");

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentView("dashboard");
  };

  const handleViewChange = (view: CurrentView) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    if (currentView === "settings") return <Settings />;
    if (currentView === "notifications") return <Notifications />;

    switch (currentRole) {
      case "lab-technician":
        switch (currentView) {
          case "test-catalog": return <TestCatalog />;
          case "sample-intake": return <SampleIntake />;
          case "sample-tracking": return <SampleTracking />;
          case "result-entry": return <ResultEntry />;
          case "inventory": return <InventoryManagement />;
          case "equipment": return <EquipmentTracking />;
          default: return <LabTechnicianDashboard onViewChange={handleViewChange} />;
        }
      case "doctor":
        switch (currentView) {
          case "request-test": return <RequestTest />;
          case "review-results": return <ReviewResults />;
          default: return <DoctorDashboard onViewChange={handleViewChange} />;
        }
      case "patient":
        switch (currentView) {
          case "book-appointment": return <BookAppointment />;
          case "view-reports": return <ViewReports />;
          default: return <PatientDashboard onViewChange={handleViewChange} />;
        }
      case "researcher":
        switch (currentView) {
          case "new-study": return <NewStudy />;
          case "study-data": return <StudyData />;
          default: return <ResearcherDashboard onViewChange={handleViewChange} />;
        }
      default:
        return null;
    }
  };

  if (!currentRole) {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentRole={currentRole} 
        onLogout={handleLogout}
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      {renderContent()}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          © 2024 MedSync Lab Management System. All rights reserved. Powered by{" "}
          <a href="https://mindspire.org" className="text-blue-600 hover:text-blue-800">
            mindspire.org
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
