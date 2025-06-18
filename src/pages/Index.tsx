
import { useState } from "react";
import { UserRole } from "@/types/user";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import LicensingPage from "@/components/licensing/LicensingPage";
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
import ReportTemplateBuilder from "@/components/reports/ReportTemplateBuilder";
import AdvancedReportTemplates from "@/components/reports/AdvancedReportTemplates";
import InventoryManagement from "@/components/inventory/InventoryManagement";
import EquipmentTracking from "@/components/inventory/EquipmentTracking";
import RequestTest from "@/components/doctor/RequestTest";
import ReviewResults from "@/components/doctor/ReviewResults";
import CommissionPage from "@/components/doctor/CommissionPage";
import BookAppointment from "@/components/patient/BookAppointment";
import ViewReports from "@/components/patient/ViewReports";
import NewStudy from "@/components/researcher/NewStudy";
import StudyData from "@/components/researcher/StudyData";
import Settings from "@/components/common/Settings";
import Notifications from "@/components/common/Notifications";
import FinanceDashboard from "@/components/finance/FinanceDashboard";

export type CurrentView = 
  | "dashboard" 
  | "test-catalog" 
  | "sample-intake" 
  | "sample-tracking" 
  | "result-entry" 
  | "report-generator"
  | "report-templates"
  | "advanced-templates"
  | "inventory" 
  | "equipment" 
  | "request-test" 
  | "review-results"
  | "commission"
  | "book-appointment" 
  | "view-reports" 
  | "new-study" 
  | "study-data"
  | "settings" 
  | "notifications"
  | "licensing"
  | "finance";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView("dashboard");
    setIsAuthenticated(true);
  };

  const handleSignup = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView("dashboard");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentView("dashboard");
    setIsAuthenticated(false);
  };

  const handleViewChange = (view: CurrentView) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    if (currentView === "settings") return <Settings />;
    if (currentView === "notifications") return <Notifications />;
    if (currentView === "licensing") return <LicensingPage />;
    if (currentView === "report-templates") return <ReportTemplateBuilder />;
    if (currentView === "advanced-templates") return <AdvancedReportTemplates />;
    if (currentView === "finance") return <FinanceDashboard />;

    switch (currentRole) {
      case "lab-technician":
        switch (currentView) {
          case "test-catalog": return <TestCatalog onNavigateBack={() => setCurrentView("dashboard")} />;
          case "sample-intake": return <SampleIntake onNavigateBack={() => setCurrentView("dashboard")} />;
          case "sample-tracking": return <SampleTracking onNavigateBack={() => setCurrentView("dashboard")} />;
          case "result-entry": return <ResultEntry onNavigateBack={() => setCurrentView("dashboard")} />;
          case "report-generator": return <ReportGenerator />;
          case "inventory": return <InventoryManagement />;
          case "equipment": return <EquipmentTracking />;
          default: return <LabTechnicianDashboard onViewChange={handleViewChange} />;
        }
      case "doctor":
        switch (currentView) {
          case "request-test": return <RequestTest />;
          case "review-results": return <ReviewResults />;
          case "commission": return <CommissionPage />;
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

  if (!isAuthenticated) {
    if (authMode === "signup") {
      return (
        <SignupForm 
          onSignup={handleSignup}
          onShowLogin={() => setAuthMode("login")}
        />
      );
    }
    return (
      <LoginForm 
        onLogin={handleLogin}
        onShowSignup={() => setAuthMode("signup")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentRole={currentRole!} 
        onLogout={handleLogout}
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      <div className="w-full">
        {renderContent()}
      </div>
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
