
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRole, CurrentView } from "@/pages/Index";
import { 
  Menu, 
  X, 
  TestTube2, 
  FileText, 
  Package,
  Settings,
  Bell,
  LogOut,
  User,
  Activity,
  BarChart3,
  DollarSign
} from "lucide-react";

interface NavigationProps {
  currentRole: UserRole;
  onLogout: () => void;
  onViewChange: (view: CurrentView) => void;
  currentView: CurrentView;
}

const Navigation = ({ currentRole, onLogout, onViewChange, currentView }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard" as CurrentView, label: "Dashboard", icon: Activity },
      { id: "settings" as CurrentView, label: "Settings", icon: Settings },
      { id: "notifications" as CurrentView, label: "Notifications", icon: Bell },
      { id: "licensing" as CurrentView, label: "Licensing", icon: FileText },
      { id: "finance" as CurrentView, label: "Finance", icon: DollarSign }
    ];

    switch (currentRole) {
      case "lab-technician":
        return [
          ...commonItems.slice(0, 1),
          { id: "test-catalog" as CurrentView, label: "Test Catalog", icon: TestTube2 },
          { id: "sample-intake" as CurrentView, label: "Sample Intake", icon: Package },
          { id: "sample-tracking" as CurrentView, label: "Sample Tracking", icon: Activity },
          { id: "result-entry" as CurrentView, label: "Result Entry", icon: FileText },
          { id: "report-generator" as CurrentView, label: "Report Generator", icon: FileText },
          { id: "inventory" as CurrentView, label: "Inventory", icon: Package },
          { id: "equipment" as CurrentView, label: "Equipment", icon: Settings },
          { id: "report-templates" as CurrentView, label: "Report Templates", icon: FileText },
          { id: "advanced-templates" as CurrentView, label: "Advanced Templates", icon: BarChart3 },
          ...commonItems.slice(1)
        ];
      case "doctor":
        return [
          ...commonItems.slice(0, 1),
          { id: "request-test" as CurrentView, label: "Request Test", icon: TestTube2 },
          { id: "review-results" as CurrentView, label: "Review Results", icon: FileText },
          { id: "commission" as CurrentView, label: "Commission", icon: DollarSign },
          ...commonItems.slice(1)
        ];
      case "patient":
        return [
          ...commonItems.slice(0, 1),
          { id: "book-appointment" as CurrentView, label: "Book Appointment", icon: Activity },
          { id: "view-reports" as CurrentView, label: "View Reports", icon: FileText },
          ...commonItems.slice(1, -1) // Exclude finance for patients
        ];
      case "researcher":
        return [
          ...commonItems.slice(0, 1),
          { id: "new-study" as CurrentView, label: "New Study", icon: TestTube2 },
          { id: "study-data" as CurrentView, label: "Study Data", icon: BarChart3 },
          ...commonItems.slice(1)
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case "lab-technician": return "Lab Technician";
      case "doctor": return "Doctor";
      case "patient": return "Patient";
      case "researcher": return "Researcher";
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "lab-technician": return "bg-blue-100 text-blue-800";
      case "doctor": return "bg-green-100 text-green-800";
      case "patient": return "bg-purple-100 text-purple-800";
      case "researcher": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TestTube2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MedSync</span>
            </div>
            <Badge className={getRoleBadgeColor(currentRole)}>
              {getRoleDisplayName(currentRole)}
            </Badge>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-2 justify-start text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
